import { db as conexion } from '../config/db.js';
import { ObjectId } from 'mongodb';

export async function obtenerTodosLosClientes() {
    try {
        const db = await conexion();
        const clientes = await db.collection('clientes').find().toArray();
        return clientes;
    } catch (error) {
        console.error('Error al obtener todos los clientes:', error);
        throw error;
    }
}

export async function crearCliente(cliente) {
    try {
        const db = await conexion();
        const resultado = await db.collection('clientes').insertOne(cliente);
        return resultado.insertedId;
    } catch (error) {
        console.error('Error al crear un cliente:', error);
        throw error;
    }
}

export async function eliminarCliente(id) {
    try {
        const db = await conexion();
        const clienteEliminado = await db.collection('clientes').findOne({ _id: new ObjectId(id) });
        if (!clienteEliminado) return null;

        await db.collection('clientes').deleteOne({ _id: new ObjectId(id) });
        return clienteEliminado;
    } catch (error) {
        console.error('Error al eliminar un cliente:', error);
        throw error;
    }
}

export async function obtenerPaquetesDelCliente(id) {
    try {
        const db = await conexion();
        const cliente = await db.collection('clientes').findOne({ _id: new ObjectId(id) });
        if (!cliente) {
            return null;
        }

        const paquetes = await db.collection('paquetes').find({ clienteId: new ObjectId(id) }).toArray();
        return paquetes;

    } catch (error) {
        console.error('Error al obtener los paquetes del cliente:', error);
        throw error;
    }
}

export async function crearPaquete(paquete) {
    try {
        const db = await conexion();
        paquete.clienteId = new ObjectId(paquete.clienteId);
        const resultado = await db.collection('paquetes').insertOne(paquete);
        return resultado.insertedId;
    } catch (error) {
        console.error('Error al crear un paquete:', error);
        throw error;
    }
}

export async function obtenerRutasDelPaquete(clienteId, paqueteId) {
    try {
        const db = await conexion();
        // Paquete por id y cliente
        const paquete = await db.collection('paquetes').findOne({ _id: new ObjectId(paqueteId), clienteId: new ObjectId(clienteId) });
        if (!paquete) {
            return null;
        }

        // Todas las categorías correspondientes a las rutas del paquete por Slug
        const categorias = await db.collection('categorias').find({ Slug: { $in: paquete.rutas } }).toArray();

        const rutas = [];
        for (const categoria of categorias) {
            const puntosDeInteres = await db.collection('rutas').find({ 'Categoría': categoria.Categoría }).toArray();
            rutas.push({
                ...categoria, // Copia todas las propiedades de la categoría
                puntosDeInteres // Agrega los puntos de interés de la categoría
            });
        }
        return rutas;

    } catch (error) {
        console.error('Error al obtener las rutas del paquete:', error);
        throw error;
    }
}