import { crearPagina } from '../page/utils.js';


/* Funcion para la vista del INDEX */
export function index(categoriasAleatorias, puntoUno, puntoDos, puntoTres) {
    return crearPagina('Rutas Culturales de Argentina', 'css/estilos.css', '', '',
    /* html */ `
        <section class="banner-hero">
            <div class="banner-overlay"></div>
            <div class="contenedor banner-contenido">
                <h2>Descubrí la historia a través de nuestras rutas</h2>
                <p>Itinerarios patrimoniales, paisajes únicos y tradiciones vivas</p>
                <!-- Buscador Integrado -->
                <div class="buscador-box">
                    <div class="campo-busqueda">
                        <label for="busqueda">¿Qué provincia o localidad querés visitar?</label>
                        <input type="text" id="busqueda" name="busqueda"
                            placeholder="Ej: Misiones, Purmamarca, Salta...">
                    </div>
                    <button class="boton-buscar" data-bs-toggle="modal"
                        data-bs-target="#modalProximamente">Buscar rutas</button>
                </div>
            </div>
        </section>
        <!-- Seccion de rutas principales -->
        <div class="contenedor seccion">
            <div class="titulo-seccion">
                <h3>Rutas Culturales Principales</h3>
                <p>Elegí tu próximo itinerario histórico</p>
            </div>
           ${cardsAleatorias(categoriasAleatorias, puntoUno, puntoDos, puntoTres)} 
        </div>
        <!-- Actividades destacadas -->
        <section class="seccion-actividades">
            <div class="contenedor">
                <div class="titulo-seccion">
                    <h3>Experiencias y Patrimonio Vivo</h3>
                    <p>Fiestas, gastronomía y artesanías regionales asociadas a los itinerarios</p>
                </div>

                <div class="grilla-actividades">
                    <div class="tarjeta-actividad">
                        <div class="actividad-icono"><i class="bi bi-cup-hot color-icono" aria-hidden="true"></i></div>
                        <h4>Gastronomía Típica</h4>
                        <p>Saboreá platos autóctonos como el locro, empanadas regionales y la cocina guaraní.</p>
                    </div>
                    <div class="tarjeta-actividad">
                        <div class="actividad-icono"><i class="bi bi-balloon color-icono" aria-hidden="true"></i></div>
                        <h4>Fiestas y Festivales</h4>
                        <p>Participá de las celebraciones patronales, festivales del litoral y peñas folclóricas.</p>
                    </div>
                    <div class="tarjeta-actividad">
                        <div class="actividad-icono"><i class="bi bi-palette color-icono" aria-hidden="true"></i></div>
                        <h4>Artesanías y Talleres</h4>
                        <p>Conocé el trabajo en cerámica, telares ancestrales y la imaginería religiosa.</p>
                    </div>
                </div>
            </div>
        </section>
    `);
}


