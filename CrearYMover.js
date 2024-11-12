import * as fs from 'node:fs/promises';
import path from 'node:path';
import { EventEmitter } from 'events';

async function CrearYMover(CARPETA_DESCARGAS, extArchivos) {
  const evento = new EventEmitter();
  let archivos = await fs.readdir(CARPETA_DESCARGAS);

  evento.on('crearCarpetas', async () => {
    const promesaDeCarpetas = extArchivos.map(async (ext) => {
      let directorioNuevo = ext.replace('.', '');
      try {
        await fs.access(path.posix.join(CARPETA_DESCARGAS, directorioNuevo));
        console.log(`El directorio ya existe`);
      } catch (error) {
        await fs.mkdir(path.posix.join(CARPETA_DESCARGAS, directorioNuevo));
        console.log(`Directorio creado`);
      }
    });

    await Promise.all(promesaDeCarpetas);

    evento.emit('carpetasCreadas');
  });

  evento.on('carpetasCreadas', () => {
    archivos.forEach(async (archivo) => {
      let extension = path.posix.extname(archivo);
      if (extArchivos.includes(extension)) {
        try {
          await fs.rename(
            path.posix.join(CARPETA_DESCARGAS, archivo),
            path.posix.join(
              CARPETA_DESCARGAS,
              extension.replace('.', ''),
              archivo
            )
          );
          console.log('Archivo movido exitosamente');
        } catch (error) {
          console.error('Error al mover el archivo', error);
        }
      }
    });
  });

  evento.emit('crearCarpetas');
}

export default CrearYMover;
