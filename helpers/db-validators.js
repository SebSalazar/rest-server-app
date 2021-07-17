const Role = require("../models/rol");
const { Usuario, Categoria, Producto } = require("../models");

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
const existeProductoByID = async (id) => {
  const existProducto = await Producto.findById(id);
  if (!existProducto) {
    throw new Error(`El producto con ID: ${id} no existe en la base de datos`);
  }
};

// Validar colecciones permitidas
const coleccionesPermitidas = async (coleccion = "", colecciones = []) => {
  const incluida = colecciones.includes(coleccion);

  if (!incluida) {
    throw new Error(
      `La coleccion ${coleccion} no es permitida - ${colecciones}`
    );
  }

  return true;
};

module.exports = {
  esRoleValido,
  emailExiste,
  existeUsuarioByID,
  existeCategoriaByID,
  existeProductoByID,
  coleccionesPermitidas,
};
