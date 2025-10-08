const API_KEY = "12345"; // Define tu API key aquí
export const apiKeyAuth = (req, res, next) => {
  const apiKey = req.headers["x-api-key"] || req.query.api_key;
  if (apiKey !== API_KEY) {
    res.json({
      status: 401,
      ok: false,
      message: "API key inválida o no proporcionada",
    });
    return;
  }

  next(); // La API key es válida, continuar con la siguiente función middleware o ruta
  return;
};
