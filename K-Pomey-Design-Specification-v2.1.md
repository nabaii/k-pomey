# K. POMEY LANDSCAPING & ALATU
## Website Design Specification

**Version** 2.1
**Date** August 2026
**Prepared for** K. Pomey Landscaping and Alatu — No. 4 Auchi Street, Area 1, Abuja
**Status** For build

---

## 0. How to read this document

This is a build specification. It supersedes v1.x entirely; do not work from earlier versions.

Sections 1–3 establish why the site is shaped the way it is. Sections 4–5 are the design system and component library — the reference a developer works from daily. Sections 6–8 specify pages and behaviour. Sections 9–15 cover quality, content, rollout and sign-off.

A developer can build from Section 4 onward. The copywriter, photographer and client-side owner should read 1–3 first, because most decisions that look aesthetic here are commercial.

**[OPEN]** marks a client decision required before launch.
**[ASSET]** marks something the client must supply.
**[LOCKED]** marks a decision that reviewers should not reopen without reading the stated reason.

---

## 1. Project brief

### 1.1 The client

K. Pomey Landscaping and Alatu is a landscaping and beautification contractor registered in Nigeria since 2016, operating from Area 1, Abuja. The firm has four revenue lines:

| Line | Character | Ticket | Cycle |
|---|---|---|---|
| Landscaping — design & build | Project work, lumpy | Large | 2–12 weeks |
| Flowers — supply & install | Fast, repeatable | Small–medium | Days |
| Alatu — garden care | Recurring, compounding | Small, monthly | Ongoing |
| Specialist construction | Occasional, exceptional | Very large | Months |

The registered name is bilingual and load-bearing: **Landscaping** (English) is the building of a garden; **Alatu** (Hausa: *beautification*) is the keeping of it. This is not a stylistic quirk — it is the business model stated on the certificate, and the site is built around it.

The firm is currently engaged on a specialist facility build of a scale far beyond its public profile. It does not wish to become a building contractor; that project is exceptional and is treated as such throughout this document.

### 1.2 The problem

No website. A small Instagram presence. A live project an order of magnitude larger than anything the firm's public presence suggests.

The gap is not between the firm and a website. It is between **what the firm is** and **what the firm looks like**.

### 1.3 The site's job

> To make a contractor look like a firm, to a person who has already heard the name.

This is a **credential**, not a discovery channel. The realistic path is: a prospect gets the name from a referral, an architect or a WhatsApp thread, then checks whether the firm is real and serious. The site must survive that check and raise the size of job the firm is invited to quote for.

Search traffic, blog content and social feeds are **out of scope**.

### 1.4 Success measures

| Class | Measure | Target |
|---|---|---|
| Primary | WhatsApp enquiries initiated from the site | Baseline month 1, growth thereafter |
| Primary | Care and flower enquiries as a share of total | ≥ 35% combined |
| Secondary | Close rate on referred leads | Client-reported, qualitative |
| Secondary | Average quoted job value | Upward over two quarters |
| Hygiene | Mobile Lighthouse performance | ≥ 90 |

Traffic volume is **not** a success measure and should not be reported as one.

---

## 2. Audience

### 2.1 Primary — the referred homeowner
Abuja homeowner or long-lease resident, 30–60, building or renovating. Arrives with the name in hand. Emotional decision, gated by risk: *will these people finish, and will it flood in July?*
**Needs:** finished work, evidence of process, a fast route to a human.

### 2.2 Secondary — the specifier
Architects, interior designers, developers, property managers who write landscaping into other people's projects. Low acquisition cost, high repeat value.
**Needs:** proof the firm can read a drawing, hold a programme and not embarrass them. Project pages and the drawing system in Section 3 exist substantially for this reader.

### 2.3 Tertiary — the institution
Hotels, schools, estates, corporates. Largest tickets and the grounds-maintenance annuity, gated by procurement paperwork rather than websites.
**Needs:** legitimacy signals and a grounds-contract offer. A company-profile PDF, outside this scope, is the real instrument here.

### 2.4 Quaternary — the flower buyer
Office managers, hotel and estate staff, homeowners refreshing a frontage. Fast decision, small ticket, high repeat.
**Needs:** to see the range, understand the two ways to buy, and message someone within thirty seconds.

### 2.5 Device and network context

Traffic is **overwhelmingly mobile**, arriving from WhatsApp and Instagram. Data is metered and expensive. Every decision assumes a phone on a mid-tier connection. Desktop is where the craft shows, but mobile is where the business happens — and where the majority of this specification's constraints come from.

---

## 3. Design concept

### 3.1 The concept: the site is a setting-out drawing

Everything on this site sits on a drawing sheet.

Landscape practices work in **plan** before they work in ground. The client's own positioning is *design first*; their Instagram highlight is *Render / Reality*; their process brochure line is *you see it before we build it*. The site therefore does not present itself as a photo gallery with text around it. It presents itself as the thing the firm actually produces first: **a drawing**.

In practice this means hairline drafting furniture carried consistently across every page — a scribed garden plan, a title block, sheet numbering, registration marks, dimension ticks, a vertical identity rail, and a ruled index in place of a card grid.

**Why this and not a photographic architecture. [LOCKED]**

- It is **specific to the trade.** A restaurant cannot use it. A competing landscaper could only use it by becoming a firm that draws — which is precisely the claim the client wants to make.
- It **carries no image weight.** The entire hero is SVG and CSS, a few kilobytes, which matters on Nigerian mobile data.
- It **works before the photography arrives** and gets better after (see 3.2).
- It **is the argument.** A prospect's core anxiety is competence, not taste. A page that looks like a set of construction drawings answers that anxiety before a word is read.

