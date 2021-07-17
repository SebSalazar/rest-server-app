const { Router } = require("express");
const { check } = require("express-validator");

const {
  cargarArchivo,
  actualizarImagen,
} = require("../controllers/uploads");

const { validarCampos } = require("../middlewares");

const { coleccionesPermitidas } = require("../helpers");

const router = Router();

router.post("/", cargarArchivo);

router.put(
  "/:coleccion/:id",
  [
    check("id", "El ID debe ser de Mongo").isMongoId(),
    check("coleccion").custom((c) =>
      coleccionesPermitidas(c, ["usuarios", "productos"])
    ),
    validarCampos,
  ],
  actualizarImagen
);

module.exports = router;
