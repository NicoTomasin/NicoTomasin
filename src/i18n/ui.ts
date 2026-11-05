export const languages = { es: 'Español', en: 'English' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'es';

export type Localized<T = string> = { es: T; en: T };

/** Devuelve el valor en el idioma pedido; acepta strings planos (no localizados). */
export function l<T>(value: Localized<T> | T, lang: Lang): T {
  if (value && typeof value === 'object' && 'es' in (value as object) && 'en' in (value as object)) {
    return (value as Localized<T>)[lang];
  }
  return value as T;
}

export function getLangFromUrl(url: URL): Lang {
  const [, first] = url.pathname.split('/');
  return first === 'en' ? 'en' : 'es';
}

/** Ruta de la landing en cada idioma (el blog solo existe en español). */
export const homePath = (lang: Lang) => (lang === 'en' ? '/en/' : '/');

const ui = {
  es: {
    'meta.title': 'Nico Tomasin | Builder · Product Manager en G2M',
    'meta.description':
      'Nico Tomasin: Product Manager en G2M y builder. Construyo lo que me da curiosidad: bots en Rust, hardware con ESP32, productos web y herramientas con IA.',
    'nav.now': 'Ahora',
    'nav.builds': 'Builds',
    'nav.path': 'Trayectoria',
    'nav.about': 'Sobre mí',
    'nav.contact': 'Contacto',
    'nav.blog': 'Blog',
    'nav.menu': 'Abrir menú',
    'nav.switch': 'Read in English',
    'hero.cta': 'Ver lo que construí',
    'hero.blog': 'Leer el blog',
    'hero.scroll': 'Scroll',
    'marquee.top': ['Builder', 'Product', 'Build in public', 'Curioso'],
    'marquee.bottom': ['Rust', 'TypeScript', 'Astro', 'ESP32', 'Bun', 'Ollama', 'PostgreSQL'],
    'now.label': 'Ahora',
    'now.title': 'En el taller',
    'now.updated': 'Actualizado',
    'now.latest': 'Último post',
    'featured.label': 'Builds destacados',
    'featured.title': 'Cosas que construí',
    'featured.visit': 'Visitar',
    'featured.read': 'Leer',
    'log.label': 'Builder log',
    'log.title': 'Todo lo que armé',
    'log.intro':
      'Productos propios, bots, hardware, juegos para amigos y herramientas para el trabajo. Si me dio curiosidad, probablemente lo construí.',
    'log.all': 'Todos',
    'log.filter': 'Filtrar por categoría',
    'log.post': 'Post',
    'log.visit': 'Web',
    'log.repo': 'Código',
    'log.count': 'builds',
    'log.more': 'Ver los {n} restantes',
    'status.live': 'En vivo',
    'status.privado': 'Privado',
    'status.open-source': 'Open source',
    'status.archivado': 'Archivado',
    'path.label': 'Trayectoria',
    'path.title': 'Dónde trabajo y trabajé',
    'about.label': 'Sobre mí',
    'about.title': 'Curioso, siempre en movimiento',
    'about.cube': 'Cubo: tocá para mezclar',
    'about.cubeSolve': 'Resolver',
    'stack.label': 'Stack',
    'stack.title': 'Con qué construyo',
    'blog.label': 'Blog',
    'blog.title': 'Lo último que escribí',
    'blog.all': 'Ver todos los posts',
    'blog.lang': '',
    'contact.label': 'Contacto',
    'contact.line1': '¿Construimos',
    'contact.line2': 'algo juntos?',
    'contact.orb': 'Hablemos',
    'contact.cursor': 'Escribime',
    'contact.direct': 'Para ideas, colaboraciones o proyectos, escribime directo.',
    'contact.teams': '¿Sos un equipo o empresa?',
    'contact.teamsCta': 'Trabajemos vía Pipi Labs',
    'contact.follow': 'Seguime mientras construyo',
    'footer.tagline': 'Builder · Product Manager',
    'footer.rights': 'Hecho a mano en Buenos Aires.',
  },
  en: {
    'meta.title': 'Nico Tomasin | Builder · Product Manager at G2M',
    'meta.description':
      'Nico Tomasin: Product Manager at G2M and builder. I build whatever makes me curious: Rust bots, ESP32 hardware, web products and AI tools.',
    'nav.now': 'Now',
    'nav.builds': 'Builds',
    'nav.path': 'Path',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.blog': 'Blog (ES)',
    'nav.menu': 'Open menu',
    'nav.switch': 'Leer en español',
    'hero.cta': 'See what I built',
    'hero.blog': 'Read the blog (ES)',
    'hero.scroll': 'Scroll',
    'marquee.top': ['Builder', 'Product', 'Build in public', 'Curious'],
    'marquee.bottom': ['Rust', 'TypeScript', 'Astro', 'ESP32', 'Bun', 'Ollama', 'PostgreSQL'],
    'now.label': 'Now',
    'now.title': 'In the workshop',
    'now.updated': 'Updated',
    'now.latest': 'Latest post',
    'featured.label': 'Featured builds',
    'featured.title': 'Things I built',
    'featured.visit': 'Visit',
    'featured.read': 'Read',
    'log.label': 'Builder log',
    'log.title': 'Everything I made',
    'log.intro':
      'My own products, bots, hardware, games for friends and tools for work. If it made me curious, I probably built it.',
    'log.all': 'All',
    'log.filter': 'Filter by category',
    'log.post': 'Post',
    'log.visit': 'Site',
    'log.repo': 'Code',
    'log.count': 'builds',
    'log.more': 'Show the other {n}',
    'status.live': 'Live',
    'status.privado': 'Private',
    'status.open-source': 'Open source',
    'status.archivado': 'Archived',
    'path.label': 'Path',
    'path.title': 'Where I work and worked',
    'about.label': 'About',
    'about.title': 'Curious, always moving',
    'about.cube': 'Cube: tap to scramble',
    'about.cubeSolve': 'Solve',
    'stack.label': 'Stack',
    'stack.title': 'What I build with',
    'blog.label': 'Blog',
    'blog.title': 'Latest writing',
    'blog.all': 'All posts',
    'blog.lang': 'Posts are in Spanish.',
    'contact.label': 'Contact',
    'contact.line1': 'Shall we build',
    'contact.line2': 'something?',
    'contact.orb': "Let's talk",
    'contact.cursor': 'Write me',
    'contact.direct': 'For ideas, collaborations or projects, write to me directly.',
    'contact.teams': 'Are you a team or company?',
    'contact.teamsCta': "Let's work via Pipi Labs",
    'contact.follow': 'Follow along while I build',
    'footer.tagline': 'Builder · Product Manager',
    'footer.rights': 'Handmade in Buenos Aires.',
  },
} as const;

type Keys = keyof (typeof ui)['es'];

export function useTranslations(lang: Lang) {
  return function t<K extends Keys>(key: K): (typeof ui)['es'][K] {
    return (ui[lang][key] ?? ui.es[key]) as (typeof ui)['es'][K];
  };
}
