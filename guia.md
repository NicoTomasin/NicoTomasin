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

### Categorías Disponibles

- `Seguridad`
- `DevOps / Infraestructura`
- `Desarrollo Web`
- `Opinión / Reflexiones`

## Imagen OG Automática

**No es necesario agregar `coverImage`.** 

Cada post genera automáticamente una imagen OG (1200x630px) en el build con:
- Logo "NT" + "Blog"
- Badge de categoría
- Título del post
- Descripción truncada
- URL del sitio

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
