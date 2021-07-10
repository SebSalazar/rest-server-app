# RestServer - WebApp

Montando el servidor inicial para comenzar el desarrollo del proyecto **recetasdelaabuela.com**, en la version 1.3.0 se implemento todo el **Google Sign** para poder acceder a la aplicación haciendo uso de los servicios de Google, se genero su correspondiente front y haciendo la petición con **fetch** y en el **backend** se realizaron las respectivas validaciones tanto para los tokens, como para validar si el usuario existe en caso contrario registrarlo en la DB.

## Requerimientos

Hasta el momento se ha hecho uso de las siguientes dependencias principales:

- <img alt="NodeJS" src="https://img.shields.io/badge/NodeJS%20-%23092E20.svg?&style=for-the-badge&logo=javascript&logoColor=white"/>

- <img alt="Mongo" src="https://img.shields.io/badge/MongoDB%20-%234ea94b.svg?&style=for-the-badge&logo=mongodb&logoColor=white"/>

### Otros requerimientos

```

"bcryptjs": "^2.4.3",
"cors": "^2.8.5",
"dotenv": "^10.0.0",
"express": "^4.17.1",
"express-validator": "^6.12.0",
"jsonwebtoken": "^8.5.1",
"google-auth-library": "^7.3.0",
"mongoose": "^5.13.2",
"nodemon": "^2.0.9"

```

### .example.env

En este archivo podra ver ejemplo de como se deben poner las variables de entorno en caso que requieran correr el proyecto de manera local.