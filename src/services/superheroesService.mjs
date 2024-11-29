import SuperHeroRepository from "../repositories/SuperHeroRepository.mjs";

export async function obtenerTodosLosSuperheroe() {
  return await SuperHeroRepository.obtenerTodos();
}

export async function obtenerSuperheroePorId(id) {
  return await SuperHeroRepository.obtenerPorId(id);
}

export async function crearSuperheroe(superheroe) {
  return await SuperHeroRepository.crear(superheroe);
}

export async function actualizarSuperheroe(id, datos) {
  return await SuperHeroRepository.actualizar(id, datos);
}

export async function eliminarSuperheroe(id) {
  return await SuperHeroRepository.eliminar(id);
}
