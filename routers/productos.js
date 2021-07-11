const { Router } = require("express");
const { check } = require("express-validator");

const { validarJWT, validarCampos, tieneRol } = require("../middlewares");

const {
  crearProducto,
  obtenerProductos,
  obtenerProductoById,
  actualizarProducto,
  eliminarProducto,
} = require("../controllers/productos");

const {
  existeProductoByID,
  existeCategoriaByID,
} = require("../helpers/db-validators");

const router = Router();

// Obtener todos los productos - public
router.get("/", obtenerProductos);

// // Obtener un producto - public
router.get(
  "/:id",
  [
    check("id", "El ID no es valido").isMongoId(),
    check("id").custom(existeProductoByID),
    validarCampos,
  ],
  obtenerProductoById
);

// Crear un producto - private - requiere JWT
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("categoria", "No es un ID valido de categoria").isMongoId(),
    check("categoria").custom(existeCategoriaByID),
    validarCampos,
  ],
  crearProducto
);

// Actualizar un producto - private - requiere JWT
router.put(
  "/:id",
  [
    validarJWT,
    tieneRol("ADMIN_ROLE", "VENTAS_ROLE"),
    check("id", "El ID no es valido").isMongoId(),
    check("id").custom(existeProductoByID),
    validarCampos,
  ],
  actualizarProducto
);

// Borrar un producto - ADMIN - requiere JWT
router.delete(
  "/:id",
  [
    validarJWT,
    tieneRol("ADMIN_ROLE"),
    check("id", "El ID no es valido").isMongoId(),
    check("id").custom(existeProductoByID),
    validarCampos,
  ],
  eliminarProducto
);

module.exports = router;
