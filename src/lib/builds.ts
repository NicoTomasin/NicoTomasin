import { getCollection } from 'astro:content';
import portfolioData from '../data/portfolio.json';
import { getPostCover, type PostCover } from './post-cover';

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
  /** Portada del post (captura o variante generativa) */
  cover?: PostCover;
};

let cache: Build[] | undefined;

export async function getBuilds(): Promise<Build[]> {
  if (cache) return cache;
  const entries = new Map((await getCollection('blog', ({ data }) => !data.draft)).map((entry) => [entry.id, entry]));
  cache = (portfolioData.builds as (RawBuild & Partial<Build>)[]).map((raw) => {
    const entry = raw.post ? entries.get(raw.post) : undefined;
    const post = entry?.id;
    const href = post ? `/blog/${post}` : raw.link ?? raw.repo;
    const cover = entry
      ? getPostCover({ slug: entry.id, body: entry.body, tags: entry.data.tags, category: entry.data.category })
      : undefined;
    return { ...raw, post, href, cover, external: !post && Boolean(href) } as Build;
  });
  return cache;
}

/** Build asociado a un post (para linkear desde el blog al Builder log) */
export async function getBuildForPost(slug: string) {
  return (await getBuilds()).find((build) => build.post === slug);
}
