import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;

/**
 * The ordering rules from §7.1 and §7.2 live here, with the invariants they
 * depend on checked at build time.
 *
 * §12.4 [LOCKED] lists "the fixed card order on Work" and the five-item home
 * index among the things an editor must never be one click away from breaking.
 * A CMS config can only ask nicely; these throw.
 */

const byOrder = (key: 'workOrder' | 'homeOrder') => (a: Project, b: Project) =>
  (a.data[key] ?? 0) - (b.data[key] ?? 0);

export async function allProjects(): Promise<Project[]> {
  return getCollection('projects');
}

/** §7.1 — the index shows exactly five projects. */
export async function homeIndex(): Promise<Project[]> {
  const list = (await allProjects())
    .filter((p) => p.data.homeOrder !== null)
    .sort(byOrder('homeOrder'));

  if (list.length !== 5) {
    throw new Error(
      `Home index must show exactly five projects (§7.1). Found ${list.length}: ` +
        `${list.map((p) => p.id).join(', ')}. Adjust homeOrder in the content files.`,
    );
  }
  const heat = list.filter((p) => p.data.carriesHeat);
  if (heat.length !== 1) {
    throw new Error(
      `Exactly one home index row must carry --heat (§4.1). Found ${heat.length}.`,
    );
  }
  return list;
}

/** §7.2 — card order is fixed. */
export async function workGrid(): Promise<Project[]> {
  const list = (await allProjects())
    .filter((p) => p.data.workOrder !== null)
    .sort(byOrder('workOrder'));

  const orders = list.map((p) => p.data.workOrder);
  if (new Set(orders).size !== orders.length) {
    throw new Error(`Duplicate workOrder values in the Work grid (§7.2): ${orders.join(', ')}`);
  }
  const heat = list.filter((p) => p.data.carriesHeat);
  if (heat.length !== 1) {
    throw new Error(
      `Exactly one Work card must carry --heat (§4.1). Found ${heat.length}.`,
    );
  }
  return list;
}

/** The before/after hero at the top of Work. At most one project. */
export async function featuredReveal(): Promise<Project | undefined> {
  const list = (await allProjects()).filter((p) => p.data.isFeaturedReveal);
  if (list.length > 1) {
    throw new Error(
      `Only one project may be the featured reveal on Work. Found: ${list.map((p) => p.id).join(', ')}`,
    );
  }
  const reveal = list[0];
  // §7.3 — "Projects without a matched before/after pair omit section 4
  // entirely." The same holds for the Work reveal: it is the site's proof
  // mechanism and cannot run on one frame.
  if (reveal && (!reveal.data.hasBeforeAfter || !reveal.data.before || !reveal.data.after)) {
    throw new Error(
      `"${reveal.id}" is the featured reveal on Work but has no matched ` +
        `before/after pair. Either tick "matched before/after pair" on it, or ` +
        `move the reveal to a project that has one.`,
    );
  }
  return reveal;
}

/** Projects that get their own generated page. */
export async function linkableProjects(): Promise<Project[]> {
  return (await allProjects()).filter((p) => p.data.linkable);
}

/**
 * Where a project card or index row points.
 *
 * null means the element must be rendered as <article>, never <a> — §3.3:
 * "a card that links nowhere must not present itself as clickable".
 */
export function linkFor(project: Project): string | null {
  if (project.data.neverLink) return null;
  if (project.data.linkable) return `/work/${project.id}/`;
  // Awaiting page content (§16 decision 8) — point at its card on Work.
  return `/work/#${project.id}`;
}
