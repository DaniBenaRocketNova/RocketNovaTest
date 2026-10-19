const {
  listarUsuarios,
  buscarUsuario,
  buscarPorNombre,
  crearUsuario,
  eliminarUsuario,
  actualizarUsuario,
} = require("./usuarios");

// Ejecuta una función y muestra el resultado o el error
function probar(titulo, accion) {
  try {
    console.log(titulo, accion());
  } catch (error) {
    console.log(titulo, "ERROR:", error.message);
  }
}

probar("Listar:", () => listarUsuarios());
probar("Buscar ID 2:", () => buscarUsuario(2));
probar("Buscar nombre 'an':", () => buscarPorNombre("an"));
probar("Crear Fernando:", () => crearUsuario("Fernando", 30));
probar("Actualizar ID 1:", () => actualizarUsuario(1, "Juan Carlos"));
probar("Eliminar ID 3:", () => eliminarUsuario(3));

console.log("\n--- Validaciones ---");
probar("Sin nombre:", () => crearUsuario("", 20));
probar("Edad negativa:", () => crearUsuario("Pepe", -5));
probar("ID repetido:", () => crearUsuario("Pepe", 20, 1));
probar("ID inexistente:", () => buscarUsuario(99));