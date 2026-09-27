import * as rutasService from '../../services/rutas.service.js';

export async function buscarPuntosDeInteres(req, res) {
    try {
        const filtros = req.query;
        const puntosDeInteres = await rutasService.buscarPuntosDeInteres(filtros);
        res.status(200).json(puntosDeInteres);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al buscar puntos de interés' });
    }
}


export async function obtenerPuntoDeInteres(req, res) {
    try {
        const id = req.params.id;
        const puntoDeInteres = await rutasService.obtenerPuntoDeInteres(id);
        if (puntoDeInteres) {
            res.status(200).json(puntoDeInteres);
        } else {
            res.status(404).json({ mensaje: 'Punto de interés no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener el punto de interés' });
    }
}


export async function crearPuntoDeInteres(req, res) {
    try {
        const nuevoPunto = req.body;
        const nuevoId = await rutasService.crearPuntoDeInteres(nuevoPunto);
        res.status(201).json({ _id: nuevoId });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear el punto de interés' });
    }
}


export async function editarPuntoDeInteres(req, res) {
    try {
        const id = req.params.id;
        const puntoEditado = req.body;
        const cantidadEditados = await rutasService.editarPuntoDeInteres(id, puntoEditado);
        if (cantidadEditados > 0) {
            res.status(200).json({ mensaje: 'El cambio fue realizado exitosamente' });
        } else {
            res.status(404).json({ mensaje: 'Punto de interés no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al editar el punto de interés' });
    }
}


export async function eliminarPuntoDeInteres(req, res) {
    try {
        const { id } = req.params;
        const puntoEliminado = await rutasService.eliminarPuntoDeInteres(id);
        if (puntoEliminado) {
            res.status(200).json(puntoEliminado);
        } else {
            res.status(404).json({ mensaje: 'Punto de interés no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el punto de interés' });
    }
}
