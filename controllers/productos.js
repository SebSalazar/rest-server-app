const { response } = require("express");

const { Producto } = require("../models");

const obtenerProductos = async (req, res = response) => {
  const { limite = 10, desde = 0 } = req.query;
  const query = { estado: true };
  const populateUser = { path: "usuario", select: "rol nombre" };
  const populateCat = { path: "categoria", select: "nombre" };

  const [total, productos] = await Promise.all([
    Producto.countDocuments(query),
    Producto.find(query)
      .skip(Number(desde))
      .limit(Number(limite))
      .populate(populateUser)
      .populate(populateCat),
  ]);

  res.status(200).json({
    total,
    productos,
  });
};

const obtenerProductoById = async (req, res = response) => {
  const { id } = req.params;
  const populateUser = { path: "usuario", select: "rol nombre" };
  const populateCat = { path: "categoria", select: "nombre" };

  const producto = await Producto.findById(id)
    .populate(populateUser)
    .populate(populateCat);

  res.status(200).json({
    producto: producto,
  });
};

const crearProducto = async (req, res = response) => {
  const { estado, usuario, ...body } = req.body;

  const productoDB = await Producto.findOne({ nombre: body.nombre.toUpperCase() });

  if (productoDB) {
    return res.status(400).json({
      msg: `El producto ${productoDB.nombre} ya existe en la DB`,
    });
  }

  // Generar la data a guardar
  const data = {
    ...body,
    nombre: body.nombre.toUpperCase(),
    usuario: req.usuario._id,
  };

  const producto = new Producto(data);

  // Guardar en la DB
  await producto.save();

  res.status(201).json(producto);
};

const actualizarProducto = async (req, res = response) => {
  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;

  if (data.nombre) {
    data.nombre = data.nombre.toUpperCase();
  }
  data.usuario = req.usuario._id;

  const producto = await Producto.findByIdAndUpdate(id, data );

  res.status(200).json(producto);
};

const eliminarProducto = async (req, res = response) => {
  const { id } = req.params;

  // Cambiando el estado a false
  const productoDelete = await Producto.findByIdAndUpdate(id, {
    estado: false,
  });

  // Usuario autenticado
  const { nombre, _id, rol } = req.usuario;
  const usuarioAuth = {
    _id,
    nombre,
    rol,
  };

  res.json({ productoDelete, usuarioAuth });
};

module.exports = {
  crearProducto,
  obtenerProductos,
  obtenerProductoById,
  actualizarProducto,
  eliminarProducto,
};
