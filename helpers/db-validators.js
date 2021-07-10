const Role = require("../models/rol");
const { Usuario, Categoria } = require("../models");

const esRoleValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no existe en la DB`);
  }
};

const emailExiste = async (correo = "") => {
  const existEmail = await Usuario.findOne({ correo });
  if (existEmail) {
    throw new Error(`El correo ${correo} ya esta registrado en la DB`);
  }
};

const existeUsuarioByID = async (id) => {
  const existUser = await Usuario.findById(id);
  if (!existUser) {
    throw new Error(`El usuario con ID: ${id} no existe en la base de datos`);
  }
};
const existeCategoriaByID = async (id) => {
  const existCategoria = await Categoria.findById(id);
  if (!existCategoria) {
    throw new Error(`La categoria con ID: ${id} no existe en la base de datos`);
  }
};

module.exports = {
  esRoleValido,
  emailExiste,
  existeUsuarioByID,
  existeCategoriaByID,
};
