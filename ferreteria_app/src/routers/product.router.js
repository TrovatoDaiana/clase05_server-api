import express from "express";
import { ProductController } from "../controllers/product.controller.js";
import e from "express";

const productRouter = express.Router("/products");

const { getById, getByIdBody, createProduct, deleteById, updateById } = ProductController;

productRouter
  .get("/products/:id", getById)
  .get("/products", getByIdBody)
  .post("/products", createProduct)
  .delete("/products/:id", deleteById)
  .patch("/products/:id", updateById);

export default productRouter;