/*Funcion para la vista del DETALLE de un punto de interés*/
export function detalle(puntoDeInteres, categoriaSlug, categoriasAleatorias, puntoUno, puntoDos, puntoTres) {
    return crearPagina(`${puntoDeInteres.Nombre} - Rutas Culturales`, '../../css/estilos.css', 'contenedor', categoriaSlug,
    /* html */ `
        <div class="migas-pan contenedor">
             <a href="/">Inicio</a> &gt; 
             <a href="/rutas/${categoriaSlug}">${puntoDeInteres.Categoría}</a> &gt; 
             <span>${puntoDeInteres.Nombre}</span>
         </div>
        <!-- Encabezado destacado -->
        <section class="detalle-encabezado">
            <div class="detalle-encabezado-top">
                <div class="detalle-ubicacion">
                    <i class="bi bi-geo-alt color-icono" aria-hidden="true"></i> ${puntoDeInteres.Localidad}, ${puntoDeInteres.Provincia} — <span class="categoria-tag">${puntoDeInteres.Categoría}</span>
                </div>
                <!-- Botones de edición y borrado -->
                <div class="acciones-administracion">
                    <a href="/rutas/${categoriaSlug}/${puntoDeInteres._id}/editar" class="boton-editar"> Editar</a>
                    <button type="button" class="boton-eliminar" data-bs-toggle="modal" data-bs-target="#modalConfirmarEliminacion">Borrar</button>
                </div>
            </div>
            <h2 class="detalle-titulo">${puntoDeInteres.Nombre}</h2>
        </section>
        <!-- Imagen principal -->
        <div class="detalle-galeria">       
            <img src="${puntoDeInteres.Imagen}" alt="${puntoDeInteres.Nombre}" class="imagen-principal">
        </div>
        <!-- Página de detalle título y descripción -->
        <div class="detalle-grid">
            <div class="detalle-contenido-principal">

                <!-- Descripción -->
                ${seccionDetalle('Descripción Historica', puntoDeInteres.Descripción)}

                   <!-- monumentos -->
                ${seccionDetalle('Monumentos', puntoDeInteres.Monumentos)}

                 <!-- Museos -->
                ${seccionDetalle('Museos', puntoDeInteres.Museos)}

                <!-- Sitios de interés -->
                ${seccionDetalle('Sitios de interés', puntoDeInteres['Sitios de interés'])}

                <!-- Fiestas -->
                ${seccionDetalle('Fiestas', puntoDeInteres.Fiestas)}

                 <!-- festividades -->
                ${seccionDetalle('Festivales', puntoDeInteres.Festivales)}

                <!-- Comidas típicas -->
                ${seccionDetalle('Comidas típicas', puntoDeInteres['Comidas típicas'])}

                 <!-- Actividad Especifíca -->
                ${seccionDetalle('Actividad Especifíca', puntoDeInteres['Actividad especifíca'])}

                <!-- Fuente -->
                ${seccionDetalle('Fuente', puntoDeInteres.Fuente)}

                <!-- Mapa -->
                <section class="bloque-detalle" style="margin-top: 40px;">
                    <h3>Ubicación e Itinerario en Mapa</h3>
                    <p>Coordenadas: <strong>${puntoDeInteres.Latitud}, ${puntoDeInteres.Longitud}</strong> (Localidad: ${puntoDeInteres.Localidad})</p>
                    <div class="mapa-contenedor">
                        <a href="${puntoDeInteres.Link}" target="_blank" rel="noopener noreferrer" class="boton-mapa">
                            <i class="bi bi-map color-icono" aria-hidden="true"></i> Abrir recorrido en Google Maps
                        </a>
                    </div>
                </section>
            </div>

            <!-- Sidebar Lateral -->
            <aside class="detalle-sidebar">
                <div class="tarjeta-reserva">
                    <h3>¿Querés visitar ${puntoDeInteres.Localidad}?</h3>
                    <p class="precio-label">Acceso libre y público</p>
                    <hr>
                    <ul class="lista-chequeo">
                        <li><i class="bi bi-check-circle color-icono" aria-hidden="true"></i> Camino por Ruta Provincial 307</li>
                        <li><i class="bi bi-check-circle color-icono" aria-hidden="true"></i> Clima seco e ideal todo el año</li>
                        <li><i class="bi bi-check-circle color-icono" aria-hidden="true"></i> Red de artesanos y hospedajes</li>
                    </ul>
                    <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(puntoDeInteres.Localidad + ' ' + puntoDeInteres.Provincia)}" target="_blank" class="boton-accion-principal">Iniciar Viaje</a>
                </div>
            </aside>
        </div>

        <!-- Seccion cards recomendaciones -->
        <section class="seccion-interes">
            <div class="titulo-seccion">
                <h2>También te puede interesar</h2>
                <p>Otros itinerarios culturales sugeridos para vos</p>
            </div>

            ${cardsAleatorias(categoriasAleatorias, puntoUno, puntoDos, puntoTres)}
        </section>

        <!-- Modal de confirmación de eliminación -->
        <div class="modal fade todas-las-modales" id="modalConfirmarEliminacion" tabindex="-1" role="dialog"
            aria-labelledby="modalConfirmarEliminacionLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content text-center p-4 shadow-lg">
                    <h2 class="h6 fw-bold mb-3" id="modalConfirmarEliminacionLabel">¿Desea borrar el punto de interés?</h2>
                    <form action="/rutas/${categoriaSlug}/${puntoDeInteres._id}/eliminar" method="POST" class="d-flex justify-content-center gap-2">
                        <button type="button" class="btn boton-editar" data-bs-dismiss="modal">Cancelar</button>
                        <button type="submit" class="btn boton-eliminar" id="confirmarEliminacion">Borrar</button>
                    </form>
                </div>
            </div>
        </div>
    `);
}


/* Formulario para editar un punto de interés */
export function formularioEditar(puntoDeInteres, categoriaSlug, categorias) {
    return crearPagina('Cargar Punto Cultural - Rutas Culturales', '../../../css/estilos.css', 'formulario-contenedor', categoriaSlug,
        /* html */ `
        <div class="formulario-encabezado">
            <h2>Editar Punto o Ruta Cultural</h2>
            <p>Editá el itinerario, ciudad o atractivo histórico al patrimonio cultural argentino.</p>
        </div>
        ${formulario(puntoDeInteres, `/rutas/${categoriaSlug}/${puntoDeInteres._id}/editar`, categorias)}
        `
    );
}


