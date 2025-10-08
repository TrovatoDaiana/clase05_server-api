import express from "express";
import { ProductController } from "./controllers/product.controller.js";
import morgan from "morgan";

const morganModule= morgan(':method :url :status :res[content-length] - :response-time ms')
const server = express();

server.use(morganModule);
server.get("/products/:id", ProductController.getById);

export default server;
