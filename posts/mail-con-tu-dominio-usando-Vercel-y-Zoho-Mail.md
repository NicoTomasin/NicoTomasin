---
title: Mail con tu dominio usando Vercel y Zoho Mail
description: Explicación de los pasos a seguir para crear un mail con tu dominio web configurándolo desde las DNS de Vercel
coverImage: /mail-zoho-vercel/coverImage.png
date: 08/09/2023
alt: Mail con tu dominio usando Vercel y Zoho Mail
---

## Pasos previos necesarios

Si no tenes un proyecto deployado en Vercel o no tenes du dominio propio, podes leer estos dos posts:

- [Deployar en Vercel](https://www.nicotomasin.com.ar/posts/deployar-en-Vercel-usando-un-dominio-propio)
- [Comprar un dominio en NIC argentina](https://www.nicotomasin.com.ar/posts/como-comprar-un-dominio-en-NIC-argentina)

## Crear cuenta en Zoho Mail

Primero hay que crear una cuenta en [Zoho Mail](https://www.zoho.com/), Podes usar otras alternativas como la que ofrece [Google](https://workspace.google.com/intl/es-419_ar/products/gmail/), pero en nuestro caso el plan gratuito de [Zoho](https://www.zoho.com/es-xl/mail/zohomail-pricing.html?src=mpd-menu) se adapta al uso que le daremos.
Ten en cuenta que en el registro debemos poner un mail real, no el que queremos crear.

![Registro en Zoho](/mail-zoho-vercel/registro.png)

Vamos a elegir el plan gratuito para seguir con los pasos

![plan gratuito](/mail-zoho-vercel/probarGratis.png)

Ahora vamos a elegir la opción de agregar un dominio y a rellenarlo con los datos que corresponda

![Declarar Dominio](/mail-zoho-vercel/declararDominio.png)

Y para validar el dominio vamos a elegir la opción por CNAME al DNS

![CNAME](/mail-zoho-vercel/cname.png)

con esos valores que te muestran vamos a dirigirnos al panel de usuario en Vercel donde vemos todos nuestros proyectos para acceder a la pestaña de Domains

![Panel de vercel](/mail-zoho-vercel/domains.png)

Accedemos al dominio que queremos para nuestro mail, que debería ser el mismo que declaramos anteriormente en Zoho. Si no tenes un dominio en propio en tu proyecto de Vercel te recomomiendo que veas [este post](https://www.nicotomasin.com.ar/posts/deployar-en-Vercel-usando-un-dominio-propio)en donde explico como agregarlo.

Ahora agregamos el Record CNAME con la information que nos dios Zoho

![Cname en dns](/mail-zoho-vercel/agregarDNS.png)

Ya que estamos aquí vamos a agregar los siguientes valores

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

Una vez agregados volvemos a la pagina de Zoho y hacemos click en validar. si esto funciona, puede esperar entre 30m y 1h sin hacer ningún cambio y volver a validar.
Si sigue sin funcionar puede probar con el método TXT.

Una vez validado solo queda agregar las configuraciones personales que desee.

Una vez terminado todo el proceso puede iniciar sesión en Zoho usando el Mail que halla creado, por ejemplo hola@tudominio.com.ar y la contraseña es la que uso cuando se registro con su mail personal.
