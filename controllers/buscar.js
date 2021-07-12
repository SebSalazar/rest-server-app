const { response } = require("express");
const { ObjectId } = require("mongoose").Types;

const { Usuario, Categoria, Producto } = require("../models");

const coleccionesPermitidas = ["usuarios", "categorias", "productos", "roles"];

const buscarUsuarios = async (termino = "", res = response) => {
  const isMongoId = ObjectId.isValid(termino); // TRUE

  if (isMongoId) {
    const usuario = await Usuario.findById(termino);
    return res.json({
      results: usuario ? [usuario] : [],
    });
  }

  const regex = new RegExp(termino, "i");

  const usuarios = await Usuario.find({
    $or: [{ nombre: regex }, { correo: regex }],
    $and: [{ estado: true }],
  });

  const cantidad = await Usuario.count({
    $or: [{ nombre: regex }, { correo: regex }],
    $and: [{ estado: true }],
  });

  res.json({
    cantidad,
    results: usuarios,
  });
};

const buscarCategorias = async (termino = "", res = response) => {
  const isMongoId = ObjectId.isValid(termino); // TRUE

  if (isMongoId) {
    const categoria = await Categoria.findById(termino).populate('usuario', 'nombre');
    return res.json({
      results: categoria ? [categoria] : [],
    });
  }

  const regex = new RegExp(termino, "i");

  const categorias = await Categoria.find({ nombre: regex, estado: true }).populate('usuario', 'nombre');

  const cantidad = await Categoria.count({ nombre: regex, estado: true });

  res.json({
    cantidad,
    results: categorias,
  });
};

const buscarProductos = async (termino = "", res = response) => {
  const isMongoId = ObjectId.isValid(termino); // TRUE

  if (isMongoId) {
    const producto = await Producto.findById(termino).populate('categoria', 'nombre');
    return res.json({
      results: producto ? [producto] : [],
    });
  }

  const regex = new RegExp(termino, "i");

  const productos = await Producto.find({
    $or: [{ nombre: regex }, { descripcion: regex }],
    $and: [{ disponible: true }],
  }).populate('categoria', 'nombre');

  const cantidad = await Producto.count({
    $or: [{ nombre: regex }, { descripcion: regex }],
    $and: [{ disponible: true }],
  });

  res.json({
    cantidad,
    results: productos,
  });
};

const buscar = (req, res = response) => {
  const { coleccion, termino } = req.params;

  if (!coleccionesPermitidas.includes(coleccion)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son ${coleccionesPermitidas}`,
    });
  }

  switch (coleccion) {
    case "usuarios":
      buscarUsuarios(termino, res);
      break;

    case "productos":
      buscarProductos(termino, res);
      break;

    case "categorias":
      buscarCategorias(termino, res);
      break;

    default:
      res.status(500).json({
        msg: "Error interno en las busquedas del server",
      });
  }
};

module.exports = {
  buscar,
};
