const { response, request } = require("express");

const usuariosGet = (req = request, res = response) => {
  const {q, nombre = 'Sin nombre', apikey, page = 1, limit} = req.query;

  res.json({
    msg: "GET Seb Salazar - Controller",
    q,
    nombre,
    apikey,
    page,
    limit
  });
};

const usuariosPost = (req = request, res = response) => {
  const { nombre, edad } = req.body;
  res.json({
    msg: "Post Seb Salazar - Controller",
    nombre,
    edad,
  });
};

const usuariosPut = (req = request, res = response) => {
  const {id} = req.params;

  res.json({
    msg: "Put Seb Salazar - Controller",
    id,
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
