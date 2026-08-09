# Deploying to Render

The site is a **Render Web Service**: a Node process (`server.mjs`) serving the
static export from `dist/`. Spec §12.2 is unaffected — `npm run build` still
writes every page to disk as plain HTML with no runtime, and `server.mjs` only
hands those files to the network because a Web Service must listen on `$PORT`.

Everything Render needs is committed:

| File | Purpose |
|---|---|
| `render.yaml` | Blueprint — service type, region, build and start commands |
| `server.mjs` | The static file server. No dependencies |
| `.node-version` | Pins Node 22.21.0, matching local |
| `package.json` → `start` | `node server.mjs` |

---

## Before the first deploy

**1. Replace the placeholder contact details.**
`src/content/settings/site.json` still holds `2340000000000` and
`hello@kpomey.com`. Every call to action on every page resolves to those
(§6.2), so a deploy without them is a site whose only conversion path is dead.
The build prints a `[contact]` warning until they are replaced. Once they are,
set `STRICT_CONTACT=true` on the Render service so it can never regress.

**2. Commit and push everything.** Render builds from the git remote, not from
your disk. `dist/` is gitignored on purpose — Render builds it.

```
git add -A
git commit -m "Prepare for Render deployment"
git push -u origin main
```

The repo needs a remote on GitHub, GitLab or Bitbucket for Render to read.

---

## Deploying

### With the blueprint (recommended)

1. Push the repo, including `render.yaml`.
2. Render Dashboard → **New** → **Blueprint**.
3. Connect the repository and the `main` branch. Render reads `render.yaml`
   and shows one service, `kpomey`.
4. It will prompt for `PUBLIC_SITE_URL` (marked `sync: false`, so it is never
   committed). On the first deploy the live URL is not known yet — enter
   `https://kpomey.onrender.com`, or leave it blank and let the build fall back
   to Render's own `RENDER_EXTERNAL_URL`. Correct it after step 6 if the
   assigned subdomain differs.
5. **Apply**. The first build takes roughly 2–4 minutes: `npm install`, then
   `astro build`.
6. The service goes live at `https://<name>.onrender.com`. Check the logs for
   `[serve] dist/ on http://0.0.0.0:10000`.

### Without the blueprint

Render Dashboard → **New** → **Web Service** → connect the repo, then:

| Setting | Value |
|---|---|
| Language / Runtime | Node |
| Region | Frankfurt (closest to Abuja) |
| Branch | `main` |
| Build command | `npm install --include=dev && npm run build` |
| Start command | `node server.mjs` |
| Health check path | `/` |
| Instance type | Free — see the note below |

Then add environment variables: `NODE_VERSION` = `22.21.0` and
`PUBLIC_SITE_URL` = the live origin.

---

## After the first deploy

**Verify.** Every route, the 404, and the caching:

```
curl -sI https://<name>.onrender.com/                  # 200, must-revalidate
curl -sI https://<name>.onrender.com/work/poolside-garden
curl -sI https://<name>.onrender.com/no-such-page      # 404, still branded
curl -sI https://<name>.onrender.com/_astro/<file>.css # immutable, 1 year
```

Then open the site on a phone and press **Send on WhatsApp** — that is the one
path no header check covers.

**Attach the domain.** Render → the service → **Settings** → **Custom Domains**
→ add `kpomey.com` and `www.kpomey.com`. Render issues the TLS certificate
automatically once DNS resolves. At the registrar:

| Record | Name | Value |
|---|---|---|
| `A` | `@` | the IP Render shows |
| `CNAME` | `www` | `<name>.onrender.com` |

Then set `PUBLIC_SITE_URL` to `https://kpomey.com` and redeploy, so
`<link rel="canonical">` and `og:url` name the real origin.

**Subsequent deploys** are automatic: `autoDeploy: true` rebuilds on every push
to `main`. Editing content through the Keystatic admin locally, committing and
pushing is therefore the publish action.

---

## Notes

**The service runs on Free.** No payment is required to deploy — the Blueprint
itself costs nothing, and `free` is a valid `plan` value. What it costs instead:

- Render spins the service down after 15 minutes without traffic, and the next
  visitor waits ~1 minute for it to wake. For a site whose job is to make a
  contractor look like a firm to someone who already has the name (§1.3), that
  is the one limitation worth watching — a cold start lands on the person most
  likely to have been sent the link.
- 750 Free instance hours per month per workspace. One always-on service is
  ~730, so this fits, but a second Free service will not.
- Rollbacks are limited to the two most recent deploys.

Custom domains and managed TLS are included on Free, so `kpomey.com` works
without paying. If the cold start becomes a problem, change `plan: free` to
`plan: starter` ($7/month) in `render.yaml` and push — that is the whole
migration, with no downtime and nothing else to reconfigure.

**Region.** Frankfurt is Render's closest region to Abuja. Oregon or Virginia
add roughly 100–150ms to every request.

**Why `npm install` and not `npm ci`.** `npm ci` is the better build command —
it installs the lockfile exactly and cannot drift — and it fails here:

```
npm error `npm ci` can only install packages when your package.json and
npm error package-lock.json are in sync.
npm error Missing: @emnapi/runtime@1.11.3 from lock file
npm error Missing: @emnapi/core@1.11.3 from lock file
```

`sharp` ships a per-platform binary plus wasm32 fallbacks. One of those,
`@napi-rs/wasm-runtime`, declares `@emnapi/core` and `@emnapi/runtime` as *peer*
dependencies. Building the tree on Windows prunes that branch and never records
the peers; building it on Linux keeps the branch and demands them. So a
lockfile written on a Windows machine can never satisfy `npm ci` on Render.

This cannot be fixed from Windows. `npm install --package-lock-only`, with or
without `--os=linux --cpu=x64 --libc=glibc`, reproduces the same pruning, and
npm 10 prunes harder still — it drops every Linux `sharp` binary from the lock,
which would fail the build outright rather than fail the install.

`npm install` resolves the tree itself, so the mismatch is not an error. It
still honours every version the lockfile pins and only fills in what is missing,
and the branch it fills in is wasm32 — never loaded on Linux x64.

To restore `npm ci`, the lockfile has to be generated on Linux and committed:
run `npm install --package-lock-only` in a Linux container, in WSL, or in a
one-off `ubuntu-latest` CI job, commit the result, and change the build command
back. Do not regenerate it on Windows afterwards, or the problem returns.

**The admin does not ship.** `npm run build` excludes Keystatic and React by
design (see the comment at the top of `astro.config.mjs`); only `npm run dev`
and `npm run build:admin` mount them. Nothing in the deployed service can write
to content — it serves files and nothing else.

**What the server does.** Serves `dist/`, resolves `/care` and `/care/` to the
same file without a redirect, gzip/brotli for text, `immutable` year-long
caching for fingerprinted assets and fonts, `must-revalidate` for HTML, ETag
304s, `dist/404.html` for anything unresolved, and a drain on SIGTERM so a
deploy does not cut a response in half.
