# Keeping the site up to date

A one-page guide, as required by specification §12.7 step 7.

Nothing here needs a developer. If something in this guide does not work,
that is a fault in the site, not in you — say so.

---

## Opening the editor

1. Open the project folder on the computer that has the site on it.
2. Run `npm run dev`.
3. Open **http://localhost:4321/keystatic** in a browser.

Everything you change is saved straight into the project's files. Nothing goes
live until the site is published, so you cannot break the live site from here.

---

## Changing the WhatsApp number, email or address

**Settings → Contact details.**

This is the single most useful screen in the editor. The WhatsApp number you
type here is used by *every* WhatsApp button on *every* page — the bar at the
bottom of the phone screen, the contact form, all of it. There is nowhere else
to change it and no way to miss one.

Type the number with the country code and **no plus sign and no spaces**:
`2348012345678`.

---

## Adding a flower photograph

**Flowers → Flower gallery → Add.**

- **Placeholder caption** — describe the shot, e.g. *Photo — potted entrance*.
  It is shown only while there is no photograph.
- **Photograph** — upload the original from the phone or camera. Do not shrink
  or compress it first; the site does that itself, and better.
- **Describe the photograph** — one line saying what is in the picture, for
  people who cannot see it. *"Red ixora in a row of terracotta pots"*.
- **Size** — *Wide* pictures span two columns and are the only ones that show a
  caption. Use one every five or six pictures, not more.
- **Position** — lower numbers come first.

---

## Adding a project

**Work → Projects → Add.**

Fill in the name, type of work, year and how long the build took. Then:

- **One line about the project** — what changed, not how lovely it is.
- **Position on the Work page** — lower numbers come first.
- **Position on the home page list** — leave this empty unless the project
  belongs on the home page. **Exactly five projects may have a number here.** If
  six do, or four, the site will refuse to publish and tell you which ones.
- **Give this project its own page** — leave this **off** until you have written
  *What we did*, the *Project facts* and *The site as we found it*. While it is
  off, the project still appears on Work as a picture and a caption, but it is
  not a link, so nobody taps something that goes nowhere.

**What we did** is the part that wins work. Write it the way you would say it
standing on the site: *levels re-cut and falls set away from the house*,
*sub-base laid and consolidated*, *paved surround laid to fall*. A list that
could describe any garden describes none.

**We have a matched before/after pair** — tick this only if the two photographs
were taken from the same standing position. If they were not, leave it off and
the slider is left off the page. Two unrelated pictures side by side prove
nothing and it shows.

---

## Changing care plan prices

**Care → Care plans.** Each plan has a **Price** field. Leave it empty to keep
that plan on enquiry.

---

## Publishing

Commit the changes to Git and push. The host rebuilds the site by itself.

If the build fails, it will say why in plain words — usually that six projects
are marked for the home page instead of five, or that a photograph has no
description. Fix the thing it names and push again.

---

## What you cannot change here, and why

Layout, colours, typefaces, text sizes, the two-panel *Landscaping / Alatu*
spread, the sheet numbers down the side of each page, the drawing on the home
page, and the order of the fixed sections.

That is deliberate (§12.4). Those decisions are what make the site look like it
was made by a firm rather than assembled. An editor that could change them
would, eventually, on a Friday afternoon — and there would be no way back.
Everything that *should* change month to month is in this guide.