Reviewers should resist softening the drafting elements into decoration. Hairlines stay hairlines; the title block stays a title block; nothing gets a drop shadow.

### 3.2 Governing constraint: independence from photography

A substantial photographic library exists but is **not yet in the build team's hands**, and the delivery date is not fixed.

> Structure carries the site; photography improves it.

Every image is a *slot* that makes the page better when filled and does not break it when empty. Two consequences:

- **The build is never blocked.** Development runs to completion against placeholders; photography installs later as a discrete task touching no layout.
- **The design must reward a full library, not merely tolerate an empty one.** Slots are sized for real work rather than kept small to conceal their emptiness.

### 3.3 Positioning

A **landscaping, flowers and beautification practice** — not a building contractor.

The specialist facility build appears as **evidence of capability**, never as a service line. If it leads, the site attracts construction enquiries the firm does not want. It is therefore weighted by structure — index position 04, gold status flag, the site's single heat accent, the longest caption on Work — but never placed first and **never given a page of its own. [LOCKED]** Its Work card is marked up as `<article>`, not `<a>`, because a card that links nowhere must not present itself as clickable.

### 3.4 Aesthetic register

Derived from the client's own line — *merging Japanese tranquility and Nigerian vibrancy* — and from the logo's existing colours.

**Restraint with precision.** Generous negative space, hairline rules, one gold line, deep planted green, ink-and-paper contrast. Reference points: the surveyor's drawing, the *karesansui* dry garden, and the ink-on-washi document, given Nigerian colour temperature.

**Where the vibrancy lives.** Two places only, and this is deliberate: the **photography** (especially Flowers), and a **single saturated `--heat` accent used exactly once per page**. Vibrancy that appears everywhere is noise; vibrancy that appears once is emphasis.

### 3.5 The signature: the diptych

The homepage splits into two full panels hinged on a gold rule with drawn pivot points:

- **Landscaping** — set on ink. *English — the building of it.*
- **Alatu** — set on paper. *Hausa — the keeping of it.*

The business model rendered as layout. It requires no photography, encodes something true rather than decorative, and cannot be copied because no competitor has that name.

**It is the one place where boldness is spent. [LOCKED]** Everything else stays quiet. Do not add a second focal moment, and do not add a third pane — the bilingual pairing is the whole idea.

### 3.6 What we are deliberately not doing

| Rejected | Reason |
|---|---|
| Full-bleed photographic hero | Not available at build time, and less differentiating than the plan |
| Rounded "pill" buttons | A SaaS convention that contradicts a drafting system |
| Scroll-fade-up on every block | The default motion of generated sites; says nothing about this client |
| Card grid on the homepage | Merchandising. A confident portfolio lists its work |
| Testimonial carousel | Nothing to populate it; reads as filler |
| Leaf / watering-can iconography | Category cliché; the drawing does this work |
| Single long scrolling page | Mobile navigation failure (see 6.1) |
| Blog / news section | Nothing to maintain it; dies in four months |
| Any CMS or framework **at launch** | Adds cost and failure modes before the site has proven itself. Superseded post-launch by §12 |
| A runtime headless CMS (Sanity, Contentful) | Content fetched in the browser is slower, JS-dependent and exposed to free-tier changes. Rejected permanently |

---

## 4. Design system

### 4.1 Colour tokens

Declared as CSS custom properties on `:root`. **No hard-coded hex values in component CSS.**

| Token | Value | Name | Use |
|---|---|---|---|
| `--sumi` | `#161A17` | Ink | Dark surfaces, primary text, primary buttons |
| `--sumi-2` | `#272E28` | Ink soft | Secondary body text |
| `--washi` | `#EDE9E0` | Paper | Default page background |
| `--washi-2` | `#E3DED2` | Paper deep | Alternate surfaces, image-slot base |
| `--niwa` | `#0E6B3E` | Garden green | Hover states, focus rings, the word *landscaping* |
| `--niwa-2` | `#39A16D` | Garden light | Accents on dark surfaces |
| `--kanmuri` | `#C0913C` | Crown gold | The hinge, sheet numbers, flags, drafting furniture |
| `--koke` | `#878F7D` | Moss | Labels, captions, muted UI text |
| `--heat` | `#C2410C` | Heat | **One use per page. Never two.** |
| `--draw` | `kanmuri @ 55%` | Draw | All hairline drafting linework |
| `--line` | `sumi @ 16%` | Rule | Hairlines on light surfaces |
| `--line-inv` | `washi @ 18%` | Rule inverse | Hairlines on dark surfaces |

**Gold is rationed** to drafting furniture: the hinge, sheet numbers, title block values, status flags, list counters, eyebrow rules. It is never used for body text, backgrounds or buttons.

**Heat is rationed absolutely.** One element per page carries it. On Home that is the range's *In progress · 2026*. If a second appears, remove one. [LOCKED]

### 4.2 Typography

| Role | Face | Weights | Use |
|---|---|---|---|
| Display | **Zen Old Mincho** | 400, 500 | Headings, diptych words, index project names, sheet numerals, pull quotes |
| Body / UI | **Zen Kaku Gothic New** | 300, 400, 500 | Body, buttons, labels, form fields, drafting annotations |

Google Fonts, loaded with `display=swap`; fallback stacks in `style.css` must not be removed.

**Rationale.** Mincho is a Japanese serif classification, not a Western one. It delivers the tranquility half of the brief through the type itself rather than through decoration, and is unmistakably not a template's default serif.

