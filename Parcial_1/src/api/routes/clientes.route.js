import { Router } from 'express';
import * as clientesController from '../controllers/clientes.controller.js';

const router = Router();

router.get('/api/clientes', clientesController.obtenerTodosLosClientes);
router.post('/api/clientes', clientesController.crearCliente);
router.delete('/api/clientes/:id', clientesController.eliminarCliente);
router.get('/api/clientes/:id/paquetes', clientesController.obtenerPaquetesDelCliente);
router.post('/api/clientes/:id/paquetes', clientesController.crearPaquete);
router.get('/api/clientes/:id/paquetes/:paqueteId/rutas', clientesController.obtenerRutasDelPaquete);

export default router;