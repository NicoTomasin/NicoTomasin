// Datos estructurados (schema.org) del sitio. Todo se conecta por @id para que
// buscadores y motores de IA entiendan quién es Nico, dónde trabaja y qué construyó.
import portfolioData from '../data/portfolio.json';
import type { Build } from './builds';
import type { Lang } from '../i18n/ui';

export const SITE = 'https://nicotomasin.com.ar';
export const PERSON_ID = `${SITE}/#person`;
export const WEBSITE_ID = `${SITE}/#website`;
export const BLOG_ID = `${SITE}/blog/#blog`;

const abs = (path: string) => new URL(path, SITE).toString();
const inLanguage = (lang: Lang) => (lang === 'en' ? 'en' : 'es-AR');

export function personSchema(lang: Lang = 'es') {
  const { footer, stack, about } = portfolioData;
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: 'Nico Tomasin',
    givenName: 'Nico',
    familyName: 'Tomasin',
    alternateName: 'NicoTomasin',
    url: SITE,
    image: abs('/og.png'),
    email: `mailto:${portfolioData.contact.email}`,
    jobTitle: 'Product Manager',
    description:
      lang === 'en'
        ? 'Product Manager at G2M Technology Group and builder from Buenos Aires. Builds Rust bots, ESP32 hardware, web products and AI tools in public.'
        : 'Product Manager en G2M Technology Group y builder de Buenos Aires. Construye bots en Rust, hardware con ESP32, productos web y herramientas con IA, en público.',
    worksFor: { '@type': 'Organization', name: 'G2M Technology Group' },
    homeLocation: {
      '@type': 'Place',
      address: { '@type': 'PostalAddress', addressLocality: 'Buenos Aires', addressCountry: 'AR' },
    },
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Universidad Nacional de La Matanza' },
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Product Manager',
      occupationLocation: { '@type': 'City', name: 'Buenos Aires' },
      skills: 'Product management, full stack development, Rust, TypeScript, Astro, IoT',
    },
    knowsLanguage: ['es', 'en'],
    knowsAbout: [
      ...stack.flatMap((group) => group.items),
      'Product management',
      'Build in public',
      'Inteligencia artificial',
      ...about.facts.map((fact) => fact.es),
    ].filter((v, i, all) => all.indexOf(v) === i),
    sameAs: footer.socials.filter((s) => s.url.startsWith('http')).map((s) => s.url),
  };
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE,
    name: 'Nico Tomasin',
    description: 'Portfolio y blog de Nico Tomasin: builder y Product Manager en G2M.',
    inLanguage: ['es-AR', 'en'],
    publisher: { '@id': PERSON_ID },
    author: { '@id': PERSON_ID },
  };
}

function buildSchema(build: Build, lang: Lang) {
  const url = build.post ? abs(`/blog/${build.post}/`) : build.link ?? build.repo ?? abs(`/#build-${build.slug}`);
  return {
    '@type': build.repo ? 'SoftwareSourceCode' : 'CreativeWork',
    name: build.title,
    description: build.description[lang],
    url,
    ...(build.link ? { sameAs: build.link } : {}),
    ...(build.repo ? { codeRepository: build.repo } : {}),
    dateCreated: String(build.year),
    keywords: build.tech.join(', '),
    creator: { '@id': PERSON_ID },
  };
}

/** Landing: ProfilePage con la persona y la lista de builds */
export function landingSchema(lang: Lang, builds: Build[]) {
  const pageUrl = abs(lang === 'en' ? '/en/' : '/');
  return {
    '@context': 'https://schema.org',
    '@graph': [
      personSchema(lang),
      websiteSchema(),
      {
        '@type': 'ProfilePage',
        '@id': `${pageUrl}#page`,
        url: pageUrl,
        name: lang === 'en' ? 'Nico Tomasin — Builder & Product Manager' : 'Nico Tomasin — Builder y Product Manager',
        inLanguage: inLanguage(lang),
        isPartOf: { '@id': WEBSITE_ID },
        mainEntity: { '@id': PERSON_ID },
        dateModified: portfolioData.metadata.lastUpdate,
        primaryImageOfPage: abs(lang === 'en' ? '/og-en.png' : '/og.png'),
      },
      {
        '@type': 'ItemList',
        '@id': `${pageUrl}#builds`,
        name: lang === 'en' ? 'Builder log: everything Nico built' : 'Builder log: todo lo que construyó Nico',
        numberOfItems: builds.length,
        itemListElement: builds.map((build, i) => ({ '@type': 'ListItem', position: i + 1, item: buildSchema(build, lang) })),
      },
    ],
  };
}

export interface PostSummary {
  slug: string;
  title: string;
  description: string;
  date: Date;
  category: string;
  tags?: string[];
}

/** Índice del blog */
export function blogSchema(posts: PostSummary[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      personSchema('es'),
      websiteSchema(),
      {
        '@type': 'Blog',
        '@id': BLOG_ID,
        url: abs('/blog/'),
        name: 'Nico Tomasin — Blog',
        description: 'Cómo construye Nico Tomasin cada proyecto: decisiones, arquitectura, errores y aprendizajes. Build in public.',
        inLanguage: 'es-AR',
        isPartOf: { '@id': WEBSITE_ID },
        author: { '@id': PERSON_ID },
        publisher: { '@id': PERSON_ID },
        image: abs('/og/blog.png'),
        blogPost: posts.map((post) => ({
          '@type': 'BlogPosting',
          '@id': abs(`/blog/${post.slug}/#article`),
          headline: post.title,
          description: post.description,
          url: abs(`/blog/${post.slug}/`),
          datePublished: post.date.toISOString(),
          image: abs(`/og/blog/${post.slug}.png`),
          author: { '@id': PERSON_ID },
        })),
      },
    ],
  };
}

/** Un post */
export function postSchema(post: PostSummary & { wordCount: number; build?: Build }) {
  const url = abs(`/blog/${post.slug}/`);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      personSchema('es'),
      {
        '@type': 'BlogPosting',
        '@id': `${url}#article`,
        headline: post.title,
        description: post.description,
        url,
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        image: { '@type': 'ImageObject', url: abs(`/og/blog/${post.slug}.png`), width: 1200, height: 630 },
        datePublished: post.date.toISOString(),
        dateModified: post.date.toISOString(),
        inLanguage: 'es-AR',
        articleSection: post.category,
        keywords: post.tags?.join(', '),
        wordCount: post.wordCount,
        author: { '@id': PERSON_ID },
        publisher: { '@id': PERSON_ID },
        isPartOf: { '@id': BLOG_ID },
        ...(post.build ? { about: buildSchema(post.build, 'es') } : {}),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: abs('/') },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: abs('/blog/') },
          { '@type': 'ListItem', position: 3, name: post.title, item: url },
        ],
      },
    ],
  };
}
