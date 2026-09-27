import * as rutasView from '../views/rutas.view.js';
import * as rutasService from '../../services/rutas.service.js';
import { pagina404, pagina500 } from '../page/utils.js';

export async function index(req, res) {
    try {
        const categoriasAleatorias = await rutasService.obtenerCategoriasAleatorias(3);
        const puntoUno = await rutasService.obtenerPuntoDeInteresAleatoria(categoriasAleatorias[0].Categoría);
        const puntoDos = await rutasService.obtenerPuntoDeInteresAleatoria(categoriasAleatorias[1].Categoría);
        const puntoTres = await rutasService.obtenerPuntoDeInteresAleatoria(categoriasAleatorias[2].Categoría);

        res.send(rutasView.index(categoriasAleatorias, puntoUno, puntoDos, puntoTres));
    } catch (error) {
        console.error(error);
        res.status(500).send(pagina500('css/estilos.css'));
    }
}


export async function detalle(req, res) {
    try {
        const ruta = await rutasService.obtenerPuntoDeInteres(req.params.id);
        if (ruta) {
            const categoriasAleatorias = await rutasService.obtenerCategoriasAleatorias(3);
            const puntoUno = await rutasService.obtenerPuntoDeInteresAleatoria(categoriasAleatorias[0].Categoría);
            const puntoDos = await rutasService.obtenerPuntoDeInteresAleatoria(categoriasAleatorias[1].Categoría);
            const puntoTres = await rutasService.obtenerPuntoDeInteresAleatoria(categoriasAleatorias[2].Categoría);

            res.send(rutasView.detalle(ruta, req.params.categoria, categoriasAleatorias, puntoUno, puntoDos, puntoTres));
        } else {
            res.status(404).send(pagina404('../../css/estilos.css'));
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(pagina500('../../css/estilos.css'));
    }
}


export async function formularioEditar(req, res) {
    try {
        const puntoDeInteres = await rutasService.obtenerPuntoDeInteres(req.params.id);
        if (puntoDeInteres) {
            const categorias = await rutasService.obtenerTodasLasCategorias();
            res.send(rutasView.formularioEditar(puntoDeInteres, req.params.categoria, categorias));
        } else {
            res.status(404).send(pagina404('../../../css/estilos.css'));
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(pagina500('../../../css/estilos.css'));
    }
}


export async function formularioCrear(req, res) {
    try {
        const categorias = await rutasService.obtenerTodasLasCategorias();
        res.send(rutasView.formularioCrear(categorias));
    } catch (error) {
        console.error(error);
        res.status(500).send(pagina500('../../css/estilos.css'));
    }
}

export async function crearPuntoInteres(req, res) {
    try {
        const datos = req.body; // este req.body es por el post

        const categoria = await rutasService.obtenerCategoria(datos.categoriaSlug);
        datos.Categoría = categoria.Categoría;
        datos.Link = `https://www.google.com/maps?q=${datos.Latitud},${datos.Longitud}`;

        const id = await rutasService.crearPuntoDeInteres(datos);

        res.redirect(`/rutas/${categoria.Slug}/${id}`); // Redirige a la URL de detalle del nuevo punto de interés

    } catch (error) {
        console.error(error);
        res.status(500).send(pagina500('../../css/estilos.css'));
    }
}
export async function editarPuntoInteres(req, res) {
    try {
        const id = req.params.id; // este req.params.id es por la URL   
        const datos = req.body; // este req.body es por el post

        const categoria = await rutasService.obtenerCategoria(datos.categoriaSlug);
        datos.Categoría = categoria.Categoría;
        datos.Link = `https://www.google.com/maps?q=${datos.Latitud},${datos.Longitud}`;

        const editado = await rutasService.editarPuntoDeInteres(id, datos);
        res.redirect(`/rutas/${categoria.Slug}/${id}`); // Redirige a la URL de detalle del punto de interés editado

    } catch (error) {
        console.error(error);
        res.status(500).send(pagina500('../../../css/estilos.css'));
    }
}

export async function eliminarPuntoInteres(req, res) {
    try {
        const id = req.params.id;
        const eliminado = await rutasService.eliminarPuntoDeInteres(id);
        res.redirect(`/rutas/${req.params.categoria}`); // Redirige a la vista de la ruta después de eliminar el punto de interés
    } catch (error) {
        console.error(error);
        res.status(500).send(pagina500('../../../css/estilos.css'));
    }
}

export async function ruta(req, res) {
    try {
        const categoriaSlug = req.params.categoria;
        const pagina = parseInt(req.query.pagina) || 1;
        const limite = 8;

        const categoria = await rutasService.obtenerCategoria(categoriaSlug);
        if (categoria) {
            const filtros = { Categoria: categoria.Categoría, pagina, limite };
            const puntosDeInteres = await rutasService.buscarPuntosDeInteres(filtros);

            const total = await rutasService.enumeracionPuntosDeInteres(categoria.Categoría);
            const totalPaginas = Math.max(Math.ceil(total / limite), 1);

            const indiceAleatorio = Math.floor(Math.random() * puntosDeInteres.length);
            const imagenPrincipal = puntosDeInteres[indiceAleatorio].Imagen;

            res.send(rutasView.ruta(categoria, puntosDeInteres, imagenPrincipal, pagina, limite, totalPaginas));
        } else {
            res.status(404).send(pagina404('../css/estilos.css'));
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(pagina500('../css/estilos.css'));
    }
}
