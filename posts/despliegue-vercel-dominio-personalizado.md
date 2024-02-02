---
title: "Despliegue en Vercel con un Dominio Personalizado"

description: "Cómo desplegar en Vercel y configurar un dominio comprado a través de NIC Argentina. A lo largo de esta guía, veremos el paso a paso del proceso completo."

coverImage: "/despliegue-vercel-dominio-personalizado/coverImage.png"

date: "24/08/2023"

alt: "Despliegue en Vercel con un Dominio Personalizado"
---

## Pasos previos necesarios

Vas a necesitar tener un proyecto en [GitHub](https://github.com/), sino podes usar los de ejemplo que ofrece Vercel, pero lo ideal es poder hacerlo con uno propio para ver algunos beneficios

Tener una cuenta en [Vercel](https://vercel.com/). La misma puede ser dada de alta con la cuenta de GitHub

## Conexión y deploy

Una vez tengamos el repo del proyecto listo y una cuenta de Vercel, podemos hacer un deploy muy simple dándole permisos a Vercel para acceder al repo. En mi caso la interfaz puede ser un poco diferente debido a que tengo dos proyectos en producción, pero los pasos a seguir son bastantes similares.

Primero voy a crear un [nuevo proyecto](https://vercel.com/new)

![Nuevo Proyecto](/despliegue-vercel-dominio-personalizado/NuevoProyecto.png)

En este caso seleccione el repo de mi portfolio y nos muestra una pestañea para configurar el deploy

![Configuración](/despliegue-vercel-dominio-personalizado/Configuracion.png)

En "Framework Preset" podes buscar si esta disponible el que hallas usado si es que no lo detecto automáticamente vercel o en un futuro podrías cambiarlo en caso de migrar

En la pestaña de "Build and Output Settings" podes hacer un override o sobre escritura de los comandos básicos para construir la web, por ejemplo, aca podrías personalizar el comando si en vez de usar npm estas usando pnpm o algún otro gestor de paquetes.

![Configuración De Comandos](/despliegue-vercel-dominio-personalizado/ConfiguracionDeComandos.png)

Por ultimo esta la sección de variables de entorno para poder agregar las que sean necesarias

Una vez configurado a gusto voy a hacer el deploy para que arranque la magia

![Deploy](/despliegue-vercel-dominio-personalizado/Deploy.png)

Terminado el proceso, si no hubo ningún error,vercel mostrara un mensaje de felicitaciones y alguna documentación útil

![Congratulations](/despliegue-vercel-dominio-personalizado/Congratulations.png)

voy a evitar por el momento esa documentación e ir directamente al dashboard del proyecto

![Dashboard](/despliegue-vercel-dominio-personalizado/Dashboard.png)

Si bien hay muchas opciones interesantes aca, si queres explorarlo a fondo queda por tu cuenta, sin miedo al éxito!

## Asignación de dominio

Ahora me voy a enfocar en la sección de "Domains" en donde voy a escribir el dominio que compramos. Para este ejemplo voy a simular un que fue comprado en [NIC argentina](https://www.nicotomasin.com.ar/blog/como-comprar-un-dominio-en-NIC-argentina)

![Domains](/despliegue-vercel-dominio-personalizado/Domains.png)

Elegís la opción recomendada

![Domains Config](/despliegue-vercel-dominio-personalizado/DomainsConfig.png)

Aca elijo la opción por Nameservers y voy a darle a enable DNS para ver algo asi

![Nameservers](/despliegue-vercel-dominio-personalizado/NameServers.png)

Es hora de utilizar esos Nameservers en la pagina de [AFIP](https://tramitesadistancia.gob.ar/tramitesadistancia/pretramite;idTipoTramite=425) en donde voy a elegir la opción de delegar

![AFIP Delegar](/despliegue-vercel-dominio-personalizado/AfipDelegar.png)

Ahora voy a agregar una nueva delegación y voy a poner los Nameservers que nos dios Vercel

```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

![AFIP Nameservers](/despliegue-vercel-dominio-personalizado/AfipNameServers.png)

Le doy a ejecutar cambios y solo queda esperar aproximadamente 1H.
Vercel notifica vía mail cuando se pudo realizar correctamente y en la misma sección de domains veríamos algo así

![Validado](/despliegue-vercel-dominio-personalizado/Validado.png)

Tene en cuenta que esta ultima imagen es de otro dominio, no el que mostré en en el ejemplo ya que no quería comprar ese dominio y no usarlo para nada.
