const { response } = require("express");
const { Categoria } = require("../models");
const categoria = require("../models/categoria");

const obtenerCategorias = async (req, res = response) => {
  const { limite = 10, desde = 0 } = req.query;
  const query = { estado: true };
  const populate = { path: "usuario", select: "rol nombre correo" };

  const [total, categorias] = await Promise.all([
    Categoria.countDocuments(query),
    Categoria.find(query)
      .skip(Number(desde))
      .limit(Number(limite))
      .populate(populate),
  ]);

  res.status(200).json({
    total,
    categorias,
  });
};

const obtenerCategoriaById = async (req, res = response) => {
  const { id } = req.params;
  const populate = { path: "usuario", select: "rol nombre correo" };

  const categoria = await Categoria.findById(id).populate(populate);

  res.status(200).json({
    categoria,
  });
};

const crearCategoria = async (req, res = response) => {
  const nombre = req.body.nombre.toUpperCase();

  const categoriaDB = await Categoria.findOne({ nombre });

  if (categoriaDB) {
    return res.status(400).json({
      msg: `La categoria ${categoriaDB.nombre} ya existe en la DB`,
    });
  }

  // Generar la data a guardar
  const data = {
    nombre,
    usuario: req.usuario._id,
  };

  const categoria = new Categoria(data);

  // Guardar en la DB
  await categoria.save();

  res.status(201).json(categoria);
};

const actualizarCategoria = async (req, res = response) => {
  const { id } = req.params;
  const nombre = req.body.nombre.toUpperCase();

  const categoria = await Categoria.findByIdAndUpdate(id, { nombre });

  res.status(200).json(categoria);
};

const eliminarCategoria = async (req, res = response) => {
  const { id } = req.params;

  // Cambiando el estado a false
  const categoriaDelete = await categoria.findByIdAndUpdate(id, {
    estado: false,
  });

  // Usuario autenticado
  const { nombre, _id, rol } = req.usuario;
  const usuarioAuth = {
    _id,
    nombre,
    rol,
  };

  res.json({ categoriaDelete, usuarioAuth });
};

module.exports = {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoriaById,
  actualizarCategoria,
  eliminarCategoria,
};
