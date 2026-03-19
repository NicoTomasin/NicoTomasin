import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const blogEntries = await getCollection('blog', ({ data }) => !data.draft);

  const sortedPosts = blogEntries.sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );

  return rss({
    title: 'Nico Tomasin - Blog',
    description:
      'Artículos sobre desarrollo web, DevOps, seguridad y reflexiones sobre programación.',
    site: context.site || 'https://nicotomasin.com.ar',
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/blog/${post.id}/`,
    })),
    customData: `<language>es-ar</language>`,
  });
}