/* Formulario para crear un nuevo punto de interés */
export function formularioCrear(categorias) {
    return crearPagina('Cargar Punto Cultural - Rutas Culturales', '../../css/estilos.css', 'formulario-contenedor', '',
        /* html */ `
        <div class="formulario-encabezado">
            <h2>Cargar Nuevo Punto o Ruta Cultural</h2>
            <p>Sumá un nuevo itinerario, ciudad o atractivo histórico al patrimonio cultural argentino.</p>
        </div>
        ${formulario({}, `/rutas/crear`, categorias)}
        `
    );
}


/* Función que genera el formulario HTML para crear o editar un punto de interés */
function formulario(puntoDeInteres, accion, categorias) {
    const html = /* html */ `
        <form action="${accion}" method="POST" class="formulario-card">
            <!-- Campos de información básica -->
            <fieldset class="formulario-grupo">
                <legend>1. Información General</legend>

                <div class="campo-doble">
                    <div class="campo">
                        <label for="titulo">Título del Punto Cultural / Ciudad *</label>
                        <input type="text" id="titulo" name="Nombre" value="${puntoDeInteres?.Nombre ?? ''}" placeholder="Ej: Concepción de la Sierra" required>
                    </div>

                    <div class="campo">
                        <label for="seccion">Ruta Turística / Categoría *</label>
                        <select id="seccion" name="categoriaSlug" required>
                            <option value="" disabled ${!puntoDeInteres?.Categoría ? 'selected' : ''}>Seleccioná una ruta...</option>
                            ${categorias.map(categoria => /* html */ `
                                <option value="${categoria.Slug}" ${puntoDeInteres?.Categoría === categoria.Categoría ? 'selected' : ''}>${categoria.Categoría}</option>
                            `).join('')}
                        </select>
                    </div>
                </div>

                <div class="campo-doble">
                    <div class="campo">
                        <label for="provincia">Provincia *</label>
                        <input type="text" id="provincia" name="Provincia" value="${puntoDeInteres?.Provincia ?? ''}" placeholder="Ej: Misiones" required>
                    </div>

                    <div class="campo">
                        <label for="localidad">Localidad *</label>
                        <input type="text" id="localidad" name="Localidad" value="${puntoDeInteres?.Localidad ?? ''}" placeholder="Ej: Concepción de la Sierra"
                            required>
                    </div>
                </div>

                <div class="campo">
                    <label for="descripcion">Descripción Histórica / Turística *</label>
                    <textarea id="descripcion" name="Descripción" rows="4"
                        placeholder="Ubicada en el sur de la Provincia de Misiones, fue fundada en el año 1619..."
                        required>${puntoDeInteres?.Descripción ?? ''}</textarea>
                </div>
            </fieldset>

            <!-- Campos de atractivos y cultural -->
            <fieldset class="formulario-grupo">
                <legend>2. Atractivos y Identidad Cultural</legend>
                <div class="campo-doble">
                    <div class="campo">
                        <label for="monumentos">Monumentos</label>
                        <input type="text" id="monumentos" name="Monumentos" value="${puntoDeInteres?.Monumentos ?? ''}"
                            placeholder="Ej: Monumento a la Independencia">
                    </div>
                    <div class="campo">
                        <label for="museos">Museos</label>
                        <input type="text" id="museos" name="Museos" value="${puntoDeInteres?.Museos ?? ''}"
                            placeholder="Ej: Museo histórico de Concepción de la Sierra">
                    </div>
                </div>
                <div class="campo">
                    <label for="sitios">Sitios de Interés</label>
                    <input type="text" id="sitios" name="Sitios de interés" value="${puntoDeInteres['Sitios de interés'] ?? ''}" placeholder="Ej: Ruinas de San Ignacio Miní">
                </div>
                <div class="campo-doble">
                    <div class="campo">
                        <label for="fiestas">Fiestas</label>
                        <input type="text" id="fiestas" name="Fiestas" value="${puntoDeInteres?.Fiestas ?? ''}" placeholder="Ej: Fiesta Nacional del Chamamé">
                    </div>
                    <div class="campo">
                        <label for="festivales">Festivales</label>
                        <input type="text" id="festivales" name="Festivales" value="${puntoDeInteres?.Festivales ?? ''}" placeholder="Ej: Festival del tarefero">
                    </div>
                </div>
                <div class="campo">
                    <label for="comidas">Comidas Típicas y Gastronomía</label>
                    <input type="text" id="comidas" value="${puntoDeInteres['Comidas típicas'] ?? ''}" name="Comidas típicas"
                        placeholder="Ej: Tereré, helado de yerba mate, alfajores con gusto a yerba mate...">
                </div>
                <div class="campo-doble">
                    <div class="campo">
                        <label for="actividades">Actividades Específicas</label>
                        <input type="text" id="actividades" name="Actividades específicas" value="${puntoDeInteres['Actividades específicas'] ?? ''}"
                            placeholder="Ej: Desfile de Carnaval, Feria artesanal...">
                    </div>
                    <div class="campo">
                        <label for="fuente">Fuente / Institución Relevadora</label>
                        <input type="text" id="fuente" name="Fuente" value="${puntoDeInteres?.Fuente ?? ''}"
                            placeholder="Ej: Facultad de Agronomía UBA / SInCA">
                    </div>
                </div>
            </fieldset>

            <!-- Campos de multimedia y mapa -->
            <fieldset class="formulario-grupo">
                <legend>3. Ubicación y Multimedia</legend>
                <div class="campo">
                    <label for="imagen">URL de la Imagen Destacada</label>
                    <input type="url" id="imagen" name="Imagen" value="${puntoDeInteres?.Imagen ?? ''}" placeholder="https://dominio.com/imagen.jpg" required>
                </div>
                <div class="campo-doble">
                    <div class="campo">
                        <label for="latitud">Latitud (Coordenadas)</label>
                        <input type="number" step="any" id="latitud" name="Latitud" value="${puntoDeInteres?.Latitud ?? ''}" placeholder="Ej: -27.9798" required>
                    </div>
                    <div class="campo">
                        <label for="longitud">Longitud (Coordenadas)</label>
                        <input type="number" step="any" id="longitud" name="Longitud" value="${puntoDeInteres?.Longitud ?? ''}" placeholder="Ej: -55.5186" required>
                    </div>
                </div>
                <small class="ayuda-campo">Las coordenadas generarán automáticamente el link al mapa dinámico de Google
                    Maps.</small>
            </fieldset>

            <!-- Botones de acción -->
            <div class="formulario-acciones">
                <button type="submit" class="boton-guardar">Guardar Punto Cultural</button>
                <a href="/" class="boton-cancelar">Cancelar</a>
            </div>
        </form>
    `;

    return html;
}


