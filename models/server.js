const express = require("express");

class Server {
  constructor(params) {
    this.app = express();
    this.port = process.env.PORT;

    // Middlewares
    this.middlewares();
    // Rutas de la aplicaicon
    this.routes();
  }

  middlewares() {
    // Directorios publicos
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.get("/api", (req, res) => {
      res.json({
        msg: "GET Seb Salazar API",
      });
    });

    this.app.put("/api", (req, res) => {
      res.json({
        msg: "PUT Seb Salazar API",
      });
    });

    this.app.post("/api", (req, res) => {
      res.json({
        msg: "POST Seb Salazar API",
      });
    });

    this.app.delete("/api", (req, res) => {
      res.json({
        msg: "DELETE Seb Salazar API",
      });
    });

  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Corriendo en: ", this.port);
    });
  }
}

module.exports = Server;
