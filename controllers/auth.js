const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");

const { generarJWT } = require("../helpers/generarJWT");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req = request, res = response) => {
  const { correo, password } = req.body;

  try {
    // Verificar si el email existe
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({
        msg: "El usuario o password no son correctos - email",
      });
    }

    // Verificar si el usuario esta activo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: "El usuario o password no son correctos - estado:false",
      });
    }

    // Verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "El usuario o password no son correctos - contraseña",
      });
    }

    // Generar el JWT
    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Ocurrio un error interno en el servidor",
    });
  }
};

const googleSignin = async (req = request, res = response) => {
  const { id_token } = req.body;

  try {
    const { nombre, correo, img } = await googleVerify(id_token);

    // Verificar si el correo existe
    let usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      // Toca crear el usuario
      const data = {
        nombre,
        correo,
        password: ":c",
        img,
        google: true,
      };

      usuario = new Usuario(data);
      await usuario.save();
    }

    // Validar estado del usuario
    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Hable con el administrador, usuario bloqueado",
      });
    }

    // Generar el JWT
    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token
    });
  } catch (error) {
    res.status(400).json({
      msg: "Token de Google no es válido",
    });
  }
};

module.exports = {
  login,
  googleSignin,
};