**Scale** — headings use `clamp()` throughout:

| Element | Mobile → Desktop | Line height | Tracking |
|---|---|---|---|
| Hero H1 | 46px → 148px | 0.88 | −0.038em |
| Diptych word | 42px → 92px | 0.90 | −0.035em |
| Page H1 (inner) | 34px → 72px | 1.00 | −0.025em |
| Index project name | 21px → 40px | 1.05 | −0.02em |
| H2 | 28px → 52px | 1.14 | −0.012em |
| H3 | 19px → 26px | 1.26 | −0.012em |
| Lede | 16px → 19.5px | 1.65 | normal |
| Body | 16.5px | 1.70 | normal |
| Note / caption | 13.5–14px | 1.60 | normal |
| Eyebrow / meta | 9.5–10.5px | — | **0.20–0.26em**, uppercase |
| Drafting annotation | 9px | — | 0.18em, uppercase |

Body weight is **300**. Deliberate; do not "fix" it to 400 in review.
**Measure:** body and lede cap at 54ch; hero lede at 44ch; project notes at 46ch.

### 4.3 Spacing, grid and geometry

- **Container** `max-width: 1280px`, centred.
- **Gutter** `clamp(20px, 5.5vw, 80px)` — one token, used everywhere. No component defines its own horizontal padding except full-bleed panels.
- **Section rhythm** standard `clamp(52px, 8vw, 116px)`; tight `clamp(40px, 6vw, 80px)`.
- **Card grid** 12 columns; standard card spans 4 / 6 / 12, wide card 6 / 12 / 12 (desktop / tablet / mobile).
- **Radius `0`. Everywhere. [LOCKED]** Buttons, cards, images, flags, tags, the burger, the drawer close. A drafting system has no rounded corners; the earlier pill buttons were a borrowed convention and have been removed.
- **Hairlines** are 1px and use `--line` or `--line-inv`. Drafting linework uses `--draw` with `vector-effect: non-scaling-stroke` so weight stays true at every viewport.

### 4.4 The drawing layer

The drafting furniture that makes the concept legible. All CSS/SVG, negligible weight.

| Element | Class | Behaviour |
|---|---|---|
| Registration marks | `.reg` | 9px corner brackets, top-left and bottom-right of a bordered block |
| Identity rail | `.rail` | Fixed 42px left rail, vertical text, **≥1101px only**; body gets `.has-rail` |
| Title block | `.tblock` | Bottom-right drawing stamp: Sheet · Scale · Rev |
| Sheet number | `.sheet` | Section index — gold numeral, hairline rule, section name |
| Dimension pair | `.dim` | Label flanked by hairlines, mimicking a dimension line |
| Scribed line | `.scribe` | SVG paths draw themselves via `stroke-dashoffset` |
| Survey grid | `.grid-bg` | 46px grid, radially masked so it fades to nothing at the edges |

**Sheet numbering** runs `01`, `02`, `03`… down each page and is the page's structural spine. Home is `01 Setting out` → `02 Selected work` → `03 Alatu — garden care` → `04 Elsewhere`.

### 4.5 Motion

| Moment | Behaviour | Timing |
|---|---|---|
| Hero plan | Lines scribe in sequentially via `stroke-dashoffset`, staggered 0.05–1.76s | 2.4s `cubic-bezier(.25,.8,.3,1)` |
| Index row hover | Row indents 18px; name shifts to `--niwa` | 0.45s / 0.3s |
| Index peek | Project image follows cursor, damped at 0.14 | Continuous rAF |
| Button hover | Fill inverts to `--niwa` or `--sumi` | 0.25s |
| Section entrance | Fade + 16px rise, staggered 65ms in groups of four | 0.7s `cubic-bezier(.2,.7,.2,1)` |
| Before / after | Direct manipulation, no easing | — |

**Rules.**
- The scribe is the site's motion signature. Entrance fades are **secondary** and should not be added to blocks that sit beside the scribe, which would compete.
- The peek and any pointer-driven motion are **disabled on coarse pointers**; they cost battery and do nothing without a cursor.
- `prefers-reduced-motion: reduce` renders every animated element in its final state: plan fully drawn, content fully visible, peek disabled.
- No scroll parallax, no counters, no typewriter effects, no auto-playing carousels.

### 4.6 Image slots

Until photography lands, every image position renders as a labelled placeholder:

```html
<div class="ph" data-label="Photo — before: bare site"></div>
```

Variants: `.ph` (green-to-paper), `.ph.dark` (earth), `.ph.wet` (planted green). Each renders a gradient plus a squared dashed capsule containing the label.

To install a photograph:

```html
<img src="photos/name.jpg" alt="Descriptive alt text" loading="lazy" width="1600" height="2000">
```

Placeholders must read as **intentional**, never as broken images.

---

## 5. Component library

### 5.1 Navigation
Sticky header on every page: brand mark (home), four links (Work / Flowers / Care / Studio), one primary button. Below 981px the links and button collapse into a **full-screen drawer** with Mincho-set entries. Current page carries `aria-current="page"` and a green underline.

### 5.2 Identity rail
Fixed vertical rail, left edge, ≥1101px only: *K. Pomey — Landscaping & Alatu — Area 1, Abuja — Est. 2016*. Decorative; `aria-hidden`. Inverted variant `.rail.inv` for dark pages.

