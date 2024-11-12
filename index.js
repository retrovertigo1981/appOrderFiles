import path from 'node:path';
import ObtenerExt from './ObtenerExt.js';
import CrearYMover from './CrearYMover.js';

const CARPETA_DESCARGAS = '/mnt/c/Users/pjfan/Downloads/test';

const ruta = path.posix.dirname(CARPETA_DESCARGAS);
const base = path.posix.basename(CARPETA_DESCARGAS);
console.log(ruta, base);

const extensiones = await ObtenerExt(ruta, base);

CrearYMover(CARPETA_DESCARGAS, extensiones);
// console.log(extensiones);
