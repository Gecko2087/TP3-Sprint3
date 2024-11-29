import SuperHero from "../models/SuperHero.mjs";
import IRepository from "../repositories/IRepository.mjs";
import mongoose from "mongoose";

class SuperHeroRepository extends IRepository {
  async obtenerPorId(id) {
    if (mongoose.isValidObjectId(id)) {
      return await SuperHero.findById(id);
    }
  }

  async obtenerTodos() {
    return await SuperHero.find({});
  }

  async buscarPorAtributo(atributo, valor) {
    // Verificar si el atributo es "edad" o cualquier campo numérico
    const esNumerico = ["edad"].includes(atributo); // Lista de atributos numéricos
    const query = esNumerico
      ? { [atributo]: valor } // Búsqueda exacta para números
      : { [atributo]: new RegExp(valor, "i") }; // Búsqueda insensible a mayúsculas/minúsculas para strings
  
    return await SuperHero.find(query);
  }  

  async obtenerMayoresDe30() {
    return await SuperHero.find({
      edad: { $gt: 30 }, // Edad mayor a 30
      planetaOrigen: "Tierra", // Planeta de origen
      "poderes.1": { $exists: true }, // Al menos 2 elementos en el array poderes
    });
  }  

  async crear(superheroe) {
    const nuevoSuperHeroe = new SuperHero(superheroe);
    return await nuevoSuperHeroe.save();
  }

  async actualizar(id, datos) {
    return await SuperHero.findByIdAndUpdate(id, datos, {
      new: true,         // Devuelve el documento actualizado
      runValidators: true, // Fuerza las validaciones del esquema
    }).exec();
  }  

  async eliminar(id) {
    return await SuperHero.findByIdAndDelete(id).exec();
  }

  async eliminarPorNombre(nombreSuperHeroe) {
    return await SuperHero.findOneAndDelete({ nombreSuperHeroe }).exec();
  }  
}

export default new SuperHeroRepository();
