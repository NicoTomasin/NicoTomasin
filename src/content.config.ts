import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    category: z.string(),
    tags: z.array(z.string()).optional().default([]),
    author: z.string().optional().default('Nico Tomasin'),
    draft: z.boolean().optional().default(false),
    /** Título y descripción solo para buscadores (opcionales; si faltan se usan title y description) */
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
};