### 5.3 Buttons and actions
Three forms, all radius 0:
- **`.btn`** — filled ink, inverts to green on hover.
- **`.btn-ghost`** — outline, fills ink on hover.
- **`.hero-act`** — a joined pair sharing one border, reading as a single drawn control. Home only.
Plus **`.act`**, a rule-underlined text link used on dark bands.

### 5.4 The index list [signature component]
Replaces the card grid on Home. Ruled rows: number · project name · type & year.
- **Desktop** — row indents on hover; the project's image appears in a `.peek` panel that follows the cursor with damped motion.
- **Mobile** — no peek; each row carries an inline 16:9 thumbnail beneath it.

**Why a list.** A confident portfolio lists its work; it does not merchandise it. The list also scales — twenty projects remain scannable where twenty cards become a wall. [LOCKED]

### 5.5 The diptych
Two full-bleed panels, ink and paper, hinged on a gold rule with drawn pivot circles. Words at 42–92px. Bullets are a **numbered schedule** (`counter` with leading zeros), not a bullet list. Stacks vertically below 861px — ink above paper — which is the stronger presentation, not a fallback.

### 5.6 Before/after reveal
Two stacked layers; the *after* layer clipped with `inset(0 0 0 X%)`. Controlled by a **visually hidden native `<input type="range">`** filling the frame, which delivers keyboard and screen-reader support for free. **Do not replace with a custom pointer handler. [LOCKED]** Labelled Before/After capsules bottom-left and bottom-right; default 50%.

### 5.7 Work cards
Image, title, category, note. Standard and wide variants. Hover scales the image to 1.04. Used on Work and Flowers, not on Home.

### 5.8 Plan drawing
Hand-authored SVG per page where used. Two stroke classes: `.ln` (gold, `--draw`) and `.ln2` (green, water and planting). `.dsh` for dashed. Annotation text in the body face at 9px. Each element carries `--len` and an `animation-delay` to sequence the scribe.

### 5.9 Forms
Underline-only fields, no boxes. Labels above in 10px tracked caps; placeholders are never the only label. Submission composes a `wa.me` deep link — no backend.

### 5.10 Mobile action bar
Fixed bottom bar below 821px: page-appropriate secondary action plus **WhatsApp us**. Body carries bottom padding equal to bar height plus `env(safe-area-inset-bottom)`.

---

## 6. Information architecture

### 6.1 Sitemap

```
index.html          Home     — 01 setting out · 02 work · 03 care · 04 elsewhere
├── work.html        Work     — proof
│   └── project-*.html        — one page per project, reached from Work only
├── flowers.html     Flowers  — supply & install, the colour business
├── care.html        Care     — the recurring offer
└── studio.html      Studio   — about, process, contact (#contact)
```

Five primary pages plus one page per project. Project pages are the only second level and never appear in navigation.

**Why not one long page.** A single scroll forces the care buyer past four unrelated sections and the proof-seeker past the business model. On mobile, length is a navigation failure disguised as completeness. Separate pages also produce **sendable links** — care plans to an estate manager, a project page to a doubtful homeowner — which anchors cannot do.

### 6.2 Conversion routes

Every page terminates in a WhatsApp route. There is **no email-only primary path**; Nigerian prospects do not fill forms and wait.

1. Mobile bottom bar → direct `wa.me` link (fastest, always visible)
2. Studio contact form → composes a structured `wa.me` message (best quality lead)
3. Email → fallback, listed but not emphasised

---

## 7. Page specifications

### 7.1 Home (`index.html`)

**Job:** establish the firm's seriousness in one screen, then make the visitor pick a direction. Nothing here is exhaustive.

| Sheet | Block | Contents |
|---|---|---|
| — | Nav + rail | Brand · Work / Flowers / Care / Studio · Book a site visit |
| 01 | Hero | Survey grid, scribed garden plan, meta chips, H1, 44ch lede, joined action pair, title block |
| — | Diptych | Landscaping (ink) / Alatu (paper), numbered schedules, hinged |
| 02 | Index | H2 "From dirt to drip." + five ruled rows + All work |
| 03 | Care band | Ink band, H2, lede, rule-underlined action to Care |
| 04 | Elsewhere | Three-cell grid: Flowers · The studio · Book a site visit |
| — | Footer | Copyright, secondary nav, Instagram |

**Notes.**
- Hero lede is **two sentences maximum**. Resist expansion.
- The plan sits right of centre and is masked to fade at the edges; the headline must never overlap dense linework. Check at 1024px, 1440px and 1920px.
- The index shows **exactly five** projects. Position 04 is the facility build, carrying the page's single heat accent.

### 7.2 Work (`work.html`)

**Job:** answer *can these people actually do it?*

Structure: page head → before/after reveal (featured garden, titled and linked to its project page) → 12-column card grid → forward link to Care.

**Card order is fixed:**

| # | Card | Width | Notes |
|---|---|---|---|
| 1 | Specialist facility build | Wide | Gold *In progress · 2026* flag; `<article>`, not a link |
| 2 | Courtyard garden | Wide | |
| 3 | The Aviary | Standard | Structures |
| 4 | Flooring & paving | Standard | Hardscape |
| 5 | Green walls | Standard | Softscape |
| 6 | Render & reality | Standard | Design first |

### 7.3 Project pages (`project-*.html`)

**Job:** the Work grid answers *do they do good work*; a project page answers *do they know what they are doing*.

**One template, copied per project.** `project-poolside-garden.html` is the reference implementation. Every other project page is a copy with only the content between the numbered comment markers changed, so the portfolio reads consistently and a non-developer can add a project by copying a file and editing text.

