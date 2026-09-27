import { db as conexion } from '../config/db.js';
import { ObjectId } from 'mongodb';

export async function buscarPuntosDeInteres(filtros = {}) {
    try {
        const db = await conexion();
        const filtrosDb = {};

        const nDePagina = parseInt(filtros.pagina) ?? 1;
        const limite = parseInt(filtros.limite) ?? 10;
        const skip = (nDePagina - 1) * limite;

        if (filtros.Nombre) {
            filtrosDb.Nombre = filtros.Nombre;
        }
        if (filtros.Provincia) {
            filtrosDb.Provincia = filtros.Provincia;
        }
        if (filtros.Categoria) {
            filtrosDb['Categoría'] = filtros.Categoria;
        }

        const puntosDeInteres = await db.collection('rutas').find(filtrosDb).skip(skip).limit(limite).toArray();
        return puntosDeInteres;

    } catch (error) {
        console.error('Error al buscar puntos de interés:', error);
        throw error;
    }
}

export async function enumeracionPuntosDeInteres(categoria) {
    try {
        const db = await conexion();
        const filtrosDb = { 'Categoría': categoria };
        return await db.collection('rutas').countDocuments(filtrosDb);
    } catch (error) {
        console.error('Error al contar puntos de interés:', error);
        throw error;
    }
}

export async function obtenerPuntoDeInteresAleatoria(categoria) {
    try {
        const db = await conexion();
        // Pipeline define como buscar con agregados en MongoDB
        const pipeline = [
            {
                $match: { 'Categoría': categoria } // match define el filtro
            },
            {
                $sample: { size: 1 } // el sample de MongoDB selecciona un documento aleatorio
            }
        ];
        
        // Funcion de MongoDB para buscar con un pipeline
        const [puntoDeInteres] = await db.collection('rutas').aggregate(pipeline).toArray();
        return puntoDeInteres;
    } catch (error) {
        console.error('Error al obtener punto de interés aleatorio:', error);
        throw error;
    }
}

export async function obtenerCategoriasAleatorias(cantidad) {
    try {
        const db = await conexion();
        const pipeline = [
            {
                $sample: { size: cantidad }
            }
        ];
        const categorias = await db.collection('categorias').aggregate(pipeline).toArray();
        return categorias;
    } catch (error) {
        console.error('Error al obtener categoría aleatoria:', error);
        throw error;
    }
}

export async function obtenerPuntoDeInteres(id) {
    if (!ObjectId.isValid(id)) {
        return null;
    }
    try {
        const db = await conexion();
        const puntoDeInteres = await db.collection('rutas').findOne({ _id: new ObjectId(id) });
        return puntoDeInteres;
    } catch (error) {
        console.error('Error al obtener punto de interés:', error);
        throw error;
    }
}

export async function crearPuntoDeInteres(nuevoPuntoDeInteres) {
    if (nuevoPuntoDeInteres._id) {
        throw new Error('El nuevo punto de interés no debe tener un _id');
    }
    try {
        const db = await conexion();
        const resultado = await db.collection('rutas').insertOne(nuevoPuntoDeInteres);
        return resultado.insertedId;
    } catch (error) {
        console.error('Error al crear punto de interés:', error);
        throw error;
    }
}

export async function editarPuntoDeInteres(id, puntoEditado) {
    try {
        const db = await conexion();
        const resultado = await db.collection('rutas').replaceOne({ _id: new ObjectId(id) }, puntoEditado);
        return resultado.matchedCount;
    } catch (error) {
        console.error('Error al editar punto de interés:', error);
        throw error;
    }
}

export async function eliminarPuntoDeInteres(id) {
    try {
        const db = await conexion();
        const puntoEliminado = await obtenerPuntoDeInteres(id);
        await db.collection('rutas').deleteOne({ _id: new ObjectId(id) });
        return puntoEliminado;
    } catch (error) {
        console.error('Error al eliminar punto de interés:', error);
        throw error;
    }
}

export async function obtenerTodasLasCategorias() {
    try {
        const db = await conexion();
        const categorias = await db.collection('categorias').find().toArray();
        return categorias;
    } catch (error) {
        console.error('Error al obtener todas las categorías:', error);
        throw error;
    }
}

export async function obtenerCategoria(slug) {
    try {
        const db = await conexion();
        const categoria = await db.collection('categorias').findOne({ Slug: slug });
        return categoria;
    } catch (error) {
        console.error('Error al obtener categoría:', error);
        throw error;
    }
}
