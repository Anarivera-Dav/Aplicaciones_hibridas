import * as rutasController from '../controllers/rutas.controller.js';
import { Router } from 'express';

const router = Router();

router.get('/', rutasController.index);
router.get('/rutas/crear', rutasController.formularioCrear);
router.post('/rutas/crear', rutasController.crearPuntoInteres);
router.get('/rutas/:categoria/:id', rutasController.detalle);
router.get('/rutas/:categoria', rutasController.ruta);
router.get('/rutas/:categoria/:id/editar', rutasController.formularioEditar);
router.post('/rutas/:categoria/:id/editar', rutasController.editarPuntoInteres);
router.post('/rutas/:categoria/:id/eliminar', rutasController.eliminarPuntoInteres);

export default router;