| # | Section | Contents |
|---|---|---|
| 1 | Hero image | One wide finished shot, full-bleed, 16:10 (4:3 mobile) |
| 2 | Title | Breadcrumb to Work, name, four meta chips: place · year · duration · status |
| 3 | Brief + facts | *The site as we found it*, the reasoning, *What we did* scope list, facts sidebar |
| 4 | Before / after | Reveal component, same viewpoint, with a note confirming the frames match |
| 5 | Gallery | Six tiles, mixed ratios, captions on wide tiles only |
| 6 | Note | One line in display type — the idea behind the project |
| 7 | Next | All work · Start a garden like this |

**Section 3 does the commercial work.** The scope list must be written in trade terms — *levels re-cut and falls set away from the house*, *sub-base laid and consolidated*, *paved surround laid to fall* — not benefits language. A list that could describe any garden describes none.

The facts sidebar ends on **"Since — monthly care"** wherever true. It proves clients stay and routes toward Care without a sales line.

Projects without a matched before/after pair omit section 4 entirely; the page still reads.

### 7.4 Flowers (`flowers.html`)

**Job:** sell the supply-and-install line — among the firm's most lucrative, with revenue split evenly between one-off and repeat.

**Why nav-level, not a section on Work.** Distinct buying occasion, distinct sales cycle, and it must be a sendable link.

**Why not a third diptych pane.** Supply and install *is* beautification — it sits inside Alatu, and the Alatu pane names it. A third pane would break the bilingual pairing (see 3.5).

Structure: page head → what we supply (four tiles) → gallery → two ways to buy (ink panel) → how it works (four steps) → quote CTA.

**The gallery is the concept's one exception.** This is the single page where a dense photography-forward grid is correct, because flower work is inherently image-rich. Mixed tile ratios, captions on wide tiles only; 2-up mobile, 3-up from 641px, 4-up from 1001px.

**Colour discipline.** Flower photography is the most saturated content on the site. The chrome stays ink, paper and green; **no petal colours enter `:root`.** Flowers read brighter against restraint. [LOCKED]

**Two ways to buy** are given equal weight because the revenue does. The rotation panel links to Care rather than duplicating it — flowers are the shortest path this business has into a recurring agreement.

### 7.5 Care (`care.html`)

**Job:** convert completed builds into recurring revenue, and stand alone as a cold-sendable offer.

**Inverted to ink for the whole page.** This marks Care as a distinct product rather than a subsection, and gives it its own identity when the URL arrives without context.

Structure: page head → three plans (Monthly / Fortnightly / Grounds) → four objection panels → CTA → forward link to Studio.

The objection panels are load-bearing and should not be cut for length: *harmattan is the test*, *one crew not a new one*, *you get pictures*, *cancel on a month's notice*. Each answers a real reason people refuse maintenance contracts.

**[OPEN] Pricing.** Recommendation: publish "from ₦X per visit" on the two visit plans, keep Grounds on enquiry. Published entry pricing filters unqualified enquiries and raises perceived professionalism.

### 7.6 Studio (`studio.html`)

**Job:** legitimacy, process, and the highest-quality conversion.

Structure: page head → about (image, text, three facts) → five-step process → contact (`#contact`).

**Process steps are numbered** because the content is genuinely a sequence: Site visit → Design → Quote → Build → **Keep**. Step 05 deliberately ends in the care offer rather than at handover.

**Contact form** — name, site location, need (select), free text. Name and location required client-side. On submit it composes a pre-filled `wa.me` deep link and opens it. No backend, no hosting cost, no spam, no failure mode, and the enquiry arrives structured rather than as "hi how much for garden".

---

## 8. Responsive behaviour

CSS is authored **mobile-first**: base styles are the phone layout; `min-width` queries add complexity upward.

| Breakpoint | Change |
|---|---|
| `< 561px` | Cards full width; diptych stacked; single-column plans and process |
| `≥ 561px` | Cards 2-up; wide cards full width |
| `≥ 641px` | Process steps 2-up; flowers gallery 3-up |
| `≥ 761px` | Care plans 3-up; objection panels 2-up; close grid 3-up |
| `≥ 821px` | **Mobile action bar hidden**; body bottom padding released |
| `≥ 861px` | Diptych side-by-side with hinge; index peek replaces thumbnails; about and contact 2-column |
| `≥ 901px` | Reveal block 2-column; cards 3-up |
| `≥ 981px` | Header links and button appear; burger hidden |
| `≥ 1001px` | Process steps 5-up; flowers gallery 4-up |
| `≥ 1101px` | **Identity rail appears**; body gains 42px left padding |

---

## 9. Accessibility

Non-negotiable, verified before sign-off.

- All interactive elements keyboard-reachable in logical order.
- `:focus-visible` outline: 2px `--niwa`, 3px offset. **Never removed.**
- Drawer: `role="dialog"`, `aria-modal="true"`, closes on Escape, toggles `aria-expanded`, locks body scroll.
- Before/after control is a native range input with a descriptive `aria-label`.
- All drafting furniture — plan, rail, grid, registration marks, arrows — is `aria-hidden="true"`. It is decoration and must not reach a screen reader.
- Every `<img>` carries meaningful `alt`.
- Form inputs wrapped in `<label>`; placeholders never the only label.
- `prefers-reduced-motion: reduce` fully honoured (see 4.5).
- Contrast meets **WCAG AA (4.5:1)** for all body and label text. Verify `--koke` on `--washi`, gold on ink, and `--heat` on paper. Adjust the token, not the instance.
- Tap targets minimum 44×44px.

---

## 10. Technical specification

