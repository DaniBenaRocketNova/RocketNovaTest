const express = require("express");
const {
  listarUsuarios,
  buscarUsuario,
  buscarPorNombre,
  crearUsuario,
  eliminarUsuario,
  actualizarUsuario,
} = require("./usuarios");

const app = express();
app.use(express.json()); // permite leer el body en JSON

// GET /usuarios  (opcional: /usuarios?nombre=an)
app.get("/usuarios", (req, res) => {
  const { nombre } = req.query;
  res.json(nombre ? buscarPorNombre(nombre) : listarUsuarios());
});

// GET /usuarios/:id
app.get("/usuarios/:id", (req, res) => {
  res.json(buscarUsuario(Number(req.params.id)));
});

// POST /usuarios
app.post("/usuarios", (req, res) => {
  const { nombre, edad, id } = req.body ?? {};
  res.status(201).json(crearUsuario(nombre, edad, id));
});

// PUT /usuarios/:id
app.put("/usuarios/:id", (req, res) => {
  const { nombre, edad } = req.body ?? {};
  res.json(actualizarUsuario(Number(req.params.id), nombre, edad));
});

// DELETE /usuarios/:id
app.delete("/usuarios/:id", (req, res) => {
  res.json({ mensaje: "Usuario eliminado", usuario: eliminarUsuario(Number(req.params.id)) });
});

// Middleware de errores: convierte los errores de usuarios.js en respuestas HTTP
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});

app.listen(3000, () => {
  console.log("API escuchando en http://localhost:3000");
});