---
title: "Mi Vidriera: cómo construí un SaaS multi-tenant para emprendedores con Astro"
description: "Una plataforma para que pequeños negocios muestren sus productos en un link y reciban consultas por WhatsApp. Multi-tenant, dominios propios y seguridad desde el día uno."
date: 2026-11-03
category: "Proyectos"
tags: ["saas", "astro", "multi-tenant", "prisma", "vercel"]
author: "Nico Tomasin"
draft: false
---

## TL;DR

**[Mi Vidriera](https://mividriera.com.ar)** ayuda a emprendimientos y pequeños negocios a mostrar lo que venden en **un solo link** y a recibir consultas por WhatsApp, sin tener que montar ni mantener un e-commerce completo.

Técnicamente es un **SaaS multi-tenant** hecho con Astro: un sitio de marketing, un panel para los clientes y cientos de vidrieras públicas que viven dentro de la misma aplicación, cada una con su handle o su dominio propio.

![Landing de Mi Vidriera](/blog/mi-vidriera/landing.webp)

---

## El problema: vender por Instagram es un caos

Muchísimos emprendimientos venden por redes. El recorrido típico del cliente es así:

- ve una publicación y no sabe qué más vende el negocio;
- escribe por mensaje directo preguntando precio y disponibilidad;
- espera la respuesta, que llega sin contexto de qué producto estaba mirando.

Un e-commerce completo resuelve esto, pero es caro, lleva tiempo y exige administrar pagos, stock y envíos. Para muchos negocios es demasiado.

> [!tip] La propuesta
> **Mostrá tus productos. Conversá por WhatsApp. Sin complicarte.** Una vidriera clara, compartible y fácil de actualizar, donde cada producto puede iniciar una consulta con contexto.

---

## Cómo funciona para el usuario

1. Te registrás y elegís el **handle** de tu vidriera.
2. Cargás productos, precios, redes y links desde un editor visual.
3. Ves los cambios en **borrador** y publicás cuando estás conforme.
4. Compartís tu link en la bio de Instagram (o conectás tu propio dominio).
5. Cada consulta llega a WhatsApp, o al destino que elijas, sabiendo qué producto le interesó al cliente.

---

## Arquitectura: tres aplicaciones en una

Todo vive en una única app de Astro con renderizado del lado del servidor, desplegada en Vercel:

```text
Visitante  → dominio propio o /v/:handle → middleware → vidriera pública
Cliente    → /app                        → auth → editor y API → base de datos
Marketing  → /, /blog y páginas de planes → páginas estáticas
```

### El middleware como recepcionista

La pieza clave es el **middleware**: mira cada request y decide qué mostrar. Si llega por un dominio propio o por `/v/:handle`, resuelve a qué negocio pertenece y renderiza su vidriera. Si es una ruta del panel, verifica la sesión. Si es marketing, sirve la página estática.

### Borrador vs. publicado

Cada vidriera tiene dos versiones de su configuración: la que el dueño está editando y la que ve el público. Editar nunca rompe lo que está online. Es un detalle simple que evita muchos sustos.

### Capas bien separadas

| Capa | Responsabilidad |
| --- | --- |
| Presentación | Landing, panel y vidrieras |
| Borde de la app | Middleware, autenticación, validación y API |
| Reglas | Sanitización, handles, rate limiting, URLs |
| Persistencia | Prisma sobre PostgreSQL |
| Integraciones | Autenticación externa, pagos, dominios, CAPTCHA y almacenamiento de imágenes |

---

## Seguridad desde el día uno

Un SaaS abierto al público es un blanco fácil para bots y abusos. Antes de lanzar invertí en:

- **CAPTCHA** con Cloudflare Turnstile en el registro;
- **rate limiting** en los endpoints críticos;
- **validación y sanitización** de todo lo que entra;
- **logs sanitizados** en producción;
- **auditoría** de acciones relevantes;
- consultas a la base siempre a través del ORM.

Además, el entorno de desarrollo **se niega a arrancar** si detecta credenciales que no son locales. Es una protección tonta, pero evita el clásico accidente de tocar producción desde tu notebook.

---

## Stack

| Parte | Tecnología |
| --- | --- |
| Framework | Astro (SSR) con islas de React |
| Datos | PostgreSQL y Prisma con migraciones versionadas |
| Autenticación | Stack Auth |
| Hosting | Vercel, Vercel Blob para imágenes y dominios personalizados |
| Editor | React Hook Form y dnd-kit para ordenar productos |
| Calidad | Vitest (unitarios e integración contra una base en Docker) y CI en GitHub Actions |

---

## Lo que aprendí

- **Multi-tenant no es solo "un campo `tenant_id`".** Resolver el tenant temprano, en el middleware, simplificó todo lo que viene después.
- **Separar borrador de publicado** debería ser el default en cualquier editor.
- **La seguridad es más barata al principio.** Agregar rate limiting y auditoría con usuarios reales encima es mucho más doloroso.
- **Un producto chico y claro vende mejor** que uno que intenta ser un e-commerce a medias.

Mi Vidriera está online y la podés probar en [mividriera.com.ar](https://mividriera.com.ar).
