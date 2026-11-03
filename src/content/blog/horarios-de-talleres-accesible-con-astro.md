---
title: "Una grilla de horarios accesible que lee las actividades en voz alta"
description: "Cómo hice una web simple en Astro para mostrar los horarios de talleres culturales: un JSON como fuente, vista adaptada a celular, lectura en voz alta y exportación como imagen."
date: 2026-11-03
category: "Proyectos"
tags: ["astro", "accesibilidad", "text-to-speech", "json", "pwa"]
author: "Nico Tomasin"
draft: false
---

## TL;DR

Un proyecto chico pero que me gusta mucho: una web para mostrar la **grilla semanal de talleres** de un centro cultural. Toda la información sale de un único archivo JSON, se adapta al celular, cada actividad tiene un botón para **escucharla en voz alta** y la grilla completa se puede **descargar como imagen** para compartir por WhatsApp.

![Grilla semanal de talleres en escritorio](/blog/horarios-talleres/grilla.webp)

---

## El problema: los horarios viven en un PDF que nadie encuentra

En muchos centros culturales los horarios se comparten como un PDF o una foto de un cartel. Eso trae varios problemas:

- en el celular hay que hacer zoom para leer;
- cada cambio implica rediseñar y volver a mandar el archivo;
- para personas mayores o con baja visión, la letra chica es una barrera.

Los talleres incluyen actividades como gimnasia suave o taller de memoria, así que **la accesibilidad no era opcional**.

---

## Cómo funciona

### Un JSON como única fuente de verdad

Toda la grilla se genera desde un archivo con este formato:

```json
{
  "actividad": "Taller de Memoria",
  "dia": "MARTES",
  "horaInicio": "10:00",
  "horaFin": "12:00",
  "profesor": "Nombre del docente",
  "requisitos": "",
  "color": "#E6E6FA"
}
```

Actualizar un horario es editar una línea. Astro arma la tabla en el build: el resultado es HTML estático, liviano y rápido incluso con mala conexión.

### Dos vistas: escritorio y celular

- En **escritorio**, una grilla clásica con días en columnas y horas en filas; cada actividad ocupa las celdas de su duración.
- En **celular**, la tabla se transforma en **una tarjeta por día**, con las actividades en orden. Nada de hacer zoom ni scroll horizontal.

![Vista para celular: una tarjeta por día](/blog/horarios-talleres/mobile.webp)

### Lectura en voz alta

Cada actividad tiene un botón con un parlante. Al tocarlo, el navegador **lee la actividad, el horario y el docente** en voz alta, en español y a una velocidad un poco más lenta de lo normal. Usa la API de síntesis de voz del propio navegador (a través de `speak-tts`), así que no necesita servidor ni conexión extra.

> [!tip] Accesibilidad con lo que ya trae el navegador
> La Web Speech API está disponible en casi todos los navegadores modernos. Con muy poco código suma muchísimo para usuarios que leen con dificultad.

### Descargar la grilla como imagen

Un botón convierte la grilla en una **imagen PNG** con `html2canvas`, al doble de resolución, lista para mandar por WhatsApp o imprimir. Así el centro sigue pudiendo compartir "el cartel", pero generado automáticamente y siempre actualizado.

---

## Stack

| Parte | Tecnología |
| --- | --- |
| Framework | Astro (sitio estático) |
| Datos | JSON |
| Voz | Web Speech API con speak-tts |
| Exportación | html2canvas |
| Extra | Manifest para instalarla como app |

---

## Lo que aprendí

- **Los proyectos chicos también merecen buen diseño.** El impacto en las personas que lo usan es directo.
- **Pensar primero en quién lo va a usar** cambió todo: tarjetas grandes en celular, voz y colores por actividad.
- **Mantener lo que ya funciona:** la gente comparte imágenes por WhatsApp, así que en lugar de pelear contra eso, lo automaticé.