### 10.1 Stack
Static HTML, CSS and vanilla JavaScript. **No framework, no build step, no CMS, no database.**

A small portfolio with a framework acquires a build pipeline, a dependency tree and an update burden that guarantee the site is dead within a year. Anyone who can edit HTML can maintain this.

**Phase 2 amends this.** Once launch is proven, the site moves to a static site generator with a Git-based CMS so a non-technical editor can maintain it. See §12. The generator runs on the host, never on anyone's machine, and the published result is still plain static HTML — the performance and resilience properties of this section are preserved.

### 10.2 File structure

| File | Size | Notes |
|---|---|---|
| `index.html` | ~17 KB | Home; carries the plan SVG inline |
| `work.html` | ~9 KB | Portfolio |
| `flowers.html` | ~10 KB | Supply & install gallery |
| `care.html` | ~7 KB | Maintenance offer |
| `studio.html` | ~10 KB | About, process, contact |
| `project-*.html` | ~11 KB each | One per project, copied from template |
| `style.css` | ~13 KB | Shared, cached after first load |
| `app.js` | ~4.5 KB | Shared, deferred |
| `/photos/` | — | All imagery |

Page-specific CSS lives in a `<style>` block in that page's head; anything used on two or more pages belongs in `style.css`.

### 10.3 Performance budget

| Metric | Budget |
|---|---|
| First page HTML + CSS + JS | < 36 KB uncompressed |
| Subsequent pages (CSS/JS cached) | < 12 KB |
| Largest image | < 250 KB, WebP preferred |
| Lighthouse Performance (mobile) | ≥ 90 |
| Lighthouse Accessibility | ≥ 95 |

All below-fold images carry `loading="lazy"` and explicit `width`/`height` to prevent layout shift.

### 10.4 Hosting and deployment
Netlify or Vercel free tier; drag-and-drop or Git-connected. Custom domain with HTTPS. No server runtime.

**[OPEN] Domain.** `kpomey.com` appears in the WhatsApp signature and placeholder email. Confirm or replace before launch.

### 10.5 Configuration to replace before launch

| Item | Location | Placeholder |
|---|---|---|
| WhatsApp number | `app.js` constant `PHONE` | `2340000000000` |
| WhatsApp number | Bottom bar `href`, every page | `wa.me/2340000000000` |
| WhatsApp number | Studio contact list | `+234 000 000 0000` |
| Email | Studio contact + hint line | `hello@kpomey.com` |
| Domain | `app.js` message signature | `kpomey.com` |

### 10.6 Analytics
Plausible or Cloudflare Web Analytics. Track page views, outbound `wa.me` clicks, form submissions. Do not install Google Analytics on a site this small; the payload exceeds the site.

---

## 11. Content and assets

### 11.1 Photography — retrieval, not commissioning

A substantial library exists across the firm's devices and accounts. The task is **retrieval and curation**, not a shoot — good news for cost, bad news for scheduling.

**[ASSET] Step one — locate the library.**

| Likely source | Custodian | Notes |
|---|---|---|
| Principal's phone | Client | Largest and least organised store |
| Supervisors' and crew phones | Crew | Often the only place *before* shots exist |
| Instagram archive | Client | Compressed; use only if no original survives |
| Renders and drawings | Client / designer | Feeds the render-vs-reality pairing |
| Facility build progress | Client | Subject to the permission in 11.4 |
| Third-party photos | Varies | Confirm the right to publish |

**Transfer:** one shared cloud folder, foldered by project. **Originals only** — not WhatsApp forwards, which recompress to roughly a tenth of resolution and cannot be recovered.

**[ASSET] Step two — minimum viable selection:**

| Slot | Page | Count |
|---|---|---|
| Featured garden — before | Work | 1 |
| Featured garden — after (same viewpoint) | Work | 1 |
| Facility build — render or progress | Home, Work | 1 |
| Project heroes | Project pages | 1 each |
| Project galleries | Project pages | 6 each |
| Flower gallery | Flowers | 10 |
| Crew on site | Studio | 1 |

**Step three — curate.** With a deep library the failure mode inverts: the risk is too many mediocre images, not too few.

- One project, one best frame per card.
- Prefer the wide establishing shot; details read as unclear at thumbnail size.
- **Hunt matched before/after pairs first** — they feed the reveal, the site's proof mechanism.
- Prefer mature gardens; a project a year after handover beats the same project on handover day.
- Reject anything blurred, filtered, screenshot-resolution, shot at harsh midday, or showing client property identifiers or faces without permission.

**Delivery:** minimum 2000px long edge; named `project_role-nn.jpg`. The build team converts to WebP and compresses to budget. **The client should not pre-compress anything.**

### 11.2 The three-shot protocol — ongoing

Standing practice from the next project onward. It applies to new work; the existing library is curated under 11.1 rather than reshot.

**From the same standing position, on every project:**
1. **Before** — before mobilisation
2. **During** — at structural stage
3. **After** — at handover

Mark the standing position so the frames align. A garden shot from three angles is three unrelated pictures; from one angle it is a story.

Maintenance visits are the best photographic opportunity the firm has — a garden at handover has not grown in.

### 11.3 Copy

Voice: **plain, direct, specific.** Short declarative sentences. Concrete nouns. Active verbs. No superlatives, no "passion", no "we pride ourselves".

The register comes from the trade: *laid to fall*, *set out on the ground*, *drains away from the house*, *between the rains and the harmattan*. Specificity is the credibility.

