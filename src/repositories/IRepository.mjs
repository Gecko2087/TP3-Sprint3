class IRepository {
  obtenerPorId(id) {
    throw new Error("Metodo 'obtenerPorId()'");
  }
  obtenerTodos() {
    throw new Error("Metodo 'obtenerTodos()'");
  }

  buscarPorAtributo(atributo, valor) {
    throw new Error("Metodo 'buscarPorAtributo()'");
  }

  obtenerMayoresDe30() {
    throw new Error("Metodo 'obtenerMayoresDe30()'");
  }
}
export default IRepository;
