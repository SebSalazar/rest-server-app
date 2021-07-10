const { Router } = require("express");
const { check } = require("express-validator");

const { validarJWT, validarCampos, tieneRol } = require("../middlewares");

const {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoriaById,
  actualizarCategoria,
  eliminarCategoria,
} = require("../controllers/categorias");

const { existeCategoriaByID } = require("../helpers/db-validators");

const router = Router();

// Obtener todas la categorias - public
router.get("/", obtenerCategorias);

// Obtener una categoria - public
router.get(
  "/:id",
  [
    check("id", "El ID no es valido").isMongoId(),
    check("id").custom(existeCategoriaByID),
    validarCampos,
  ],
  obtenerCategoriaById
);

// Crear una categoria - private - requiere JWT
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearCategoria
);

// Actualizar una categoria - private - requiere JWT
router.put(
  "/:id",
  [
    validarJWT,
    tieneRol("ADMIN_ROLE", "VENTAS_ROLE"),
    check("id", "El ID no es valido").isMongoId(),
    check("id").custom(existeCategoriaByID),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  actualizarCategoria
);

// Borrar una categoria - ADMIN - requiere JWT
router.delete(
  "/:id",
  [
    validarJWT,
    tieneRol("ADMIN_ROLE"),
    check("id", "El ID no es valido").isMongoId(),
    check("id").custom(existeCategoriaByID),
    validarCampos,
  ],
  eliminarCategoria
);

module.exports = router;
