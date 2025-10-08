import express from "express";
import { ProductController } from "../controllers/product.controller.js";
import e from "express";
import { testsMiddleware } from "../test.middleware.js/test.middleware.js";
import { apiKeyAuth } from "../auth/auth.apikey.js";

const { getAllData } = ProductController;
const productAdminRouter = express.Router("/admin/products");

productAdminRouter.get("/admin/products", testsMiddleware, getAllData);
productAdminRouter.get("/apikey/products", apiKeyAuth, getAllData);

export default productAdminRouter;
