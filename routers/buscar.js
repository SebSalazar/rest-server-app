const { Router } = require("express");
const { check } = require("express-validator");

const { buscar } = require("../controllers/buscar");

const router = Router();

router.get("/:coleccion/:termino", buscar);

module.exports = router;
