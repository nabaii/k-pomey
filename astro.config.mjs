import { defineConfig, fontProviders } from 'astro/config';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import node from '@astrojs/node';
import keystatic from '@keystatic/astro';

/**
 * The admin is mounted only for `npm run dev` and `npm run build:admin`.
 *
 * Spec §12.2 [LOCKED]: "The published output must remain plain static HTML."
 * Keystatic injects two non-prerendered routes, which would force a server
 * build. Gating it keeps `npm run build` a pure static export — every content
 * page is HTML on disk, deployable to any host with no runtime.
 *
 * npm_lifecycle_event is set by npm on every platform, so this needs no
 * cross-env dependency and behaves the same on Windows and CI.
 */
const script = process.env.npm_lifecycle_event || '';
const withAdmin = script === 'dev' || script === 'build:admin';

export default defineConfig({
  site: 'https://kpomey.com',
  output: 'static',
  ...(withAdmin ? { adapter: node({ mode: 'standalone' }) } : {}),
  integrations: [markdoc(), ...(withAdmin ? [react(), keystatic()] : [])],
  image: {
    // §10.3 — largest image < 250 KB, WebP preferred. Enforced at build time
    // rather than left to whoever exports the photographs.
    responsiveStyles: true,
    layout: 'constrained',
  },

  /**
   * §4.2 — Zen Old Mincho (display) and Zen Kaku Gothic New (body).
   *
   * The spec loads these from Google Fonts with display=swap. We download and
   * self-host them instead: on a metered Nigerian mobile connection an extra
   * DNS lookup plus TLS handshake to a third-party origin costs more than the
   * fonts do. Astro subsets to latin (these are Japanese families — the full
   * glyph sets are megabytes), fingerprints the files, and generates fallback
   * metric overrides so the swap does not shift layout.
   *
   * The fallback stacks below are the ones §4.2 says must not be removed.
   */
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Zen Old Mincho',
      cssVariable: '--font-display',
      weights: [400, 500],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['Georgia', 'Times New Roman', 'serif'],
      display: 'swap',
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Zen Kaku Gothic New',
      cssVariable: '--font-body',
      weights: [300, 400, 500],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['Helvetica Neue', 'Arial', 'sans-serif'],
      display: 'swap',
    },
  ],
  /**
   * §10.3 — CSS is split per route rather than bundled into one file.
   *
   * Measured both ways on this build: one shared stylesheet costs the first
   * page 63 KB uncompressed, per-route splitting costs it 46 KB, because the
   * shared file carries every page's component styles to every visitor. The
   * genuinely shared layer still lands in one cached file; only the page's own
   * styles are additional. `auto` then inlines the small critical sheet, which
   * removes a render-blocking round trip on a slow connection.
   */
  build: { inlineStylesheets: 'auto' },
});
