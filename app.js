import express from "express";
import { sequelize } from "./db/conexion.js";
//import hbs from 'hbs';
// import { engine } from 'express-handlebars';
import path from "path";
import expressLayouts from "express-ejs-layouts";
import { fileURLToPath } from "url";
import { recetaRoute } from "./routes/recetaRoute.js";
import { categoriaRoute } from "./routes/categoriaRoute.js";
import { PORT } from "./config/config.js";

const app = express();
const port = PORT || 3000;

// Configurar Handlebars como motor de plantillas
// app.engine('hbs', engine({ extname: '.hbs' }));
app.set("view engine", "ejs");
app.use(expressLayouts);
// Obtener la ruta absoluta al directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("views", path.join(__dirname, "view"));

// Middleware para manejar datos JSON en el cuerpo de la solicitud
app.use(express.json());

// Middleware para manejar datos URL-encoded en el cuerpo de la solicitud (como los que provienen de un formulario)
app.use(express.urlencoded({ extended: true }));


// Configurar rutas
app.use("/", categoriaRoute); // Rutas para categorías
app.use("/", recetaRoute); // Rutas para recetas

// Sincronizar la base de datos y luego iniciar el servidor
const main = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    await sequelize.sync({ force: false });

    app.listen(port, () => {
      console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(`Error ${error}`);
  }
};
main();
