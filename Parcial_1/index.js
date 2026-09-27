import express from 'express';
import dotenv from 'dotenv';
import rutasApiRoute from './src/api/routes/rutas.route.js'; // Importación de rutas API
import rutasWebRoute from './src/web/routes/rutas.route.js'; // Importación de rutas web
import clientesRoute from './src/api/routes/clientes.route.js'; // Importación de rutas de clientes

dotenv.config(); // variable de entorno

const app = express();
const port = 3333;

//Los Middlewares

// Si la URL termina en "/" (y no es la home), redirige a la misma URL sin esa barra
app.use((req, res, next) => {
  if (req.path.endsWith('/')) {
    res.redirect(301, req.path.slice(0, -1));
  } else {
    next();
  }
});
app.use('/', express.static('public')); //Middleware para servir archivos estáticos desde la carpeta "public"
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Rutas
app.use(rutasApiRoute);
app.use(rutasWebRoute);
app.use(clientesRoute);

//Inicio de servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});