const express = require("express");
var cors = require("cors");

const { dbConnection } = require("../database/config");
class Server {
  constructor(params) {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth:       "/api/auth",
      categorias: "/api/categorias",
      usuarios:   "/api/usuarios",
    };

    // Conexion database
    this.conectarDB();

    // Middlewares
    this.middlewares();

    // Rutas de la aplicaicon
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Lectura y parseo del Body
    this.app.use(express.json());

    // Directorios publicos
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.paths.auth, require("../routers/auth"));
    this.app.use(this.paths.categorias, require("../routers/categorias"));
    this.app.use(this.paths.usuarios, require("../routers/usuarios"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Corriendo en: ", this.port);
    });
  }
}

module.exports = Server;
