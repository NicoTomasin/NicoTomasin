// /llms.txt: resumen en Markdown para asistentes de IA (https://llmstxt.org).
// Se genera desde los mismos datos que la landing, así nunca queda desactualizado.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import portfolioData from '../data/portfolio.json';
import { getBuilds } from '../lib/builds';

const SITE = 'https://nicotomasin.com.ar';

export const GET: APIRoute = async () => {
  const { now, experience, about, stack, contact, footer, categories } = portfolioData;
  const builds = await getBuilds();
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );

  const lines: string[] = [
    '# Nico Tomasin',
    '',
    '> Builder y Product Manager en G2M Technology Group (Buenos Aires, Argentina). Construye lo que le da curiosidad —bots en Rust, hardware con ESP32, productos web, herramientas con IA— y lo cuenta en público en su blog.',
    '',
    'Sitio en español (principal) e inglés (/en/). El blog está en español.',
    '',
    '## Quién es',
    '',
    ...about.paragraphs.es.flatMap((p) => [p, '']),
    '## Ahora',
    '',
    ...now.items.map((item) => `- **${item.label.es}:** ${item.text.es}`),
    `- Última actualización: ${now.updated}`,
    '',
    '## Experiencia',
    '',
    ...experience.flatMap((job) =>
      job.roles.map((role) => `- **${role.role.es}** en ${job.company} (${role.period.es}): ${role.description.es}`)
    ),
    '- Formación: Tec. en Desarrollo Web, Universidad Nacional de La Matanza (2020–2024). Próximo: Licenciatura en Informática.',
    '',
    '## Builds',
    '',
    ...builds.map((b) => {
      const links = [
        b.post && `[post](${SITE}/blog/${b.post}/)`,
        b.link && `[sitio](${b.link})`,
        b.repo && `[código](${b.repo})`,
      ].filter(Boolean);
      const category = categories[b.category as keyof typeof categories].es;
      return `- **${b.title}** (${b.year}, ${category}, ${b.tech.join(', ')}): ${b.description.es}${links.length ? ` — ${links.join(' · ')}` : ''}`;
    }),
    '',
    '## Blog',
    '',
    ...posts.map((p) => `- [${p.data.title}](${SITE}/blog/${p.id}/): ${p.data.description}`),
    '',
    '## Stack',
    '',
    ...stack.map((group) => `- **${group.group.es}:** ${group.items.join(', ')}`),
    '',
    '## Contacto',
    '',
    `- Email: ${contact.email} (ideas, colaboraciones y proyectos; para equipos o empresas, vía Pipi Labs)`,
    ...footer.socials.filter((s) => s.url.startsWith('http')).map((s) => `- ${s.name}: ${s.url}`),
    `- RSS: ${SITE}/blog/rss.xml`,
    '',
    '## Optional',
    '',
    `- [Landing en inglés](${SITE}/en/)`,
    `- [Sitemap](${SITE}/sitemap-index.xml)`,
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
