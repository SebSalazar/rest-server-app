const express = require("express");
var cors = require("cors");

class Server {
  constructor(params) {
    this.app = express();
    this.port = process.env.PORT;
    this.userPath = "/api/usuarios";

    // Middlewares
    this.middlewares();
    // Rutas de la aplicaicon
    this.routes();
  }

  middlewares() {
    // CORS
    this.app.use(cors());
    // Directorios publicos
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.userPath, require("../routers/usuarios"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Corriendo en: ", this.port);
    });
  }
}

module.exports = Server;
