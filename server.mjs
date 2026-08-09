/**
 * Production server for the static export.
 *
 * Spec §12.2 [LOCKED]: "The published output must remain plain static HTML."
 * That is preserved exactly — `npm run build` still writes every page to disk
 * as HTML with no runtime. This file only *serves* those files, because a
 * Render Web Service requires a process listening on $PORT. Nothing here
 * renders, templates, or reaches a database; delete it and the same `dist/`
 * still drops onto any static host unchanged.
 *
 * No dependencies. A static file server is ~150 lines of node:http, and every
 * package added here is a package that has to be audited, updated and trusted
 * for the lifetime of a site whose whole point is that it has no backend.
 *
 * Node 22+ (see .node-version).
 */
import { createServer } from 'node:http';
import { createReadStream, promises as fs } from 'node:fs';
import { createGzip, createBrotliCompress, constants as zlib } from 'node:zlib';
import { pipeline } from 'node:stream/promises';
import { extname, join, normalize, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('./dist/', import.meta.url));
const PORT = Number(process.env.PORT) || 3000;
/** Render routes to the container's private IP, so 127.0.0.1 would be unreachable. */
const HOST = process.env.HOST || '0.0.0.0';

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
};

/** Worth the CPU to compress; images and fonts are already compressed. */
const COMPRESSIBLE = /^(text\/|application\/(json|xml|manifest))|\+xml/;
/** Below roughly one packet, compression costs more than it saves. */
const COMPRESS_MIN = 1024;

/**
 * §10.3 — the site is built for a metered Nigerian mobile connection, so the
 * caching story matters as much as the byte count.
 *
 * Everything Astro fingerprints (`/_astro/*`, the subsetted fonts) can be
 * cached forever: the filename changes when the bytes change. HTML must not
 * be, or a rebuilt page keeps serving from a stale cache and the fingerprinted
 * asset it points at no longer exists.
 */
function cacheControl(pathname, type) {
  if (pathname.startsWith('/_astro/') || /\.woff2?$/.test(pathname)) {
    return 'public, max-age=31536000, immutable';
  }
  if (type.startsWith('text/html')) return 'public, max-age=0, must-revalidate';
  return 'public, max-age=3600';
}

/**
 * Map a URL path to a file inside dist/, or null.
 *
 * Astro builds directory-format routes (`/care/index.html`), and §6 links to
 * them without a trailing slash. Both spellings resolve to the same file here
 * rather than via a redirect, so no visitor pays a round trip for a slash.
 */
async function resolve(pathname) {
  let decoded;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    return null; // malformed percent-encoding
  }

  // normalize() collapses `..`; the prefix check then rejects anything that
  // still points outside dist/ (encoded traversal, absolute paths, NUL bytes).
  if (decoded.includes('\0')) return null;
  const rel = normalize(decoded).replace(/^([/\\])+/, '');
  const target = join(ROOT, rel);
  if (!(target + sep).startsWith(ROOT)) return null;

  const candidates = extname(target)
    ? [target]
    : [join(target, 'index.html'), `${target}.html`];

  for (const candidate of candidates) {
    try {
      const stat = await fs.stat(candidate);
      if (stat.isFile()) return { path: candidate, stat };
    } catch {
      /* next candidate */
    }
  }
  return null;
}

function negotiate(accept = '') {
  if (/\bbr\b/.test(accept)) return 'br';
  if (/\bgzip\b/.test(accept)) return 'gzip';
  return null;
}

async function send(req, res, file, status = 200) {
  const type = TYPES[extname(file.path).toLowerCase()] || 'application/octet-stream';
  const etag = `W/"${file.stat.size.toString(16)}-${file.stat.mtimeMs.toString(16)}"`;

  const headers = {
    'content-type': type,
    'cache-control': cacheControl(req.url.split('?')[0], type),
    etag,
    'last-modified': file.stat.mtime.toUTCString(),
    vary: 'Accept-Encoding',
    'x-content-type-options': 'nosniff',
    'referrer-policy': 'strict-origin-when-cross-origin',
  };

  if (req.headers['if-none-match'] === etag) {
    res.writeHead(304, headers);
    return res.end();
  }

  const encoding =
    COMPRESSIBLE.test(type) && file.stat.size >= COMPRESS_MIN
      ? negotiate(req.headers['accept-encoding'])
      : null;

  if (encoding) {
    headers['content-encoding'] = encoding;
  } else {
    // Only advertise a length when the body is the file verbatim.
    headers['content-length'] = file.stat.size;
  }

  res.writeHead(status, headers);
  if (req.method === 'HEAD') return res.end();

  const source = createReadStream(file.path);
  const transform =
    encoding === 'br'
      ? createBrotliCompress({
          params: {
            [zlib.BROTLI_PARAM_QUALITY]: 5,
            [zlib.BROTLI_PARAM_SIZE_HINT]: file.stat.size,
          },
        })
      : encoding === 'gzip'
        ? createGzip({ level: 6 })
        : null;

  try {
    await (transform ? pipeline(source, transform, res) : pipeline(source, res));
  } catch (error) {
    // A visitor navigating away mid-response is not an error worth logging.
    if (error?.code !== 'ERR_STREAM_PREMATURE_CLOSE' && error?.code !== 'EPIPE') {
      console.error(`[serve] ${file.path}:`, error.message);
    }
    res.destroy();
  }
}

const server = createServer(async (req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { allow: 'GET, HEAD', 'content-type': 'text/plain; charset=utf-8' });
    return res.end('Method not allowed');
  }

  const pathname = req.url.split('?')[0];

  try {
    const file = await resolve(pathname);
    if (file) return await send(req, res, file);

    const notFound = await resolve('/404.html');
    if (notFound) return await send(req, res, notFound, 404);

    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    res.end('Not found');
  } catch (error) {
    console.error(`[serve] ${pathname}:`, error);
    if (!res.headersSent) res.writeHead(500, { 'content-type': 'text/plain; charset=utf-8' });
    res.end('Internal server error');
  }
});

// Render's proxy holds connections open; keep the server's idle timeout above
// its 60s so a reused connection is never closed from under a request.
server.keepAliveTimeout = 120_000;
server.headersTimeout = 125_000;

server.listen(PORT, HOST, () => {
  console.log(`[serve] dist/ on http://${HOST}:${PORT}`);
});

/** Render sends SIGTERM on deploy and restart; finish in-flight responses. */
for (const signal of ['SIGTERM', 'SIGINT']) {
  process.on(signal, () => {
    console.log(`[serve] ${signal} — draining`);
    server.close(() => process.exit(0));
    setTimeout(() => process.exit(0), 10_000).unref();
  });
}
