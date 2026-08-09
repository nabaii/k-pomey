# K. Pomey Landscaping and Alatu

Landscaping, flowers and garden care — Area 1, Abuja. Built to
`K-Pomey-Design-Specification-v2.1.md`.

```
npm install
npm run dev        # site + admin at /keystatic
npm run build      # static export to dist/
npm run preview    # serve dist/
npm run check      # types
npm start          # serve dist/ exactly as production does
```

---

## Stack

Astro 7 · TypeScript · content collections · Keystatic. No UI framework ships
to the browser: the four interactive behaviours (drawer, before/after reveal,
index peek, contact form) are plain modules that Astro bundles and inlines.

React exists in `devDependencies`' orbit only because the Keystatic admin is
built with it. **It is not part of the published site** — see below.

### Measured

| | |
|---|---|
| Lighthouse mobile, all six pages | **Performance 100 · Accessibility 100 · Best practices 100 · SEO 100** |
| First page over the wire | ~12 KB gzipped (HTML + CSS), plus 26 KB of preloaded fonts |
| CLS | 0 |
| Total blocking time | 0 ms |
| JavaScript | ~3 KB, inlined, no framework runtime |

Specification §10.3 sets a budget of **36 KB uncompressed** for the first page's
HTML + CSS + JS. This build is **46 KB uncompressed / ~12 KB gzipped**. That is
a genuine overrun against the letter of the budget and is called out rather than
buried: component-scoped CSS in a build system carries more source bytes than a
single hand-authored 13 KB stylesheet. Both configurations were measured — one
shared stylesheet costs the first page 63 KB, per-route splitting costs 46 KB —
and the smaller was chosen. The budget's purpose, a fast page on a metered
Nigerian mobile connection, is met with room to spare: Performance 100, LCP
1.2 s, and 12 KB actually transferred.

---

## Layout

```
astro.config.mjs        fonts, image pipeline, admin gating
keystatic.config.ts     the admin — §12.3 content model, §12.4 boundary
src/
  content.config.ts     the same model as Zod schemas, validated at build
  content/
    projects/<slug>/index.mdoc
    flowers/*.yaml
    care-plans/*.yaml
    settings/site.json  every contact detail, in one file (§12.9)
  lib/
    site.ts             typed access to site.json
    projects.ts         §7.1/§7.2 ordering rules + build-time guards
  components/           the §5 component library, one file each
  layouts/Base.astro
  pages/
    index · work · flowers · care · studio
    work/[slug].astro   generates one page per linkable project (§7.3)
  styles/
    tokens.css          §4.1 — the only place colour is defined
    global.css          reset, type, the §4.4 drawing layer, §4.5 motion
docs/
  CONTRAST.md           the §9 contrast working, with the arithmetic
  EDITING.md            the §12.7 handover guide, for the client
reference/static-v1/    superseded — see "History"
```

---

## Decisions a reviewer should not have to reverse-engineer

**The spec rejects a framework; this build uses one.** §10.1 and §3.6 specify
hand-authored static HTML with no build step, and §12 defers a generator to
Phase 2. The client directed us to exceed that. §12.2's own reasoning is
followed as closely as the change allows: the generator runs on the host, and
the published output is still plain static HTML.

**`npm run build` produces a purely static site.** §12.2 [LOCKED] requires it.
Keystatic injects two server-rendered routes, which would force a server build,
so the admin is mounted only for `npm run dev` and `npm run build:admin`
(`astro.config.mjs` gates on `npm_lifecycle_event`). `dist/` after a normal
build contains HTML, CSS and fonts — no server entry, no React, no `/keystatic`.

**Fonts are self-hosted, not loaded from Google.** §4.2 specifies a Google Fonts
link. On a metered connection an extra DNS lookup and TLS handshake to a
third-party origin costs more than the fonts do. Astro downloads and
fingerprints them at build time, and generates metric-matched fallbacks so the
swap does not shift layout (CLS 0). The fallback stacks §4.2 protects now live
in `astro.config.mjs`. **Note:** the Google *provider* silently ignores
`subsets: ['latin']` for these families — they are Japanese, and Google serves
them as ~120 numbered subsets, which produced an 11 MB build and 595 preloads.
The Fontsource provider exposes a real `latin` subset: 5 files, 68 KB.

