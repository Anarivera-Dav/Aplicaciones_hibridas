# Rutas Turísticas

App para gestionar rutas turísticas y culturales de Argentina (jesuíticas, independencia, calchaquíes, yerba mate, monumentos), con un sitio web para navegarlas y una API para manejar los datos.


Server en `http://localhost:3333`.

## Rutas Web

| Path | Descripción |
|---|---|
| `GET /` | Home, muestra categorías y puntos de interés destacados |
| `GET /rutas/crear` | Formulario para cargar un nuevo punto de interés |
| `POST /rutas/crear` | Crea el punto de interés cargado en el formulario |
| `GET /rutas/:categoria` | Listado de puntos de interés de una categoría |
| `GET /rutas/:categoria/:id` | Detalle de un punto de interés puntual |
| `GET /rutas/:categoria/:id/editar` | Formulario para editar un punto de interés |
| `POST /rutas/:categoria/:id/editar` | Guarda los cambios del punto de interés |
| `POST /rutas/:categoria/:id/eliminar` | Elimina el punto de interés |

## API

**Rutas / puntos de interés**

| Path | Descripción |
|---|---|
| `GET /api/rutas` | Busca puntos de interés (con filtros) |
| `GET /api/rutas/:id` | Trae un punto de interés por id |
| `POST /api/rutas` | Crea un punto de interés |
| `PUT /api/rutas/:id` | Edita un punto de interés |
| `DELETE /api/rutas/:id` | Elimina un punto de interés |

**Clientes**

| Path | Descripción |
|---|---|
| `GET /api/clientes` | Lista todos los clientes |
| `POST /api/clientes` | Crea un cliente |
| `DELETE /api/clientes/:id` | Elimina un cliente |
| `GET /api/clientes/:id/paquetes` | Lista los paquetes de un cliente |
| `POST /api/clientes/:id/paquetes` | Crea un paquete para un cliente |
| `GET /api/clientes/:id/paquetes/:paqueteId/rutas` | Lista las rutas incluidas en un paquete |

## Stack

Node.js + Express + MongoDB.
