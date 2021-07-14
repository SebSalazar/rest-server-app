const path = require("path");
const { response } = require("express");
const { v4: uuidv4 } = require("uuid");

const cargarArchivo = (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    res.status(400).json({ msg: "No hay archivos en la peticion" });
    return;
  }

  const { archivo } = req.files;
  const nombreCut = archivo.name.split(".");
  const extension = nombreCut[nombreCut.length - 1];

  // Validar extension
  const extensionesValidas = ["png", "jpg", "jpeg", "gif"];

  if (!extensionesValidas.includes(extension)) {
    return res.status(400).json({
      msg: `La extension ${extension} no es permitida - validas(${extensionesValidas})`,
    });
  }

  const nombreTemp = uuidv4() + "." + extension;
  const uploadPath = path.join(__dirname, "../uploads/", nombreTemp);

  archivo.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).json({ err });
    }

    res.json({ msg: "File uploaded to " + uploadPath });
  });
};

module.exports = {
  cargarArchivo,
};
