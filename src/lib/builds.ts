import { getCollection } from 'astro:content';
import portfolioData from '../data/portfolio.json';

type RawBuild = (typeof portfolioData.builds)[number];

export type Build = Omit<RawBuild, 'post'> & {
  link?: string;
  repo?: string;
  featured?: boolean;
  /** Slug del post solo si está publicado (los drafts no se linkean) */
  post?: string;
  /** Destino principal: post > web > repo */
  href?: string;
  external: boolean;
};

let cache: Build[] | undefined;

export async function getBuilds(): Promise<Build[]> {
  if (cache) return cache;
  const published = new Set((await getCollection('blog', ({ data }) => !data.draft)).map((entry) => entry.id));
  cache = (portfolioData.builds as (RawBuild & Partial<Build>)[]).map((raw) => {
    const post = raw.post && published.has(raw.post) ? raw.post : undefined;
    const href = post ? `/blog/${post}` : raw.link ?? raw.repo;
    return { ...raw, post, href, external: !post && Boolean(href) } as Build;
  });
  return cache;
}

/** Build asociado a un post (para linkear desde el blog al Builder log) */
export async function getBuildForPost(slug: string) {
  return (await getBuilds()).find((build) => build.post === slug);
}
