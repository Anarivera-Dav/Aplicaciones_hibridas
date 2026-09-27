import { Router } from 'express';
import * as rutasController from '../controllers/rutas.controller.js';

const router = Router();

router.get('/api/rutas', rutasController.buscarPuntosDeInteres);
router.get('/api/rutas/:id', rutasController.obtenerPuntoDeInteres);
router.post('/api/rutas', rutasController.crearPuntoDeInteres);
router.put('/api/rutas/:id', rutasController.editarPuntoDeInteres);
router.delete('/api/rutas/:id', rutasController.eliminarPuntoDeInteres);

export default router;