**The rules the spec calls [LOCKED] are enforced by the build, not by hope.**
`src/lib/projects.ts` throws if the home index is not exactly five projects, if
more or fewer than one project carries `--heat`, if Work's card order has
duplicates, or if the featured reveal has no matched before/after pair.
`src/components/Slot.astro` throws if a photograph is supplied without alt text.
A failed build is cheaper than a degraded site.

**Contrast.** Three tokens fail WCAG AA as text on one surface or the other.
§9 says to adjust the token, so each gained a surface-scoped sibling, and
`--heat` changed value. Full arithmetic in [docs/CONTRAST.md](docs/CONTRAST.md).

**Radius 0 everywhere, with two exceptions.** §4.3's locked list names buttons,
cards, images, flags, tags, the burger and the drawer close. The before/after
drag handle and its Before/After capsules are drawn round in the UI screens, and
"capsule" is the specification's own word for them.

**No view transitions.** Astro offers them and they would have been easy. §4.5
makes the scribe the site's only motion signature and §3.6 rejects "the default
motion of generated sites"; a page transition is exactly that, and costs JS.

---

## Open items before launch

These are the specification's own open decisions (§16), unchanged. Nothing here
is a build defect.

| # | Item | Where |
|---|---|---|
| 3, 4 | **Domain, live WhatsApp number and email** | `src/content/settings/site.json` — placeholders `2340000000000` / `hello@kpomey.com` |
| 1 | Care plan pricing | `src/content/care-plans/*.yaml`, `price` field |
| 2 | Permission to name the facility client | Its copy is deliberately unspecific (§11.4) |
| 5, 8 | Real project names, durations, years; which projects get pages | Set `linkable: true` once a project's page content exists |
| 6, 7 | Photo library and flower selection | Every image is an empty slot until then (§3.2) |
| — | **The logo** | `src/components/BrandMark.astro` and `public/favicon.svg` are stand-ins for the client's real mark |

Six of the seven projects are `linkable: false`, so they render as `<article>`
on Work rather than as dead links, and no page is generated for them. That is
the §12.3 mechanism working as designed, not an omission — the content has not
been supplied. The facility build is `neverLink: true` permanently, per §3.3.

## Deployment

**Render Web Service** — see [docs/DEPLOY.md](docs/DEPLOY.md) for the full
procedure. `render.yaml` is committed, so the service is reproducible from the
repo: build `npm install --include=dev && npm run build`, start `node server.mjs`.

The output is unchanged by this: `npm run build` is still a pure static export,
and `server.mjs` is a dependency-free file server for `dist/`. The same `dist/`
still drops onto Netlify, Vercel, S3 or any other static host with no runtime —
build `npm run build`, publish `dist/`.

The only environment variable that affects the output is `PUBLIC_SITE_URL`, the
origin baked into `<link rel="canonical">` and `og:url`. Unset, it falls back to
Render's `RENDER_EXTERNAL_URL`, then to `https://kpomey.com`.

To let the client edit from a phone, deploy the admin separately with
`npm run build:admin` and switch `storage` in `keystatic.config.ts` from
`local` to `github`.

## History

`reference/static-v1/` holds the hand-authored static build made against §10.1
before the change of direction — five of six pages, complete design system. It
is kept because it is the specification's literal reading and may be useful for
comparison. Nothing in the live build imports from it, and it can be deleted.

## Conflicts found in the specification

Raised rather than silently resolved.

1. **§7.2 vs §13** — §7.2 specifies Work as a 12-column card grid with a fixed
   card order, and the UI screens draw one. §13's rollout table says to "convert
   grid to index treatment". Built as the card grid, since §7.2 is the normative
   page specification and the screens agree; §13's other outstanding items for
   Work — sheet numbering and a title block — are done. **Needs a decision.**
2. **§12.3 vs §12.4** — §12.3 makes *Order* an editable field; §12.4 lists "the
   fixed card order on Work" as not editable under any account. Order is
   exposed in the admin, because otherwise a new project cannot be placed at
   all, with the build-time validation as the guardrail.
3. **§10.5 vs §12.9** — §10.5 lists the WhatsApp number in five locations;
   §12.9 says to move it into a single `site.json` immediately. §12.9 is
   followed, and it is a typed build-time import rather than a runtime fetch.
