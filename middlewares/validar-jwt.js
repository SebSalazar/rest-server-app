const { response, request } = require("express");
const jwt = require("jsonwebtoken");

const Usuario = require("../models/usuario");

const validarJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la peticion",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    // Leyendo el usuario que corresponde al uid
    const user = await Usuario.findById(uid);

    if (!user) {
      return res.status(401).json({
        msg: "Token no valido - usuario no existe en DB",
      });
    }

    // Verificar si el uid tiene estado en true
    if (!user.estado) {
      return res.status(401).json({
        msg: "Token no valido - estado: false",
      });
    }

    req.usuario = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no valido",
    });
  }
};

module.exports = {
  validarJWT,
};
