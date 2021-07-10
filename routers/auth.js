const { Router } = require("express");
const { check } = require("express-validator");

const { login, googleSignin } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");


const router = Router();

router.post("/login",[
    check('correo', 'El correo es obligatorio y debe ser valido').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);

router.post("/google-sign",[
    check('id_token', 'El id_token es necesario').not().isEmpty(),
    validarCampos
], googleSignin );

module.exports = router;
