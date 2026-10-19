# Sistema de usuarios: JavaScript + API con Node.js y Express

Mini proyecto en dos partes:

1. **Sistema de usuarios en JavaScript** que gestiona un array de objetos con las operaciones básicas (listar, buscar, crear, actualizar y eliminar) y sus validaciones.
2. **API REST con Node.js y Express** que reutiliza esa misma lógica y la expone mediante endpoints HTTP.

El objetivo es combinar arrays, objetos, funciones, condiciones y los métodos `map()`, `filter()`, `find()`, `reduce()` y `some()`, y dar el salto de practicar JavaScript a construir una API sencilla.

## Estructura del proyecto

```
proyecto-usuarios/
├── usuarios.js    # Lógica: array de usuarios + funciones + validaciones
├── demo.js        # Prueba en consola (parte 1)
├── server.js      # API con Express (parte 2)
├── package.json
└── README.md
```

`usuarios.js` no sabe nada de Express, por eso se reutiliza tanto en la consola como en la API sin cambiar una línea.

## Requisitos

- [Node.js](https://nodejs.org/) 18 o superior
- npm (se instala junto con Node.js)
- [Postman](https://www.postman.com/) (opcional, para probar la API)

## Instalación

```bash
git clone https://github.com/Dani-Bena/proyecto-usuarios.git
cd proyecto-usuarios
npm install
```

## Parte 1: uso en consola

```bash
node demo.js
```

El script ejecuta todas las operaciones y muestra también los casos de error.

### Funciones disponibles

| Función | Descripción | Método de array |
|---|---|---|
| `listarUsuarios()` | Devuelve todos los usuarios | — |
| `buscarUsuario(id)` | Busca un usuario por ID | `find()` |
| `buscarPorNombre(texto)` | Busca usuarios cuyo nombre contenga el texto | `filter()` |
| `crearUsuario(nombre, edad, id?)` | Crea un usuario (el ID es opcional y, si no se indica, se genera solo) | `reduce()`, `some()` |
| `actualizarUsuario(id, nombre?, edad?)` | Actualiza nombre y/o edad | `map()` |
| `eliminarUsuario(id)` | Elimina un usuario | `filter()` |

```js
crearUsuario("Fernando", 30);
buscarUsuario(2);
eliminarUsuario(3);
actualizarUsuario(1, "Juan Carlos");
```

### Validaciones

- No se pueden crear usuarios sin nombre.
- No se pueden crear usuarios con edad negativa (ni que no sea un número).
- No se pueden crear usuarios con un ID repetido.
- Buscar, actualizar o eliminar un usuario que no existe devuelve un error.

## Parte 2: API REST

```bash
node server.js
```

La API queda escuchando en `http://localhost:3000`.

### Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/usuarios` | Lista todos los usuarios |
| `GET` | `/usuarios?nombre=an` | Busca usuarios por nombre |
| `GET` | `/usuarios/:id` | Obtiene un usuario por ID |
| `POST` | `/usuarios` | Crea un usuario |
| `PUT` | `/usuarios/:id` | Actualiza un usuario |
| `DELETE` | `/usuarios/:id` | Elimina un usuario |

### Códigos de respuesta

| Código | Cuándo |
|---|---|
| `200` | Operación correcta |
| `201` | Usuario creado |
| `400` | Datos inválidos (nombre vacío, edad negativa...) |
| `404` | El usuario no existe |
| `409` | Conflicto: ID repetido |

### Ejemplos de peticiones

**Crear un usuario**

```http
POST /usuarios
Content-Type: application/json

{ "nombre": "Fernando", "edad": 30 }
```

Respuesta `201`:

```json
{ "id": 4, "nombre": "Fernando", "edad": 30 }
```

**Actualizar un usuario**

```http
PUT /usuarios/1
Content-Type: application/json

{ "nombre": "Juan Carlos" }
```

**Error de validación** (`POST /usuarios` con `{ "nombre": "", "edad": 30 }`), respuesta `400`:

```json
{ "error": "El nombre es obligatorio" }
```

### Probar con Postman

En las peticiones con body hay que seleccionar **Body → raw → JSON**.

| Método | URL | Body | Resultado esperado |
|---|---|---|---|
| GET | `localhost:3000/usuarios` | — | 200 + lista |
| GET | `localhost:3000/usuarios/2` | — | 200 + usuario |
| GET | `localhost:3000/usuarios/99` | — | 404 |
| GET | `localhost:3000/usuarios?nombre=an` | — | 200 + coincidencias |
| POST | `localhost:3000/usuarios` | `{"nombre":"Fernando","edad":30}` | 201 |
| POST | `localhost:3000/usuarios` | `{"nombre":"","edad":30}` | 400 |
| POST | `localhost:3000/usuarios` | `{"nombre":"Pepe","edad":-5}` | 400 |
| POST | `localhost:3000/usuarios` | `{"nombre":"Pepe","edad":20,"id":1}` | 409 |
| PUT | `localhost:3000/usuarios/1` | `{"nombre":"Juan Carlos"}` | 200 |
| DELETE | `localhost:3000/usuarios/3` | — | 200 |

## Notas

- Los datos se guardan **en memoria**: al reiniciar el servidor se restauran los tres usuarios iniciales. Un siguiente paso natural sería persistirlos en un archivo JSON o en una base de datos.
- Los errores se lanzan con un `status` HTTP desde `usuarios.js` y un middleware final en `server.js` los convierte en respuestas JSON.

## Tecnologías

- JavaScript (ES6+)
- Node.js
- Express

## Autor

**Daniel Benavides**
[GitHub](https://github.com/Dani-Bena) · [LinkedIn](https://linkedin.com/in/danielbenavides-dev)
