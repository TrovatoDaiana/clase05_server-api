import server from "./server.js";
const PORT = 3001;

const HOST = "127.0.0.1";

//declaro un puerto y un host y los uso en listen, lo unico que hace es definir donde va a correr el servidor
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://${HOST}:${PORT}`);
});
