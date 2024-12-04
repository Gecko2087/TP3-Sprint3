import {
  obtenerSuperheroePorId,
  obtenerTodosLosSuperheroe,
  crearSuperheroe,
  actualizarSuperheroe,
  eliminarSuperheroe,
} from "../services/superheroesService.mjs";

// Obtener todos los superhéroes
export async function obtenerTodosLosSuperheroeController(req, res) {
  try {
    const superheroes = await obtenerTodosLosSuperheroe();
    res.render("dashboard", { superheroes });
  } catch (error) {
    res.status(500).json({ mensaje: "Error interno del servidor", error });
  }
}

// Obtener un superhéroe por ID
export async function obtenerSuperheroePorIdController(req, res, render = false) {
  try {
    const { id } = req.params;

    const superheroe = await obtenerSuperheroePorId(id);
    if (!superheroe) {
      return res.status(404).json({ mensaje: "Superhéroe no encontrado" });
    }

    if (render) {
      return superheroe; // Devuelve el objeto si se llama desde otra función
    } else {
      res.json(superheroe); // Renderiza JSON por defecto
    }
  } catch (error) {
    res.status(500).json({ mensaje: "Error interno del servidor", error });
  }
}

// Crear un nuevo superhéroe
export async function crearSuperheroeController(req, res) {
  try {
    const superheroe = await crearSuperheroe(req.body);

    // Redirigir al dashboard después de crear el superhéroe
    res.redirect("/api/heroes");
  } catch (error) {
    if (error.name === "ValidationError") {
      // Renderizar la vista con los errores si hay problemas de validación
      return res.status(400).render("addSuperhero", {
        errores: Object.values(error.errors).map((e) => e.message),
        superheroe: req.body, // Conservar los datos ingresados
      });
    }
    res.status(500).json({ mensaje: "Error interno del servidor", error });
  }
}

// Actualizar un superhéroe por ID
export async function actualizarSuperheroeController(req, res, render = false) {
  try {
    const { id } = req.params;
    const { nombreSuperHeroe, nombreReal, edad, planetaOrigen, debilidad, poderes, aliados, enemigos } = req.body;

    // Procesar los arrays
    const datosActualizados = {
      nombreSuperHeroe: nombreSuperHeroe.trim(),
      nombreReal: nombreReal.trim(),
      edad: parseInt(edad),
      planetaOrigen: planetaOrigen.trim(),
      debilidad: debilidad.trim(),
      poderes: poderes.split(",").map((p) => p.trim()),
      aliados: aliados ? aliados.split(",").map((a) => a.trim()) : [],
      enemigos: enemigos ? enemigos.split(",").map((e) => e.trim()) : [],
    };

    const superheroe = await actualizarSuperheroe(id, datosActualizados);
    if (!superheroe) {
      return res.status(404).json({ mensaje: "Superhéroe no encontrado" });
    }

    if (render) {
      return superheroe;
    } else {
      res.json({
        mensaje: "Superhéroe actualizado con éxito",
        superheroe,
      });
    }
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        mensaje: "Error de validación",
        errores: Object.values(error.errors).map((e) => e.message),
      });
    }
    res.status(500).json({
      mensaje: "Error interno del servidor",
      error: error.message,
    });
  }
}

// Eliminar un superhéroe por ID
export async function eliminarSuperheroeController(req, res) {
  try {
    const { id } = req.params;

    const superheroeEliminado = await eliminarSuperheroe(id);
    if (!superheroeEliminado) {
      return res.status(404).json({ mensaje: "Superhéroe no encontrado" });
    }

    res.redirect("/api/heroes?mensaje=Superhéroe eliminado con éxito");
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al eliminar el superhéroe",
      error: error.message,
    });
  }
}