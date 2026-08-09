import { config, fields, collection, singleton } from '@keystatic/core';

/**
 * §12 CONTENT MANAGEMENT
 *
 * This is the second expression of the content model. The first is
 * src/content.config.ts, which validates at build time; this one shapes what
 * an editor can do at all. Both must agree — the schemas are the contract.
 *
 * §12.4 [LOCKED] draws the boundary: "An admin that can edit anything becomes
 * the mechanism by which the design degrades." Layout, section order, colour
 * tokens, typefaces, the type scale, the diptych, sheet numbering, the plan
 * drawing and motion appear nowhere below and are not reachable from here.
 *
 * §12.5 — this is a mobile product. It will be used on a phone, on site, by
 * someone who is not a web professional, so every field carries help text
 * written in the client's language ("the widest shot of the finished garden",
 * not "hero image").
 *
 * Storage is local: edits write to files in this repo and are committed to
 * Git, so every change is versioned and revertible (§12.2). Switch `kind` to
 * 'github' once the repo is hosted and the client edits from their phone.
 */

const TONE_HELP =
  'Only used while a photograph is missing — it sets the colour of the placeholder.';

const tone = fields.select({
  label: 'Placeholder shade',
  description: TONE_HELP,
  options: [
    { label: 'Pale — sage and paper', value: 'pale' },
    { label: 'Earth — dark soil', value: 'earth' },
    { label: 'Planted — deep green', value: 'wet' },
  ],
  defaultValue: 'pale',
});

/** §3.2 — every image is optional, so a half-photographed project still
 *  publishes and still reads. */
const mediaSlot = (labelText: string, description: string) =>
  fields.object(
    {
      src: fields.image({
        label: 'Photograph',
        description,
        // Stored beside the project so a project folder holds everything.
        directory: 'src/content/projects',
        publicPath: '',
        validation: { isRequired: false },
      }),
      alt: fields.text({
        label: 'Describe the photograph',
        description:
          'For people using a screen reader, and shown if the image fails to load. ' +
          'Say what is in the picture, e.g. "Royal palms along a paved pool surround".',
        validation: { isRequired: false },
      }),
      label: fields.text({
        label: 'Placeholder caption',
        description:
          'Shown in place of the photograph until one is added. Describe the shot you want, ' +
          'e.g. "Photo — finished garden, wide".',
        validation: { isRequired: false },
      }),
      tone,
    },
    { label: labelText },
  );

