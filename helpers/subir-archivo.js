const path = require("path");
const { v4: uuidv4 } = require("uuid");

const subirArchivo = (
  files,
  extensionesValidas = ["png", "jpg", "jpeg", "gif"],
  carpeta = ""
) => {
  return new Promise((resolve, reject) => {
    const { archivo } = files == undefined ? reject('Debe ingresar una imagen') : files;
    const nombreCut = archivo.name.split(".");
    const extension = nombreCut[nombreCut.length - 1];

    // Validar extension
    if (!extensionesValidas.includes(extension)) {
      return reject(
        `La extension ${extension} no es permitida - validas(${extensionesValidas})`
      );
    }

    const nombreTemp = uuidv4() + "." + extension;
    const uploadPath = path.join(__dirname, "../uploads/", carpeta, nombreTemp);

    archivo.mv(uploadPath, (err) => {
      if (err) {
        reject(err);
      }

      resolve(nombreTemp);
    });
  });
};

module.exports = {
  subirArchivo,
};
