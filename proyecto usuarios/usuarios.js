let usuarios = [
  { id: 1, nombre: "Ana", edad: 25 },
  { id: 2, nombre: "Luis", edad: 32 },
  { id: 3, nombre: "Marta", edad: 28 },
];

// Crea un error con código HTTP (lo usará la API)
function crearError(mensaje, status) {
  const error = new Error(mensaje);
  error.status = status;
  return error;
}

function validarDatos(nombre, edad) {
  if (typeof nombre !== "string" || nombre.trim() === "") {
    throw crearError("El nombre es obligatorio", 400);
  }
  if (typeof edad !== "number" || Number.isNaN(edad) || edad < 0) {
    throw crearError("La edad debe ser un número igual o mayor que 0", 400);
  }
}

// reduce: busca el ID más alto y suma 1
function siguienteId() {
  return usuarios.reduce((max, u) => (u.id > max ? u.id : max), 0) + 1;
}

// 1. Listar
function listarUsuarios() {
  return usuarios;
}

// 2. Buscar por ID (usando .find)
function buscarUsuario(id) {
  const usuario = usuarios.find((u) => u.id === id);
  if (!usuario) {
    throw crearError(`No existe el usuario con ID ${id}`, 404);
  }
  return usuario;
}

// 3. Buscar por nombre (usando.filter)
function buscarPorNombre(texto) {
  const buscado = String(texto).toLowerCase();
  const resultado = usuarios.filter((u) =>
    u.nombre.toLowerCase().includes(buscado)
  );
  if (resultado.length === 0) {
    throw crearError(`No hay usuarios que coincidan con "${texto}"`, 404);
  }
  return resultado;
}

// 4. Crear (el ID es opcional, si no lo pasa, se genera solo)
function crearUsuario(nombre, edad, id) {
  validarDatos(nombre, edad);
  if (id !== undefined && usuarios.some((u) => u.id === id)) {
    throw crearError(`Ya existe un usuario con ID ${id}`, 409);
  }
  const nuevo = { id: id ?? siguienteId(), nombre: nombre.trim(), edad };
  usuarios.push(nuevo);
  return nuevo;
}

// 5. Eliminar (usando .filter)
function eliminarUsuario(id) {
  const usuario = buscarUsuario(id); // lanza error si no existe
  usuarios = usuarios.filter((u) => u.id !== id);
  return usuario;
}

// 6. Actualizar (map)
function actualizarUsuario(id, nombre, edad) {
  const actual = buscarUsuario(id);
  const nuevoNombre = nombre ?? actual.nombre;
  const nuevaEdad = edad ?? actual.edad;
  validarDatos(nuevoNombre, nuevaEdad);

  const actualizado = { ...actual, nombre: nuevoNombre.trim(), edad: nuevaEdad };
  usuarios = usuarios.map((u) => (u.id === id ? actualizado : u));
  return actualizado;
}

module.exports = {
  listarUsuarios,
  buscarUsuario,
  buscarPorNombre,
  crearUsuario,
  eliminarUsuario,
  actualizarUsuario,
};