export default config({
  storage: { kind: 'local' },

  ui: {
    brand: { name: 'K. Pomey' },
    navigation: {
      Work: ['projects'],
      Flowers: ['flowers'],
      Care: ['carePlans'],
      Settings: ['settings'],
    },
  },

  singletons: {
    /**
     * §12.3 — "the most valuable item in this section". The WhatsApp number
     * was duplicated across five locations (§10.5); one field ends that class
     * of error permanently.
     */
    settings: singleton({
      label: 'Contact details',
      path: 'src/content/settings/site',
      format: { data: 'json' },
      schema: {
        whatsapp: fields.text({
          label: 'WhatsApp number',
          description:
            'Digits only, starting with the country code and no plus sign or spaces — ' +
            'for example 2348012345678. This is the number every WhatsApp button on the site uses.',
          validation: { isRequired: true, pattern: { regex: /^\d{10,15}$/ } },
        }),
        whatsappDisplay: fields.text({
          label: 'WhatsApp number, as written on the page',
          description: 'How the number should look to a reader, e.g. +234 801 234 5678.',
          validation: { isRequired: true },
        }),
        email: fields.text({
          label: 'Email address',
          validation: { isRequired: true },
        }),
        instagram: fields.text({
          label: 'Instagram handle',
          description: 'Without the @ sign.',
          validation: { isRequired: true },
        }),
        domain: fields.text({
          label: 'Website address',
          description:
            'Without https:// — e.g. kpomey.com. It is signed at the bottom of every ' +
            'WhatsApp message the contact form sends.',
          validation: { isRequired: true },
        }),
        officeLine1: fields.text({ label: 'Office address, first line' }),
        officeLine2: fields.text({ label: 'Office address, second line' }),
        hours: fields.text({ label: 'Opening hours' }),
        serviceArea: fields.text({ label: 'Service area' }),
      },
    }),
  },

  collections: {
    projects: collection({
      label: 'Projects',
      path: 'src/content/projects/*/',
      slugField: 'title',
      format: { contentField: 'content' },
      entryLayout: 'content',
      columns: ['title', 'category', 'year'],
      schema: {
        title: fields.slug({
          name: {
            label: 'Project name',
            description: 'What you would call it on site, e.g. "Poolside garden".',
          },
          slug: {
            label: 'Web address',
            description: 'Becomes the end of the link. Leave it alone unless you have a reason.',
          },
        }),

        category: fields.select({
          label: 'Type of work',
          options: [
            { label: 'Landscaping', value: 'Landscaping' },
            { label: 'Structures', value: 'Structures' },
            { label: 'Hardscape', value: 'Hardscape' },
            { label: 'Softscape', value: 'Softscape' },
            { label: 'Design first', value: 'Design first' },
            { label: 'Specialist build', value: 'Specialist build' },
          ],
          defaultValue: 'Landscaping',
        }),

        location: fields.text({ label: 'Where', defaultValue: 'Abuja, FCT' }),
        year: fields.integer({
          label: 'Year finished',
          validation: { isRequired: true, min: 2000, max: 2100 },
        }),
        duration: fields.text({
          label: 'How long the build took',
          description: 'In plain words, e.g. "7 weeks".',
          validation: { isRequired: true },
        }),
        careStatus: fields.select({
          label: 'Are we still keeping it?',
          description:
            'Proof that clients stay. It shows on the project page and routes readers to Care.',
          options: [
            { label: 'On monthly care', value: 'On monthly care' },
            { label: 'On fortnightly care', value: 'On fortnightly care' },
            { label: 'Not on care', value: 'Not on care' },
          ],
          defaultValue: 'Not on care',
        }),

        summary: fields.text({
          label: 'One line about the project',
          description:
            'Shown on the Work page under the picture. One or two sentences. ' +
            'Say what changed, not how lovely it is.',
          multiline: true,
          validation: { isRequired: true },
        }),

        linkable: fields.checkbox({
          label: 'Give this project its own page',
          description:
            'Leave this OFF until the full story below is written. When it is off, the ' +
            'project still appears on Work as a picture and a caption, but it is not a link — ' +
            'so nobody taps something that goes nowhere.',
          defaultValue: false,
        }),
        neverLink: fields.checkbox({
          label: 'Never link this project anywhere',
          description:
            'For work that is shown as evidence only and must not invite enquiries.',
          defaultValue: false,
        }),

        workOrder: fields.integer({
          label: 'Position on the Work page',
          description: 'Lower numbers come first. Leave empty to keep it off the Work page.',
          validation: { isRequired: false, min: 1 },
        }),
        homeOrder: fields.integer({
          label: 'Position on the home page list',
          description:
            'Lower numbers come first. Exactly five projects must have a number here — ' +
            'if more or fewer do, the site will refuse to publish and tell you so.',
          validation: { isRequired: false, min: 1 },
        }),
        isFeaturedReveal: fields.checkbox({
          label: 'Use as the before/after at the top of Work',
          description: 'Only one project can be this, and it needs both a before and an after photo.',
          defaultValue: false,
        }),

        cardWidth: fields.select({
          label: 'Picture size on the Work page',
          options: [
            { label: 'Standard', value: 'standard' },
            { label: 'Wide', value: 'wide' },
          ],
          defaultValue: 'standard',
        }),
        flag: fields.text({
          label: 'Status flag',
          description: 'Optional gold tag on the picture, e.g. "In progress · 2026".',
          validation: { isRequired: false },
        }),
        carriesHeat: fields.checkbox({
          label: 'Give this project the single orange highlight',
          description:
            'Exactly one project may have this. It is the one warm colour on the page, ' +
            'and it stops being emphasis if two things have it.',
          defaultValue: false,
        }),

        hero: mediaSlot('Main photograph', 'The widest shot of the finished garden.'),

        scope: fields.array(
          fields.text({ label: 'Item' }),
          {
            label: 'What we did',
            description:
              'Write these the way you would say them on site: "levels re-cut and falls set ' +
              'away from the house", "sub-base laid and consolidated", "paved surround laid to ' +
              'fall". A list that could describe any garden describes none.',
            itemLabel: (props) => props.value,
          },
        ),

        facts: fields.array(
          fields.object({
            label: fields.text({ label: 'Name' }),
            value: fields.text({ label: 'Detail' }),
          }),
          {
            label: 'Project facts',
            description: 'The small table beside the story. End on "Since — monthly care" where true.',
            itemLabel: (props) => `${props.fields.label.value}: ${props.fields.value.value}`,
          },
        ),

        hasBeforeAfter: fields.checkbox({
          label: 'We have a matched before/after pair',
          description:
            'Tick this only when the two photographs below are shot from the same standing ' +
            'position. Leave it off and the slider is left off the page entirely — which reads ' +
            'better than a slider between two unrelated pictures.',
          defaultValue: false,
        }),
        before: mediaSlot(
          'Before photograph',
          'Taken from the same standing position as the after shot. Leave both empty to hide the slider.',
        ),
        after: mediaSlot(
          'After photograph',
          'The same view as the before shot, once the garden was finished.',
        ),
        revealNote: fields.text({
          label: 'Note under the before/after',
          description: 'Confirms the two frames match, e.g. "Both shot from the terrace steps".',
          multiline: true,
          validation: { isRequired: false },
        }),

        gallery: fields.array(
          fields.object({
            src: fields.image({
              label: 'Photograph',
              directory: 'src/content/projects',
              publicPath: '',
              validation: { isRequired: false },
            }),
            alt: fields.text({ label: 'Describe the photograph', validation: { isRequired: false } }),
            label: fields.text({ label: 'Placeholder caption', validation: { isRequired: true } }),
            tone,
            caption: fields.text({
              label: 'Caption',
              description: 'Only shown on wide pictures.',
              validation: { isRequired: false },
            }),
            size: fields.select({
              label: 'Size',
              options: [
                { label: 'Square', value: 'square' },
                { label: 'Wide', value: 'wide' },
              ],
              defaultValue: 'square',
            }),
          }),
          {
            label: 'The garden — picture gallery',
            description: 'Six pictures reads best.',
            itemLabel: (props) => props.fields.label.value || 'Picture',
          },
        ),

        closingNote: fields.text({
          label: 'Closing line',
          description:
            'One sentence, set large at the end of the page. The idea behind the project, ' +
            'e.g. "A pool is a surface. A poolside is a room."',
          validation: { isRequired: false },
        }),

        content: fields.markdoc({
          label: 'The site as we found it',
          description:
            'Two paragraphs at most. What the place was like before you started, and what the ' +
            'owners actually wanted. Plain and specific.',
          options: { image: false },
        }),
      },
    }),

    flowers: collection({
      label: 'Flower gallery',
      path: 'src/content/flowers/*',
      slugField: 'label',
      format: { data: 'yaml' },
      columns: ['label', 'order'],
      schema: {
        label: fields.slug({
          name: {
            label: 'Placeholder caption',
            description: 'Describe the shot, e.g. "Photo — planted bed, wide".',
          },
        }),
        src: fields.image({
          label: 'Photograph',
          directory: 'src/content/flowers',
          publicPath: '',
          validation: { isRequired: false },
        }),
        alt: fields.text({ label: 'Describe the photograph', validation: { isRequired: false } }),
        tone,
        caption: fields.text({
          label: 'Caption',
          description: 'Only shown on wide pictures, e.g. "Flowering bed, Abuja".',
          validation: { isRequired: false },
        }),
        size: fields.select({
          label: 'Size',
          options: [
            { label: 'Square', value: 'square' },
            { label: 'Wide', value: 'wide' },
          ],
          defaultValue: 'square',
        }),
        order: fields.integer({
          label: 'Position in the gallery',
          description: 'Lower numbers come first.',
          validation: { isRequired: true, min: 1 },
        }),
      },
    }),

    carePlans: collection({
      label: 'Care plans',
      path: 'src/content/care-plans/*',
      slugField: 'name',
      format: { data: 'yaml' },
      columns: ['name', 'order'],
      schema: {
        name: fields.slug({ name: { label: 'Plan name' } }),
        kind: fields.select({
          label: 'Kind',
          options: [
            { label: 'Visit', value: 'Visit' },
            { label: 'Contract', value: 'Contract' },
          ],
          defaultValue: 'Visit',
        }),
        description: fields.text({
          label: 'One line about the plan',
          multiline: true,
          validation: { isRequired: true },
        }),
        features: fields.array(fields.text({ label: 'Item' }), {
          label: "What's included",
          itemLabel: (props) => props.value,
        }),
        price: fields.text({
          label: 'Price',
          description:
            'Optional. Something like "from ₦40,000 per visit". Leave empty to keep it on enquiry.',
          validation: { isRequired: false },
        }),
        order: fields.integer({
          label: 'Position',
          validation: { isRequired: true, min: 1 },
        }),
      },
    }),
  },
});
