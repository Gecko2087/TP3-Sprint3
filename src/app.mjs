import express from "express";
import methodOverride from "method-override"; // Importar method-override
import { connectDB } from "./config/dbConfig.mjs";
import superheroRoutes from "./routes/superHeroRoutes.mjs";

const app = express();
const PORT = 3000;

// Configurar middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method")); // Habilitar method-override para sobrescribir métodos HTTP

// Configurar EJS como motor de vistas
app.set("view engine", "ejs");
app.set("views", "./src/views");

// Conectar a la base de datos
connectDB();

// Rutas principales
app.use("/api", superheroRoutes); // Registrar rutas principales

// Servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
