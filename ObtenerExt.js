import * as fs from 'node:fs/promises';
import path from 'node:path';

async function ObtenerExt(ruta, base) {
  let URL_DESCARGAS = path.posix.join(ruta, base);
  let files = await fs.readdir(path.posix.join(ruta, base));

  let archivos = files.filter(async (file) => {
    const fileUrl = path.posix.join(URL_DESCARGAS, file);

    let stats = await fs.stat(fileUrl);

    return !stats.isDirectory();
  });

  let extensiones = archivos.map((file) => path.posix.extname(file));
  let unicas = new Set(extensiones);

  const unicasArray = [...unicas];

  return unicasArray;
}

export default ObtenerExt;
