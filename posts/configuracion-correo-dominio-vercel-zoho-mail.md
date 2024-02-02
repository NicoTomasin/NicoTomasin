---
title: Configuración de correo con tu dominio en Vercel y Zoho Mail
description: Explicación de los pasos a seguir para crear un mail con tu dominio web configurándolo desde las DNS de Vercel
coverImage: /configuracion-correo-dominio-vercel-zoho-mail/coverImage.png
date: 08/09/2023
alt: Configuración sencilla de correo con tu dominio en Vercel y Zoho Mail
---

## Pasos previos necesarios

Si no tenes un proyecto deployado en Vercel o no tenes un dominio propio, podes leer los siguientes posts:

- [Deployar en Vercel](https://www.nicotomasin.com.ar/blog/despliegue-vercel-dominio-personalizado)
- [Comprar un dominio en NIC argentina](https://www.nicotomasin.com.ar/blog/como-comprar-un-dominio-en-NIC-argentina)

## Crear cuenta en Zoho Mail

Primero hay que crear una cuenta en [Zoho Mail](https://www.zoho.com/), podes usar otras alternativas como la que ofrece [Google](https://workspace.google.com/intl/es-419_ar/products/gmail/), pero en mi caso el plan gratuito de [Zoho](https://www.zoho.com/es-xl/mail/zohomail-pricing.html?src=mpd-menu) se adapta perfectamente al uso que deseo.
Tene en cuenta que en el registro debemos poner un mail real, no el que deseas crear.

![Registro en Zoho](/configuracion-correo-dominio-vercel-zoho-mail/registro.png)

Voy a elegir el plan gratuito para seguir con los demás pasos

![plan gratuito](/configuracion-correo-dominio-vercel-zoho-mail/probarGratis.png)

Ahora voy a agregar un dominio y a rellenarlo con los datos que corresponda

![Declarar Dominio](/configuracion-correo-dominio-vercel-zoho-mail/declararDominio.png)

Y para validar el dominio voy a elegir la opción por CNAME al DNS

![CNAME](/configuracion-correo-dominio-vercel-zoho-mail/cname.png)

Con esos valores que se muestran voy a ir al panel de usuario en Vercel donde se ven todos los proyectos para acceder a la pestaña de Domains

![Panel de vercel](/configuracion-correo-dominio-vercel-zoho-mail/domains.png)

Accedo al dominio que quiero para el mail, que debería ser el mismo que declare anteriormente en Zoho. Si no tenes un dominio propio en tu proyecto de Vercel te recomiendo que veas [este post](https://www.nicotomasin.com.ar/blog/despliegue-vercel-dominio-personalizado).

Ahora agrego el Record CNAME con la information que me dio Zoho

![Cname en dns](/configuracion-correo-dominio-vercel-zoho-mail/agregarDNS.png)

Ya que estoy aca voy a agregar los siguientes valores

```
value: mx3.zoho.com
TTL: 3600
Priority: 50

value: mx2.zoho.com
TTL: 3600
Priority: 20

value: mx.zoho.com
TTL: 3600
Priority: 10
```

Una vez agregados vuelvo a la pagina de Zoho y lo valido. si esto no funciona inmediatamente en tu caso, podes esperar entre 30m y 1h sin hacer ningún cambio y volver a validar.
Si sigue sin funcionar podes probar con el método TXT.

Una vez validado solo queda agregar las configuraciones personales que quieras.

Cuando termines todo el proceso podes iniciar sesión en Zoho usando el Mail que hallas creado, por ejemplo hola@tudominio.com.ar y la contraseña es la que usaste cuando te registraste en Zoho con tu mail personal.
