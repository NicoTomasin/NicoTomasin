// Portada de un post, compartida entre las cards del sitio y la OG image.
// - Si el post tiene una captura propia, se usa esa (es lo más informativo y varía entre posts).
// - Si no, una variante del agujero negro del hero (forma × paleta), fija por slug, con el tag como texto.
// Así las cards no repiten el título que ya está debajo y no todas se ven iguales.

/** Formas del agujero negro (frames del shader) */
export const COVER_SHAPES = 6;
/** Paletas: 0 original, 1 esmeralda, 2 plata (ver public/covers) */
export const COVER_PALETTES = 3;

function hash(slug: string) {
  let h = 7;
  for (const ch of slug) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return h;
}

/** Forma y paleta fijas por slug → clave del archivo `bh-<forma>-<paleta>.jpg` */
export function coverVariant(slug: string) {
  const h = hash(slug);
  return { shape: h % COVER_SHAPES, palette: Math.floor(h / COVER_SHAPES) % COVER_PALETTES };
}

export const coverKey = (slug: string) => {
  const { shape, palette } = coverVariant(slug);
  return `${shape}-${palette}`;
};

export const coverBackground = (slug: string) => `/covers/bh-${coverKey(slug)}.jpg`;

/** Primera imagen local del post (`![...](/blog/...)`) */
export function firstImage(body: string | undefined) {
  return body?.match(/!\[[^\]]*\]\((\/blog\/[^)\s]+\.(?:webp|png|jpe?g))\)/)?.[1];
}

export interface PostCover {
  /** Captura propia del post, si tiene */
  screenshot?: string;
  /** Fondo generativo (siempre disponible) */
  background: string;
  /** Texto de la portada generativa */
  topic: string;
  /** Posición del agujero negro dentro de la portada, varía por post */
  focus: string;
}

export function getPostCover(post: { slug: string; body?: string; tags?: string[]; category: string }): PostCover {
  const { shape } = coverVariant(post.slug);
  const focus = ['30% 50%', '70% 45%', '50% 40%', '40% 60%', '60% 55%', '50% 50%'][shape];
  return {
    screenshot: firstImage(post.body),
    background: coverBackground(post.slug),
    // El primer tag corto (los largos no entran en la portada); si no hay, la categoría
    topic: post.tags?.find((tag) => tag.length <= 14) ?? post.category,
    focus,
  };
}
