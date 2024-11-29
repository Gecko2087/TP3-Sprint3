import express from "express";
import {
  obtenerSuperheroePorIdController,
  obtenerTodosLosSuperheroeController,
  crearSuperheroeController,
  actualizarSuperheroeController,
  eliminarSuperheroeController,
} from "../controllers/superheroesController.mjs";

const router = express.Router();

// Rutas para gestionar superhéroes
router.get("/heroes", obtenerTodosLosSuperheroeController); // Obtener todos los superhéroes

router.get("/heroes/agregar", (req, res) => {
  res.render("addSuperhero", { errores: [], superheroe: {} }); // Renderizar el formulario vacío
});
router.post("/heroes/agregar", crearSuperheroeController); // Procesar el formulario de agregar

router.get("/heroes/:id", obtenerSuperheroePorIdController); // Obtener un superhéroe por ID

router.get("/heroes/:id/editar", async (req, res) => {
  const { id } = req.params;

  try {
    const superheroe = await obtenerSuperheroePorIdController(req, res, true); // Obtener datos sin renderizar JSON
    if (!superheroe) {
      return res.status(404).send("Superhéroe no encontrado");
    }
    res.render("editSuperhero", { errores: [], superheroe }); // Renderizar la vista con los datos del superhéroe
  } catch (error) {
    res.status(500).send("Error al cargar el formulario de edición");
  }
});
router.post("/heroes/:id/editar", async (req, res) => {
  const { id } = req.params;
  const { nombreSuperHeroe, nombreReal, edad, planetaOrigen, debilidad, poderes, aliados, enemigos } = req.body;

  try {
    const datosActualizados = {
      nombreSuperHeroe,
      nombreReal,
      edad,
      planetaOrigen,
      debilidad,
      poderes: poderes.split(",").map((p) => p.trim()),
      aliados: aliados ? aliados.split(",").map((a) => a.trim()) : [],
      enemigos: enemigos ? enemigos.split(",").map((e) => e.trim()) : [],
    };

    const superheroeActualizado = await actualizarSuperheroeController(req, res, true);

    if (!superheroeActualizado) {
      return res.status(404).send("Superhéroe no encontrado");
    }

    res.redirect("/api/heroes?mensaje=Superhéroe actualizado con éxito");
  } catch (error) {
    res.render("editSuperhero", {
      errores: ["Error al actualizar el superhéroe."],
      superheroe: req.body,
    });
  }
});

router.delete("/heroes/:id", eliminarSuperheroeController); // Eliminar un superhéroe por ID

export default router;