/*Funcion para la vista del itinerario de la ruta*/
export function ruta(categoria, puntosDeInteres, imagenPrincipal, pagina, limite, totalPaginas) {
    return crearPagina(`${categoria.Categoría} - Rutas Culturales`, '../css/estilos.css', 'contenedor', categoria.Slug,
    /* html */ `
        <div class="migas-pan contenedor">
            <a href="/">Inicio</a> &gt; 
            <span>${categoria.Categoría}</span>
        </div>

        <!-- Encabezado -->
        <section class="detalle-encabezado">
            <div class="detalle-ubicacion">
                <i class="bi bi-geo-alt color-icono" aria-hidden="true"></i> ${categoria.Provincias} — <span class="categoria-tag">Ruta Turística</span>
            </div>
            <h2 class="detalle-titulo">${categoria.Categoría}</h2>
        </section>

        <!-- Imagen principal -->
        <div class="detalle-galeria">
            <img src="${imagenPrincipal}" alt="${categoria.Categoría}" class="imagen-principal">
        </div>

        <!-- Descripción de la ruta -->
        <section class="bloque-detalle">
            <h3>Descripción de la Ruta</h3>
            <p>${categoria.DescripciónLarga}</p>
        </section>

        <!-- Contenedor -->
        <section class="seccion-tabs" id="itinerario">
            
            <div class="tabs-encabezado">
                <div class="tab-btn activo"><i class="bi bi-geo-alt color-icono" aria-hidden="true"></i> Itinerario</div>
            </div>

            <!-- Contenido del itinerario, acordeón -->
            <div id="tab-itinerario" class="tab-contenido activo">
                <div class="itinerario-lista">
                    ${puntosDeInteres.map((punto, index) => /* html */ `
                        <details class="acordeon-item" ${index === 0 ? 'open' : ''}>
                            <summary class="acordeon-titulo">
                                <span class="paso-numero">${index + (pagina - 1) * limite + 1}</span>
                                <h4>${punto.Nombre}</h4>
                                <span class="acordeon-sub">${punto.Localidad}</span>
                            </summary>
                            <div class="acordeon-cuerpo">
                                <div class="acordeon-grid">
                                    <img src="${punto.Imagen}" alt="${punto.Nombre}" class="acordeon-thumb">
                                    <div class="acordeon-info">
                                        <p>${punto.Descripción && punto.Descripción !== 's/d' ? punto.Descripción : categoria.Descripción}</p>
                                        <a href="/rutas/${categoria.Slug}/${punto._id}" class="boton-ver-mas">Ver ficha completa →</a>
                                    </div>
                                </div>
                            </div>
                        </details>
                    `).join('')}
                </div>

                <!-- Paginado -->
                <div class="paginacion">
                    ${botonesPaginacion(pagina, totalPaginas)}
                </div>
            </div>
        </section>
    `);
}

