import settings from '../content/settings/site.json';

/**
 * §12.9 / §10.5 — contact details live in exactly one file.
 *
 * The spec records the WhatsApp number as duplicated across five locations and
 * calls that "the most likely launch error". In the static build it was fixed
 * with a runtime fetch; here it is a typed import resolved at build time, so
 * the value is baked into the HTML with no request, no JavaScript dependency
 * and no file:// failure mode. Change site.json, rebuild, done.
 */
export interface SiteSettings {
  /** International format, digits only — this is what wa.me expects. */
  whatsapp: string;
  whatsappDisplay: string;
  email: string;
  instagram: string;
  domain: string;
  officeLine1: string;
  officeLine2: string;
  hours: string;
  serviceArea: string;
}

export const site: SiteSettings = settings;

/** §6.2 — every page terminates in a WhatsApp route. */
export function waLink(message: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const instagramUrl = `https://instagram.com/${site.instagram}`;
export const mailto = `mailto:${site.email}`;

/** Placeholders that must be replaced before launch (§10.5, decisions 3 & 4). */
export const usingPlaceholderContact =
  site.whatsapp === '2340000000000' || site.email === 'hello@kpomey.com';
