const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");

const usuariosGet = (req = request, res = response) => {
  const { q, nombre = "Sin nombre", apikey, page = 1, limit } = req.query;

  res.json({
    msg: "GET Seb Salazar - Controller",
    q,
    nombre,
    apikey,
    page,
    limit,
  });
};

const usuariosPost = async (req = request, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  // Guardar en DB
  await usuario.save();

  res.json({
    msg: "Post Seb Salazar - Controller",
    usuario,
  });
};

const usuariosPut = async (req = request, res = response) => {
  const { id } = req.params;
  const {_id, password, google, correo, ...resto } = req.body;

  // TODO validar contra la base de datos
  if (password) {
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json({
    msg: "Put Seb Salazar - Controller",
    usuario,
  });
};

const usuariosPatch = (req = request, res = response) => {
  res.json({
    msg: "Patch Seb Salazar - Controller",
  });
};

const usuariosDelete = (req = request, res = response) => {
  res.json({
    msg: "Delete Seb Salazar - Controller",
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