- Buttons say what happens: *Send on WhatsApp*, not *Submit*.
- An action keeps its name through the flow.
- Sentence case except eyebrows, buttons and drafting annotations.
- Errors state what went wrong and how to fix it, without apologising.

**[ASSET]** Real project names, locations, durations and years for every project page and card.

### 11.4 Sensitive content

**[OPEN] Facility build disclosure.** Currently described as *"a shooting sports facility"* with no client name and no contract value. Both are commercially useful; both require **written permission from the end client**, accounting for security sensitivities.

Until that permission exists in writing, the current wording stands. This is a legal and relationship matter, not a copy preference.

---

## 12. Content management — Phase 2

### 12.1 Why this exists

v1 launches as hand-authored static HTML, and §3.6 rejects a CMS at launch for good reasons. Two facts move the decision after launch:

- Content will change **monthly** — driven mainly by the flower gallery and by new projects.
- The editor will eventually be **someone at K. Pomey, not the developer**.

Monthly editing by hand, routed through one person, is how a site quietly stops being updated. An admin is therefore justified — but only once the site has launched and proven it earns enquiries.

**Timing. [LOCKED]** Phase 2 begins **after launch**, and after the §13 rollout of the drawing system is complete. Converting six finished pages into templates is roughly two days' work; converting twenty-five unfinished ones is a week. Do not start the migration before the design is settled.

### 12.2 Architecture

| Layer | Choice | Note |
|---|---|---|
| Generator | **Eleventy (11ty)** | Renders markdown + data into the same static HTML the site already serves |
| Admin | **Sveltia CMS** | Decap-compatible, Git-based, materially better on mobile than Decap |
| Storage | Git repository | Content is versioned; every edit is revertible |
| Build | Netlify (or Vercel) on commit | Runs on the host, never on an editor's machine |
| Auth | Netlify Identity or GitHub OAuth | Two to four accounts, no self-registration |

**Rejected: a runtime headless CMS.** Fetching content in the browser is slower on a metered mobile connection, fails without JavaScript, and puts the site's content behind a third party's free-tier policy. The published output must remain plain static HTML. [LOCKED]

### 12.3 Content model

Four collections.

**Projects** — one markdown file per project, rendering `project-*.html`.

| Field | Type | Required | Notes |
|---|---|---|---|
| Title | text | yes | e.g. *Poolside garden* |
| Slug | text | yes | Auto-generated; drives the filename |
| Category | select | yes | Landscaping · Structures · Hardscape · Softscape · Design first |
| Location | text | yes | Defaults to *Abuja, FCT* |
| Year | number | yes | |
| Duration | text | yes | e.g. *7 weeks* |
| Care status | select | yes | On monthly care · On fortnightly care · Not on care |
| Order | number | yes | Controls position in the Work grid and Home index |
| Featured on home | boolean | no | Maximum five; validated |
| Linkable | boolean | yes | **False renders the card as `<article>`, not `<a>`** — this is how the facility build stays card-only (§3.3) |
| Hero image | image | yes | |
| "As we found it" | markdown | yes | Two paragraphs maximum |
| Scope list | list of text | yes | Trade terms, not benefits language (§7.3) |
| Facts | key/value list | yes | Location, type, scope, build, completed, planting, since |
| Before image | image | no | Omitting either before or after hides section 4 entirely |
| After image | image | no | Must share the before image's viewpoint |
| Gallery | list of image + caption | no | Six recommended |
| Closing note | text | no | One line, display type |

**Flower gallery** — the highest-cadence collection.

| Field | Type | Required |
|---|---|---|
| Image | image | yes |
| Caption | text | no |
| Tile size | select (square · portrait · wide) | yes |
| Order | number | yes |

**Care plans** — three entries: name, description, feature list, optional price.

**Site settings** — a single record, and the most valuable item in this section:

| Field | Notes |
|---|---|
| WhatsApp number | Currently duplicated across five locations (§10.5). One field ends that class of error permanently |
| Email | |
| Office address | |
| Hours | |
| Instagram URL | |
| Domain | Used in the WhatsApp message signature |

### 12.4 What the admin may and may not change

An admin that can edit anything becomes the mechanism by which the design degrades. The boundary is a design decision, not a technical one.

**Editable:** project content, flower gallery, care plan copy and prices, site settings, page ledes and section headings where explicitly exposed.

**Not editable, under any account: [LOCKED]** layout, section order, colour tokens, typefaces, type scale, the diptych, sheet numbering, the plan drawing, motion, and the fixed card order on Work. These are specified in §4–§7 and must not be one click away from an editor.

Fields are constrained rather than free: categories and care statuses are selects, not text; tile sizes are selects; image uploads are validated for minimum dimensions. A CMS that accepts anything will receive anything.

### 12.5 Admin experience requirements

The admin is a mobile product. It will be used on a phone, on site, by someone who is not a web professional.

- Every field carries **help text written in the client's language** — "the widest shot of the finished garden", not "hero image".
- The scope-list field shows an example of trade phrasing beside it.
- **Image uploads are resized and converted to WebP on build**, not by the editor. The instruction to upload originals (§11.1) only holds if the system does the compressing.
- Minimum image dimensions are validated on upload with a plain-language failure message.
- Preview before publish, on the real template.
- Draft state, so a half-written project never appears live.
- Editorial workflow is **not** required — two to four users, no approval chain.

### 12.6 Roles

| Role | Who | Can |
|---|---|---|
| Editor | K. Pomey staff | Create and edit projects, flowers, care copy |
| Admin | Developer | Everything, plus site settings and user management |

No public registration. Accounts are created by the admin.

### 12.7 Migration sequence

