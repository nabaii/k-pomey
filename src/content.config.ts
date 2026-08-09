import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
// Astro 7 deprecates re-exporting `z` from astro:content; import it directly.
import { z } from 'zod';

/**
 * §12.3 content model, expressed as schemas rather than CMS configuration.
 *
 * The spec asks a CMS to constrain these fields ("A CMS that accepts anything
 * will receive anything"). Encoding them here means a bad value fails the
 * build instead of reaching the site — the admin in keystatic.config.ts is a
 * second expression of the same contract, not the only one.
 */

/** §3.2 — every image is a slot. Present, it improves the page; absent, the
 *  page still works. `src` is therefore always optional and the build is
 *  never blocked on photography that has not arrived. */
const mediaSlot = <T extends z.ZodType>(image: () => T) =>
  z.object({
    /** The photograph. Omit until the library lands (§11.1).
     *  nullish, because the admin writes an explicit null for an empty image. */
    src: image().nullish(),
    /** §9 — meaningful alt for every image. Required once src exists. */
    alt: z.string().default(''),
    /** Shown in the placeholder while src is absent. Must read as intentional. */
    label: z.string(),
    /** Placeholder treatment: green-to-paper, earth, or planted green (§4.6). */
    tone: z.enum(['pale', 'earth', 'wet']).default('pale'),
  });

const CATEGORIES = ['Landscaping', 'Structures', 'Hardscape', 'Softscape', 'Design first', 'Specialist build'] as const;
const CARE_STATUS = ['On monthly care', 'On fortnightly care', 'Not on care'] as const;

const projects = defineCollection({
  loader: glob({
    pattern: '**/index.mdoc',
    base: './src/content/projects',
    // Directory name is the slug, so photographs can sit beside their project.
    generateId: ({ entry }) => entry.split('/')[0]!,
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      category: z.enum(CATEGORIES),
      location: z.string().default('Abuja, FCT'),
      year: z.number().int().min(2000).max(2100),
      duration: z.string(),
      careStatus: z.enum(CARE_STATUS),

      /** One line for the Work card and the Home index. */
      summary: z.string(),

      /**
       * §12.3 [LOCKED] — false renders the card as <article>, not <a>.
       * This is how the facility build stays card-only (§3.3), and how a
       * project whose page has not been written yet avoids a dead link.
       */
      linkable: z.boolean(),

      /**
       * §3.3 [LOCKED] — the facility build is "never given a page of its own".
       * neverLink goes further than linkable: a project that is merely awaiting
       * copy still points at its card on Work, but this one points nowhere at
       * all and renders as <article> everywhere it appears.
       */
      neverLink: z.boolean().default(false),

      /** Position in the Work grid. null = not in the grid. §7.2 fixes order. */
      workOrder: z.number().int().positive().nullable().default(null),
      /** Position in the Home index. null = absent. Exactly five appear. */
      homeOrder: z.number().int().positive().nullable().default(null),
      /** The before/after hero at the top of Work. At most one project. */
      isFeaturedReveal: z.boolean().default(false),

      /** Wide cards span 6 of 12 on desktop, standard cards 4 (§4.3). */
      cardWidth: z.enum(['standard', 'wide']).default('standard'),
      /** Gold status flag drawn on the card image, e.g. "In progress · 2026". */
      flag: z.string().optional(),
      /**
       * §4.1 — marks this project's meta as the single --heat accent on pages
       * that *list* projects (Home index, Work grid). Exactly one project may
       * set it. A project page picks its own accent in the template.
       */
      carriesHeat: z.boolean().default(false),

      hero: mediaSlot(image),
      /** §7.3 — trade terms, not benefits language. */
      scope: z.array(z.string()).default([]),
      facts: z.array(z.object({ label: z.string(), value: z.string() })).default([]),

      /**
       * §7.3 — "Projects without a matched before/after pair omit section 4
       * entirely; the page still reads."
       *
       * An explicit flag rather than inferring from the images: the frames are
       * placeholders until the library lands (§11.1), so their presence proves
       * nothing. The editor states whether a matched pair exists.
       */
      hasBeforeAfter: z.boolean().default(false),
      before: mediaSlot(image).optional(),
      after: mediaSlot(image).optional(),
      revealNote: z.string().optional(),

      gallery: z
        .array(
          mediaSlot(image).extend({
            caption: z.string().optional(),
            size: z.enum(['square', 'wide']).default('square'),
          }),
        )
        .default([]),

      /** One line in display type — the idea behind the project (§7.3 §6). */
      closingNote: z.string().optional(),
    }),
});

/** §12.3 — the highest-cadence collection. */
const flowers = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/flowers' }),
  schema: ({ image }) =>
    mediaSlot(image).extend({
      caption: z.string().optional(),
      size: z.enum(['square', 'wide']).default('square'),
      order: z.number().int().positive(),
    }),
});

/** §12.3 — three entries: name, description, feature list, optional price. */
const carePlans = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/care-plans' }),
  schema: z.object({
    name: z.string(),
    kind: z.enum(['Visit', 'Contract']),
    description: z.string(),
    features: z.array(z.string()),
    /** [OPEN §7.5 / decision 1] "from ₦X per visit", or omit for on enquiry. */
    price: z.string().optional(),
    order: z.number().int().positive(),
  }),
});

export const collections = { projects, flowers, carePlans };
