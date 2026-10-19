import { createServer } from "node:http";

const PUERTO = Number(process.env.PORT) || 3000;

function responderJSON(res, estado, cuerpo) {
  res.writeHead(estado, { "Content-Type": "application/json" });
  res.end(JSON.stringify(cuerpo));
}

const servidor = createServer(async (req, res) => {
  try {
    const { pathname } = new URL(req.url, "http://localhost");

    if (req.method === "GET" && pathname === "/salud") {
      return responderJSON(res, 200, { ok: true });
    }

    responderJSON(res, 404, { error: "No encontrado" });
  } catch (error) {
    console.error("Error inesperado:", error);

    if (!res.headersSent) {
      responderJSON(res, 500, { error: "Error interno del servidor" });
    } else {
      res.end();
    }
  }
});

servidor.listen(PUERTO, () => {
  console.log(`Servidor escuchando en http://localhost:${PUERTO}`);
});