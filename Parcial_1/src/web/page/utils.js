export function crearPagina(titulo, css, mainClase, categoriaSlug, contenido) {
    return /* html */ `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <!-- Carga de tipografía Urbanist desde Google Fonts -->
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,300;0,400;0,600;0,700;1,400&display=swap" rel="stylesheet">
            <title>${titulo}</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
            <link rel="stylesheet" href="${css}">
        </head>
        <body>
            <!-- 1. BARRA DE NAVEGACIÓN -->
            <header class="navegacion">
                <div class="contenedor navegacion-contenido">
                    <h1 class="logo-titulo">
                        <a href="/" class="logo">
                            <span class="logo-criterion">RUTAS CULTURALES</span>
                            <span class="logo-sub">ARGENTINA</span>
                        </a>
                    </h1>

                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuPrincipal"
                        aria-controls="menuPrincipal" aria-expanded="false" aria-label="Botón de navegación">
                        <span class="navbar-toggler-icon">
                            <span class="visually-hidden">Botón de menú hamburguesa</span>
                        </span>
                    </button>

                    <nav class="menu collapse navbar-collapse" id="menuPrincipal">
                        <a href="/rutas/jesuitas" ${categoriaSlug === 'jesuitas' ? 'class="pagina-actual"' : ''}>Jesuitas</a>
                        <a href="/rutas/independencia" ${categoriaSlug === 'independencia' ? 'class="pagina-actual"' : ''}>Independencia</a>
                        <a href="/rutas/calchaquies" ${categoriaSlug === 'calchaquies' ? 'class="pagina-actual"' : ''}>Calchaquíes</a>
                        <a href="/rutas/yerba-mate" ${categoriaSlug === 'yerba-mate' ? 'class="pagina-actual"' : ''}>Yerba Mate</a>
                        <a href="/rutas/monumentos" ${categoriaSlug === 'monumentos' ? 'class="pagina-actual"' : ''}>Monumentos</a>

                        <a href="/rutas/crear" class="boton-crear">+ Nueva Ruta</a>
                    </nav>
                </div>
            </header>

            <!-- 2. CONTENIDO PRINCIPAL -->
            <main class="${mainClase}">
                ${contenido}
    
                <!-- Modal en desarrollo -->
                <div class="modal fade todas-las-modales" id="modalProximamente" tabindex="-1"
                    role="dialog" aria-labelledby="modalProximamenteLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content text-center p-4 shadow-lg">

                            <h2 class="h4 fw-bold mb-3" id="modalProximamenteLabel">
                                En Desarrollo
                            </h2>

                            <div class="mb-4">
                                <p class="m-0 fw-medium fs-6">
                                    Próximamente en funcionamiento
                                </p>
                                <small class="d-block mt-1 opacity-75">
                                    Estamos trabajando para habilitar esta sección muy pronto.
                                </small>
                            </div>

                            <div>
                                <button type="button" class="btn boton-buscar px-4" data-bs-dismiss="modal">
                                    Entendido
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </main>

            <!-- 5. FOOTER -->
            <footer class="pie-pagina">
                <div class="contenedor pie-contenido">
                    <div class="pie-columna">
                        <h3>Rutas Culturales ARG</h3>
                        <p>Proyecto para la preservación y divulgación del patrimonio histórico y geográfico argentino.</p>
                    </div>
                    <div class="pie-columna">
                        <h4>Itinerarios</h4>
                        <ul>
                            <li><a href="/rutas/jesuitas">Ruinas Jesuíticas</a></li>
                            <li><a href="/rutas/independencia">Ruta de la Independencia</a></li>
                            <li><a href="/rutas/calchaquies">Valles Calchaquíes</a></li>
                            <li><a href="/rutas/yerba-mate">Ruta de la Yerba Mate</a></li>
                            <li><a href="/rutas/monumentos">Monumentos y lugares históricos</a></li>
                        </ul>
                    </div>
                    <div class="pie-columna">
                        <h4>Parcial 1 Aplicaciones híbridas</h4>
                        <p>Node.js, Express & MongoDB</p>
                        <p>DWM4AV</p>
                    </div>
                </div>
                <div class="pie-copy">
                <p><strong>Alumna:</strong> Ana Belén Rivera</p>
                <p>&copy; 2026 Rutas Culturales Argentina</p>
                </div>
            </footer>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
        </body>
        </html>
    `;
}

export function pagina404(css){
    const rutas = ['jesuitas', 'independencia', 'calchaquies', 'yerba-mate', 'monumentos'];
    const rutaAleatoria = rutas[Math.floor(Math.random() * rutas.length)];

    return crearPagina('Página no encontrada', css, 'pagina-error', null, 
        /*html*/`
              <div class="error-card">
            <div class="error-badge">404 PÁGINA NO ENCONTRADA</div>
            
            <div class="error-imagen-wrapper">
                <img src="https://http.dog/404.jpg" alt="Perrito 404 HTTP Dog" class="error-imagen">
            </div>

            <div class="error-contenido">
                <h2 class="error-titulo">Parece que te saliste del mapa</h2>
                <p class="error-descripcion">
                    El camino o punto de interés que estás buscando no existe o fue movido de itinerario.
                </p>

                <div class="error-acciones">
                    <a href="/" class="btn-error btn-principal">Volver al Inicio</a>
                    <a href="/rutas/${rutaAleatoria}" class="btn-error btn-secundario">Explorar Rutas</a>
                </div>
            </div>
        </div>
                
        `
    )
}

export function pagina500(css){
    const rutas = ['jesuitas', 'independencia', 'calchaquies', 'yerba-mate', 'monumentos'];
    const rutaAleatoria = rutas[Math.floor(Math.random() * rutas.length)];

    return crearPagina('Error del servidor', css, 'pagina-error', null,
        /*html*/`
              <div class="error-card">
            <div class="error-badge">500 ERROR DEL SERVIDOR</div>

            <div class="error-imagen-wrapper">
                <img src="https://http.dog/500.jpg" alt="Error HTTP 500" class="error-imagen">
            </div>

            <div class="error-contenido">
                <h2 class="error-titulo">Algo salió mal</h2>
                <p class="error-descripcion">
                    Ocurrió un error inesperado al procesar tu solicitud. Volvé a intentarlo más tarde.
                </p>

                <div class="error-acciones">
                    <a href="/" class="btn-error btn-principal">Volver al Inicio</a>
                    <a href="/rutas/${rutaAleatoria}" class="btn-error btn-secundario">Explorar Rutas</a>
                </div>
            </div>
        </div>
        `
    )
}
