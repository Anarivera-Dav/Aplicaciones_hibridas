import * as clientesService from '../../services/clientes.service.js';

export async function obtenerTodosLosClientes(req, res) {
    try {
        const clientes = await clientesService.obtenerTodosLosClientes();
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener todos los clientes' });
    }
}

export async function crearCliente(req, res) {
    try {
        const clienteId = await clientesService.crearCliente(req.body);
        res.status(201).json({ id: clienteId });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear un cliente' });
    }
}

export async function eliminarCliente(req, res) {
    try {
        const clienteEliminado = await clientesService.eliminarCliente(req.params.id);
        if (clienteEliminado) {
            res.json(clienteEliminado);
        } else {
            res.status(404).json({ error: 'Cliente no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar un cliente' });
    }
}

export async function obtenerPaquetesDelCliente(req, res) {
    try {
        const paquetes = await clientesService.obtenerPaquetesDelCliente(req.params.id);
        if (paquetes) {
            res.json(paquetes);
        } else {
            res.status(404).json({ error: 'Cliente no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los paquetes del cliente' });
    }
}

export async function crearPaquete(req, res) {
    try {
        const paquete = req.body;
        paquete.clienteId = req.params.id;
        const paqueteId = await clientesService.crearPaquete(paquete);
        res.status(201).json({ id: paqueteId });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear un paquete' });
    }
}

export async function obtenerRutasDelPaquete(req, res) {
    try {
        const clienteId = req.params.id;
        const paqueteId = req.params.paqueteId;
        const rutas = await clientesService.obtenerRutasDelPaquete(clienteId, paqueteId);
        if (rutas) {
            res.json(rutas);
        } else {
            res.status(404).json({ error: 'Paquete no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las rutas del paquete' });
    }
}