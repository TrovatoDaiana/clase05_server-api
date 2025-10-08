import express from "express";
import { ProductController } from "./controllers/product.controller.js";
import morgan from "morgan";

const morganModule = morgan(":method :url :status :res[content-length] - :response-time ms");
const server = express();

//middleware para parsear JSON todas las peticiones que vienen del body
server.use(express.json());
//middleware global para logging del servidor
server.use(morganModule);

server.post("/products", ProductController.createProduct);

server.get("/products/:id", ProductController.getById);
server.get("/products", ProductController.getByIdBody);

server.delete("/products/:id", ProductController.deleteById);

server.patch("/products/:id", ProductController.updateById);

export default server;
