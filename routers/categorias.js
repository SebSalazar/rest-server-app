const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

// Obtener todas la categorias - public
router.get("/", (req, res) => {
  res.json({
    msg: "Get 1",
  });
});

// Obtener una categoria - public
router.get("/:id", (req, res) => {
  res.json({
    msg: "Get 2",
  });
});

// Crear una categoria - private - requiere JWT
router.post("/", (req, res) => {
  res.json({
    msg: "Post",
  });
});

// Actualizar una categoria - private - requiere JWT
router.put("/:id", (req, res) => {
  res.json({
    msg: "Put",
  });
});

// Borrar una categoria - ADMIN - requiere JWT
router.delete("/:id", (req, res) => {
  res.json({
    msg: "Delete",
  });
});

module.exports = router;
