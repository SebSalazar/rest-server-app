# RestServer - WebApp

Montando el servidor inicial para comenzar el desarrollo del proyecto **recetasdelaabuela.com**, en la version 1.5.0 se implemento toda la parte de la **subida de archivos** y la proteccion de los mismo, se implementaron las rutas para la carga de files y sus respectivas validaciones, por ultimo se añadio un hosting externo para la carga de archivos e imagenes como **Cloudinary**.

## Requerimientos

Hasta el momento se ha hecho uso de las siguientes dependencias principales:

- <img alt="NodeJS" src="https://img.shields.io/badge/NodeJS%20-%23092E20.svg?&style=for-the-badge&logo=javascript&logoColor=white"/>

- <img alt="Mongo" src="https://img.shields.io/badge/MongoDB%20-%234ea94b.svg?&style=for-the-badge&logo=mongodb&logoColor=white"/>

### Otros requerimientos

```

"bcryptjs": "^2.4.3",
"cloudinary": "^1.26.2",
"cors": "^2.8.5",
"dotenv": "^10.0.0",
"express": "^4.17.1",
"express-fileupload": "^1.2.1",
"express-validator": "^6.12.0",
"google-auth-library": "^7.3.0",
"jsonwebtoken": "^8.5.1",
"mongoose": "^5.13.2",
"nodemon": "^2.0.9",
"uuid": "^8.3.2"

```

### .example.env

En este archivo podra ver ejemplo de como se deben poner las variables de entorno en caso que requieran correr el proyecto de manera local.