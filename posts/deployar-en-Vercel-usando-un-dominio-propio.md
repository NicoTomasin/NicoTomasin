---
title: "Deployar en Vercel usando un dominio propio"

description: "Guia paso a paso para deployar en Vercel y delegar un dominio comprado en NIC Argentina"

coverImage: "/deployar-en-Vercel-usando-un-dominio-propio/coverImage.png"

date: "24/8/2023"

alt: "Deployar en Vercel usando un dominio propio"
---

## Pasos previos necesarios

Vamos a necesitar tener un proyecto en [GitHub](https://github.com/), sino se pueden usar los de ejemplo que ofrece Vercel, pero lo ideal es poder hacerlo con uno propio para ver algunos beneficios

Tener una cuenta en [Vercel](https://vercel.com/). La misma puede ser dada de alta con la cuenta de GitHub

## Conexión y deploy

Una vez tengamos el repo del proyecto listo y una cuenta de Vercel, podemos hacer un deploy muy simple dándole permisos a Vercel para acceder al repo. En mi caso la interfaz puede ser un poco diferente debido a que tengo dos proyectos en producción, pero los pasos a seguir son bastantes similares.

Primero vamos a crear un [nuevo proyecto](https://vercel.com/new)

![Nuevo Proyecto](/deployar-en-Vercel-usando-un-dominio-propio/NuevoProyecto.png)

Yo seleccione el repo de esta web y nos muestra una pestañea para configurar el deploy

![Configuracion](/deployar-en-Vercel-usando-un-dominio-propio/Configuracion.png)

En "Framework Preset" podemos buscar si esta disponible el que hallamos usado si es que no lo detecto automáticamente o en un futuro podríamos cambiar esto en caso de migrar

En la pestaña de "Build and Output Settings" vemos que podemos hacer un override o sobre escritura de los comandos básicos para construir la web, aquí podríamos personalizar el comando si en vez de usar npm estamos usando pnpm o algún otro gestor de paquetes.

![Configuracion De Comandos](/deployar-en-Vercel-usando-un-dominio-propio/ConfiguracionDeComandos.png)

Por ultimo tenemos la sección de variables de entorno para poder agregar las que sean necesarias

Una vez configurado a gusto podemos darle al deploy y comenzara la magia

![Deploy](/deployar-en-Vercel-usando-un-dominio-propio/Deploy.png)

Terminado el proceso, si no hubo ningún error, nos mostrara un mensaje de felicitaciones y veremos alguna documentación útil

![Congratulations](/deployar-en-Vercel-usando-un-dominio-propio/Congratulations.png)

Vamos a evitar por el momento esa documentación e ir directamente al dashboard del proyecto

![Dashboard](/deployar-en-Vercel-usando-un-dominio-propio/Dashboard.png)

Si bien hay muchas opciones interesantes aquí, si queres explorarlo a fondo queda por tu cuenta, sin miedo al exito!

## Asignación de dominio

Ahora nos enfocaremos en la sección de "Domains" en donde vamos a escribir el dominio que compramos. en nuestro caso en [NIC argentina](https://www.nicotomasin.com.ar/posts/como-comprar-un-dominio-en-NIC-argentina)

![Domains](/deployar-en-Vercel-usando-un-dominio-propio/Domains.png)

Y elegimos la opción recomendada

![Domains Config](/deployar-en-Vercel-usando-un-dominio-propio/DomainsConfig.png)

Vamos a elegir la opcion por Nameservers y vamos a darle a enable DNS para ver algo asi

![Nameservers](/deployar-en-Vercel-usando-un-dominio-propio/NameServers.png)

Ahora es hora de utilizar esos Nameservers en la pagina de [AFIP](https://tramitesadistancia.gob.ar/tramitesadistancia/pretramite;idTipoTramite=425)en donde vamos a elegir la opcion de delegar

![AFIP Delegar](/deployar-en-Vercel-usando-un-dominio-propio/AfipDelegar.png)

ahora vamos a agregar una nueva delegación y vamos a poner los Nameservers que nos dios Vercel

```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

![AFIP Nameservers](/deployar-en-Vercel-usando-un-dominio-propio/AfipNameServers.png)

Le damos a ejecutar cambios y solo queda esperar aproximadamente 1H.
Vercel notifica vía mail cuando se pudo realizar correctamente y en la misma sección de domains veríamos algo así

![Validado](/deployar-en-Vercel-usando-un-dominio-propio/Validado.png)

Ten en cuenta que esta ultima imagen es de otro dominio, no el que mostre en en el ejemplo
