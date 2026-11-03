---
title: "Hankook Argentina: un tema de WordPress a medida para una marca global"
description: "Cómo desarrollé el sitio de Hankook Argentina con un tema de WordPress propio: buscador de neumáticos por medida, mapa de distribuidores, secciones modulares y foco en performance."
date: 2026-11-03
category: "Proyectos"
tags: ["wordpress", "php", "woocommerce", "leaflet", "performance"]
author: "Nico Tomasin"
draft: false
---

## TL;DR

Desarrollé el sitio de **[Hankook Argentina](https://hankook.com.ar/)**, la marca coreana de neumáticos, con un **tema de WordPress hecho desde cero**: sin page builders, con secciones reutilizables, un buscador de neumáticos por medida, un mapa interactivo de distribuidores y formularios conectados al panel de administración.

![Home de Hankook Argentina con el buscador de neumáticos por medida](/blog/hankook/home.webp)

---

## El desafío: una marca grande, un equipo que necesita autonomía

Una marca internacional tiene requisitos claros:

- respetar a rajatabla la **identidad visual** global (tipografía propia, colores, tono);
- mostrar un catálogo grande de productos con fichas técnicas;
- ayudar al usuario a encontrar **qué neumático le sirve** y **dónde comprarlo**;
- que el equipo de marketing pueda **actualizar contenido** sin depender de un desarrollador.

WordPress cubría el último punto. Para los demás, decidí no usar un tema comprado ni un page builder, y hacer un **tema propio**.

---

## Cómo está armado

### Secciones modulares

Cada bloque de la página es una **pieza reutilizable** (`parts/`): hero, bento de destacados, marcas, consejos, "por qué Hankook", newsletter, redes, etc. Las páginas se arman combinándolas. Eso da:

- consistencia visual en todo el sitio;
- menos código duplicado;
- facilidad para crear páginas nuevas.

### Buscador de neumáticos por medida

El usuario elige **ancho, alto y rodado** (los tres números que figuran en el costado de la cubierta) y obtiene los modelos compatibles. Es la forma en que la gente realmente busca un neumático, mucho más útil que navegar categorías.

### Mapa de distribuidores

Con **Leaflet** armé un mapa interactivo para encontrar distribuidores por provincia y localidad. Los distribuidores se administran desde un **panel propio dentro del admin de WordPress**, con alta, edición y baja, y el mapa los consume vía AJAX.

### Formularios integrados al admin

La suscripción al newsletter y el formulario para sumarse a la red de la marca se guardan en WordPress y se gestionan desde menús propios del panel, sin plugins de terceros.

> [!tip] Menos plugins, menos problemas
> Cada funcionalidad hecha a medida fue una dependencia menos que actualizar, auditar o que se rompa con una nueva versión de WordPress.

---

## Performance

Un sitio de marca lleno de fotos de producto puede volverse lentísimo. Algunas decisiones:

- imágenes en **AVIF**, el formato más liviano disponible;
- **videos** livianos en WebM en lugar de GIFs pesados;
- la **tipografía oficial** de la marca cargada de forma local;
- scripts cargados solo en las páginas que los necesitan.

---

## Stack

| Parte | Tecnología |
| --- | --- |
| CMS | WordPress con tema propio en PHP |
| E-commerce | WooCommerce para el catálogo |
| Mapa | Leaflet |
| Interactividad | JavaScript vanilla y AJAX de WordPress |
| Assets | AVIF, WebM y tipografía corporativa |

---

## Lo que aprendí

- **WordPress sigue siendo una gran opción** cuando el cliente necesita autonomía para editar, siempre que el tema esté bien hecho.
- **Diseñar pensando en cómo busca el usuario** (por medida, por ubicación) vale más que cualquier animación.
- **Las marcas globales tienen reglas,** y trabajar dentro de ellas es parte del oficio.

El sitio está online en [hankook.com.ar](https://hankook.com.ar/).
