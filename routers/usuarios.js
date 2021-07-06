const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validacion");
const { esRoleValido, emailExiste, existeUsuarioByID } = require("../helpers/db-validators");

const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
} = require("../controllers/usuarios");

const router = Router();

router.get("/", usuariosGet);

router.post("/",[
  check("password", "La contraseña debe tener minimo 6 caracteres").isLength({min: 6}),
  check("nombre", "El nombre es obligatorio").not().isEmpty(),
  check("correo").custom(emailExiste),
  check("correo", "El correo no es valido").isEmail(),
  check("rol").custom(esRoleValido),
  //check('rol', 'El rol no es valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  validarCampos,
],usuariosPost);

router.put("/:id", [
  check("id", "El ID no es valido").isMongoId(),
  check("id").custom(existeUsuarioByID),
  check("rol").custom(esRoleValido),
  validarCampos
], usuariosPut);

router.delete("/:id",[
  check("id", "El ID no es valido").isMongoId(),
  check("id").custom(existeUsuarioByID),
  validarCampos
], usuariosDelete);

router.patch("/", usuariosPatch);

module.exports = router;
