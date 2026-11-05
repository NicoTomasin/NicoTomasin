# Guía de Posts del Blog

Este archivo explica cómo crear y configurar posts para el blog de Nico Tomasin.

## Ubicación

Los posts se encuentran en: `src/content/blog/`

## Formato

Cada post es un archivo `.md` (Markdown) con el siguiente formato:

```markdown
---
title: "Título del post"
description: "Descripción corta del post (150-160 caracteres recomendado para SEO)"
date: 2024-01-15
category: "Categoría"
tags: ["tag1", "tag2", "tag3"]
author: "Nico Tomasin"
draft: false
---

Contenido del post en Markdown...
```

## Campos del Frontmatter

### Campos Obligatorios

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `title` | string | Título del post. Se usa en el `<h1>`, meta tags y OG image. |
| `description` | string | Descripción corta (150-160 caracteres). Se usa en meta description, OG description y preview de la card. |
| `date` | date | Fecha de publicación. Formato: `YYYY-MM-DD`. Se muestra en la card y en el post. |
| `category` | string | Categoría del post. Ver categorías disponibles abajo. |

### Campos Opcionales

| Campo | Tipo | Default | Descripción |
|-------|------|---------|-------------|
| `tags` | string[] | `[]` | Array de tags relacionados con el post. Útil para SEO y organización. |
| `author` | string | `"Nico Tomasin"` | Autor del post. Se usa en JSON-LD Schema. |
| `draft` | boolean | `false` | Si es `true`, el post no se incluye en el build. |
| `seoTitle` | string | — | Título solo para buscadores (ideal ≤ 60 caracteres). Si falta se usa `title`. El sufijo " \| Nico Tomasin" solo se agrega si el total entra en 65. |
| `seoDescription` | string | — | Meta description solo para buscadores (ideal 140-160 caracteres). Si falta se usa `description`. |

### Categorías Disponibles

- `Proyectos` (la mayoría: cómo armé cada build)
- `Build in Public`
- `Emprendimiento`

## Imagen OG Automática

**No es necesario agregar `coverImage`.** 

Cada post genera automáticamente una imagen OG (1200x630px) en el build (`src/integrations/og-images.ts` + `src/lib/og-image.ts`) con:
- El agujero negro del hero de fondo (`src/assets/og/blackhole.jpg`)
- Logo "NT" + "Blog · Build in public"
- Badge de categoría
- Título del post en Syne y descripción recortada en límite de palabra
- Fecha y tiempo de lectura

El mismo build regenera también `og.png` (landing ES), `og-en.png` (landing EN), `og/blog.png` (índice del blog) y `apple-touch-icon.png`.

La imagen se usa en:
- Cards del listado `/blog`
- Meta tags OG (Facebook, LinkedIn)
- Meta tags Twitter Card
- JSON-LD Schema

## Ejemplo Completo

```markdown
---
title: "Cómo configurar DNS en Cloudflare"
description: "Guía paso a paso para configurar los registros DNS de tu dominio usando Cloudflare y mejorar la seguridad y rendimiento."
date: 2024-03-15
category: "DevOps / Infraestructura"
tags: ["dns", "cloudflare", "dominios", "seguridad"]
author: "Nico Tomasin"
draft: false
---

## Introducción

Explicación de qué es Cloudflare y por qué usarlo...

## Pasos

1. Crear cuenta en Cloudflare
2. Agregar tu dominio
3. Configurar los nameservers
...
```

## Tips de SEO

### Título
- Entre 50-60 caracteres
- Incluir palabras clave relevantes
- Hacerlo atractivo para clicks

### Descripción
- Entre 150-160 caracteres
- Incluir palabras clave naturalmente
- Terminar con un llamado a la acción

### Tags
- Usar 3-5 tags relevantes
- Ser consistente con la nomenclatura
- Incluir variaciones de palabras clave

### Contenido
- Usar headings jerárquicos (h2, h3, h4)
- Incluir imágenes con alt descriptivo
- Enlaces internos a otros posts
- Enlaces externos a fuentes confiables

### Para buscadores y asistentes de IA (SEO / AEO / GEO)
Todo se genera solo en el build, sin tocar nada:
- **JSON-LD** (`src/lib/schema.ts`): `Person` + `WebSite` + `ProfilePage` + lista de builds en la landing, `Blog` en el índice y `BlogPosting` + `BreadcrumbList` en cada post. Si el post está en el Builder log, se vincula con `about`.
- **`/llms.txt`**: resumen en Markdown para asistentes de IA (quién soy, experiencia, builds, posts y contacto), armado desde `portfolio.json` y los posts.
- **`/robots.txt`**: permite buscadores y crawlers de IA (GPTBot, ClaudeBot, PerplexityBot, Google-Extended…).
- **Sitemap** con `lastmod` = fecha del post y hreflang ES/EN para la landing.
- **RSS** con categorías, tags e imagen de cada post.

Al cambiar de trabajo, rol o proyectos, actualizá `src/data/portfolio.json` (y `metadata.lastUpdate`): landing, JSON-LD y `llms.txt` salen de ahí. El texto de la OG de la landing está en `src/integrations/og-images.ts`.

## Comandos Útiles

```bash
# Build del sitio (genera posts + OG images)
bun run build

# Preview del build
bun run preview

# Desarrollo local
bun run dev
```

## Archivos Generados

Al hacer build, se generan:

```
dist/
  blog/
    {slug}/
      index.html          # Página del post
    index.html            # Listado de posts
    rss.xml               # Feed RSS
    search-index.json     # Índice de búsqueda
  og/
    blog/
      {slug}.png          # OG image del post
  sitemap-index.xml       # Sitemap para SEO
```