1. Complete the §13 drawing-system rollout on all pages.
2. Launch v1 static. Confirm enquiries arrive.
3. Introduce Eleventy; convert the finished pages to templates with **no visual change** — the rendered output should be byte-comparable in structure.
4. Extract existing content into markdown and data files.
5. Add Sveltia CMS, the content model above, and Netlify Identity.
6. Train the client editor on one real project, end to end.
7. Hand over a one-page written guide covering adding a project, adding flower images, and changing the WhatsApp number.

### 12.8 Guardrails

- **No visual change during migration.** If the site looks different afterwards, something has gone wrong. Rendered output is diffed before and after.
- **The performance budget in §10.3 still applies** to the generated output.
- **Content is versioned in Git**, so any edit is revertible.
- **If the client stops editing, nothing breaks.** The site remains static HTML and continues to serve exactly as it does today. This is the main advantage over a runtime CMS and should not be traded away.

### 12.9 Interim measure, before Phase 2

One change is worth making **immediately, in v1**: move contact details into a single `site.json` consumed by the pages, so the WhatsApp number lives in one place rather than five. It is a small change, it removes the most likely launch error, and it is the first step of the content model above.

---

## 13. Rollout status

The drawing system was introduced after the first pages were built. Current state:

| Page | On the drawing system | Outstanding |
|---|---|---|
| Home | **Yes** — full implementation | — |
| Work | Partial | Convert grid to index treatment; add sheet numbering and title block |
| Project pages | Partial | Add sheet numbering; consider a plan drawing per project |
| Flowers | Partial | Add sheet numbering; the gallery stays photo-forward |
| Care | Partial | Add sheet numbering and inverted rail |
| Studio | Partial | Add sheet numbering; the process section should adopt drafting numerals |

All pages already share the updated tokens, squared geometry and component CSS, so they are visually coherent — but Home is currently the only full expression of the concept.

**Recommended order:** Work → Studio → Flowers → Care → project pages. This work should be completed **before** the Phase 2 migration in §12, so the templates converted into the generator are the finished ones.

---

## 14. Acceptance criteria

**Function**
- [ ] All navigation links resolve; no 404s
- [ ] Drawer opens and closes on link click, close button and Escape
- [ ] Before/after slider works by drag, tap-drag and arrow keys
- [ ] Index peek appears on hover on desktop, is absent on touch, and rows show thumbnails on mobile
- [ ] Contact form validates required fields and opens WhatsApp with correctly encoded, correctly line-broken text
- [ ] All `wa.me` links use the live number
- [ ] Contact details are sourced from a single `site.json`, not duplicated per page (§12.9)
- [ ] Bottom bar appears below 821px only and never covers footer content

**Design**
- [ ] No hard-coded colours outside `:root`
- [ ] No radius anywhere except `0`
- [ ] `--heat` appears exactly once per page
- [ ] Hero plan does not collide with the headline at 1024, 1440 and 1920px
- [ ] Diptych renders correctly stacked and side-by-side; hinge and pivots visible only above 861px
- [ ] Rail appears only above 1101px and never overlaps content
- [ ] Placeholders read as intentional

**Quality**
- [ ] Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95
- [ ] Verified on iOS Safari, Android Chrome, desktop Chrome and Safari
- [ ] Verified at 320px width with no horizontal scroll
- [ ] Reduced-motion honoured: plan fully drawn, no peek, no entrance fades
- [ ] All drafting furniture is `aria-hidden`
- [ ] All images carry alt text and lazy loading

---

## 15. Scope boundaries

**Out of scope for v1:** blog or news, client login, e-commerce, booking calendar, multilingual switching, testimonials, team biographies, downloadable brochure, live chat, newsletter capture.

**Phase 2, specified in §12:** content management via Eleventy and a Git-based CMS.

**Sensible for v2:** filtering on Work, a plan drawing per project page, a seasonal state for the hero plan (wet season / harmattan), and the facility build as a full case study once complete and permitted.

**Higher commercial value than most of this build, and recommended separately:**
1. **Company profile PDF** — 10–12 pages, procurement-ready. The instrument that opens institutional doors; a website is not.
2. **Care and flower rotation pricing with a contract template** — converting maintenance from an ad-hoc favour into a sold product.
3. **Facility build case study** — commissioned properly on completion, with permission.
4. **Instagram alignment** — feed and site reinforcing one identity rather than competing.

---

## 16. Open decisions

| # | Decision | Owner | Blocks |
|---|---|---|---|
| 1 | Publish care-plan pricing, or keep on enquiry | Client | Care copy |
| 2 | Permission to name the facility client and state contract value | Client + end client | Work card copy |
| 3 | Domain name confirmation | Client | Launch |
| 4 | Live WhatsApp number and email | Client | Launch |
| 5 | Real project names, durations and years | Client | Work + project pages |
| 6 | Photo library access — location, custodian, delivery route | Client | Launch quality |
| 7 | Flower gallery selection | Client | Flowers page |
| 8 | Final project list — which projects get pages | Client | Work + project pages |
| 9 | Whether flower buyers are the same audience as garden buyers | Client | Home hierarchy |
| 10 | Confirm Phase 2 CMS is commissioned, and on what timeline | Client + developer | Post-launch scope |
| 11 | Who holds the editor accounts, and who trains them | Client | Phase 2 handover |

Decision 9 is worth attention: if flower clients are a materially different crowd, Flowers may deserve promotion above Work in the homepage hierarchy — a larger change than adding a page.

---

*End of specification. Version 2.1 — August 2026.*
