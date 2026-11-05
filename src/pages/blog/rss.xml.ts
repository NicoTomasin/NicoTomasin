import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const site = context.site?.toString() ?? 'https://nicotomasin.com.ar/';
  const blogEntries = await getCollection('blog', ({ data }) => !data.draft);
  const sortedPosts = blogEntries.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: 'Nico Tomasin — Blog',
    description:
      'Build in public: cómo construyo cada proyecto. Bots en Rust, hardware con ESP32, productos web, IA local y herramientas para el trabajo.',
    site,
    xmlns: { atom: 'http://www.w3.org/2005/Atom' },
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/blog/${post.id}/`,
      categories: [post.data.category, ...post.data.tags],
      author: 'hola@nicotomasin.com.ar (Nico Tomasin)',
      enclosure: {
        url: new URL(`/og/blog/${post.id}.png`, site).toString(),
        type: 'image/png',
        length: 0,
      },
    })),
    customData: [
      '<language>es-ar</language>',
      `<atom:link href="${new URL('/blog/rss.xml', site)}" rel="self" type="application/rss+xml" />`,
      `<image><url>${new URL('/og/blog.png', site)}</url><title>Nico Tomasin — Blog</title><link>${new URL('/blog/', site)}</link></image>`,
    ].join(''),
  });
}
