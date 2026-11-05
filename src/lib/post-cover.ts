// Portada de un post, compartida entre las cards del sitio y la OG image.
// - Si el post tiene una captura propia, se usa esa (es lo más informativo y varía entre posts).
// - Si no, una de las variantes del agujero negro del hero, fija por slug, con el tag como texto.
// Así las cards no repiten el título que ya está debajo y no todas se ven iguales.

export const COVER_VARIANTS = 6;

/** Hash estable del slug → índice de variante */
export function coverVariant(slug: string) {
  let hash = 7;
  for (const ch of slug) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return hash % COVER_VARIANTS;
}

export const coverBackground = (slug: string) => `/covers/bh-${coverVariant(slug)}.jpg`;

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
  const variant = coverVariant(post.slug);
  const focus = ['30% 50%', '70% 45%', '50% 40%', '40% 60%', '60% 55%', '50% 50%'][variant];
  return {
    screenshot: firstImage(post.body),
    background: coverBackground(post.slug),
    // El primer tag corto (los largos no entran en la portada); si no hay, la categoría
    topic: post.tags?.find((tag) => tag.length <= 14) ?? post.category,
    focus,
  };
}
