import { readFile } from "node:fs/promises";

const POR_DEFECTO = {
  puerto: 3000,
  host: "localhost",
  debug: false,
};

export async function cargarConfiguracion(ruta) {
  let texto;

  try {
    texto = await readFile(ruta, "utf-8");
  } catch (error) {
    if (error.code === "ENOENT") {
      return { ...POR_DEFECTO };
    }
    throw new Error(`No se pudo leer el archivo de configuración "${ruta}": ${error.message}`, { cause: error });
  }

  try {
    const loLeido = JSON.parse(texto);
    return { ...POR_DEFECTO, ...loLeido };
  } catch (error) {
    throw new Error(`El archivo de configuración "${ruta}" tiene un JSON inválido: ${error.message}`, { cause: error });
  }
}