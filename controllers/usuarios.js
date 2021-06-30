const { response } = require("express");

const usuariosGet = (req, res = response) => {
  res.json({
    msg: "GET Seb Salazar - Controller",
  });
};

const usuariosPost = (req, res = response) => {
  res.json({
    msg: "Post Seb Salazar - Controller",
  });
};

const usuariosPut = (req, res = response) => {
  res.json({
    msg: "Put Seb Salazar - Controller",
  });
};

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: "Patch Seb Salazar - Controller",
  });
};

const usuariosDelete = (req, res = response) => {
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
