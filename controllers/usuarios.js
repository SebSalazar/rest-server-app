const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const {Usuario} = require("../models");

const usuariosGet = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query)
      .skip(Number(desde))
      .limit(Number(limite))
  ]);

  res.json({
    total,
    usuarios
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

  res.json(usuario);
};

const usuariosPut = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, password, correo, ...resto } = req.body;

  // TODO validar contra la base de datos
  if (password) {
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json(usuario);
};

const usuariosDelete = async (req = request, res = response) => {
  const {id} = req.params;

  // Eliminando fisicamente el usuario
  // const usuarioDelete = await Usuario.findByIdAndDelete(id);

  // Cambiando estado para mantener integridad de los datos
  const usuarioDelete = await Usuario.findByIdAndUpdate(id, {estado:false});

  // Usuario autenticado
  const usuarioAuth = req.usuario;

  res.json({usuarioDelete, usuarioAuth});
};

const usuariosPatch = (req = request, res = response) => {
  res.json({
    msg: "Patch Seb Salazar - Controller",
  });
};


module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
