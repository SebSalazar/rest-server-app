const Role = require("../models/rol");
const Usuario = require("../models/usuario");

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

module.exports = {
  esRoleValido,
  emailExiste,
  existeUsuarioByID
};