/* Función para generar los botones de paginación */
function botonesPaginacion(pagina, totalPaginas) {
    const paginaAnterior = pagina - 1;
    const paginaSiguiente = pagina + 1;
    let html = '';

    html += /* html */
        `<a class="pag-btn" ${pagina === 1 ? 'aria-disabled="true" tabindex="-1"' : `href="?pagina=${paginaAnterior}#itinerario"`}>&laquo; <span class="pag-texto">Anterior</span></a>`;

    for (let n = 1; n <= totalPaginas; n++) {
        if (n === 1 || n === totalPaginas || (n >= paginaAnterior && n <= paginaSiguiente)) {
            html +=  /* html */
                `<a class="pag-numero ${n === pagina ? 'activo' : ''}" href="?pagina=${n}#itinerario">${n}</a>`;
        } else if (n === paginaAnterior - 1 || n === paginaSiguiente + 1) {
            html += /* html */ `<span class="pag-puntos">&hellip;</span>`;
        }
    }

    html += /* html */
        `<a class="pag-btn" ${pagina === totalPaginas ? 'aria-disabled="true" tabindex="-1"' : `href="?pagina=${paginaSiguiente}#itinerario"`}><span class="pag-texto">Siguiente</span> &raquo;</a>`;

    return html;
}


function cardsAleatorias(categorias, puntoUno, puntoDos, puntoTres) {
    const html = /* html */ `
         <div class="grilla-rutas">
            <article class="tarjeta-ruta">
                <div class="tarjeta-imagen">
                    <img src="${puntoUno.Imagen}" alt="${puntoUno.Nombre}">
                    <span class="etiqueta-categoria">${categorias[0].Etiqueta}</span>
                </div>
                <div class="tarjeta-cuerpo">
                    <span class="tarjeta-ubicacion">${categorias[0].Provincias}</span>
                    <h3>${categorias[0].Categoría}</h3>
                    <p>${categorias[0].Descripción}</p>
                    <a href="/rutas/${categorias[0].Slug}" class="boton-detalle">Ver itinerario</a>
                </div>
            </article>

            <article class="tarjeta-ruta">
                <div class="tarjeta-imagen">
                    <img src="${puntoDos.Imagen}" alt="${puntoDos.Nombre}">
                    <span class="etiqueta-categoria">${categorias[1].Etiqueta}</span>
                </div>
                <div class="tarjeta-cuerpo">
                    <span class="tarjeta-ubicacion">${categorias[1].Provincias}</span>
                    <h3>${categorias[1].Categoría}</h3>
                    <p>${categorias[1].Descripción}</p>
                    <a href="/rutas/${categorias[1].Slug}" class="boton-detalle">Ver itinerario</a>
                </div>
            </article>

            <article class="tarjeta-ruta">
                <div class="tarjeta-imagen">
                    <img src="${puntoTres.Imagen}" alt="${puntoTres.Nombre}">
                    <span class="etiqueta-categoria">${categorias[2].Etiqueta}</span>
                </div>
                <div class="tarjeta-cuerpo">
                    <span class="tarjeta-ubicacion">${categorias[2].Provincias}</span>
                    <h3>${categorias[2].Categoría}</h3>
                    <p>${categorias[2].Descripción}</p>
                    <a href="/rutas/${categorias[2].Slug}" class="boton-detalle">Ver itinerario</a>
                </div>
            </article>
        </div>   
    `;
    return html;
}

/* Funcion para ocultar contenido en caso de que no exista */
function seccionDetalle(titulo, contenido) {
    if (!contenido || contenido === 's/d') {
        return '';
    }

    const html = /* html */ `
        <section class="bloque-detalle">
            <h3>${titulo}</h3>
            <p>${contenido}</p>
        </section>
    `;
    return html;
}
