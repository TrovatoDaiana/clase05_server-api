//segun el docente
/*import { DataBaseRepository } from "../repository/json.repository.js";

const dataBase = new DataBaseRepository("../../database/ferreteria.db.json");*/

//segun chat gpt para que funcione resto client en el modulos test
import path from "path";
import { fileURLToPath } from "url";
import { DataBaseRepository } from "../repository/json.repository.js";
import { create } from "domain";
import { Product } from "../models/product.model.js";
import { ok } from "assert";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta correcta al JSON, independiente de desde dónde ejecutes npm run dev
const jsonPath = path.join(__dirname, "../../database/ferreteria.db.json");

const repo = new DataBaseRepository(jsonPath);
const dataBase = repo;

export const ProductController = {
  getById: async (req, res) => {
    const idParam = req.params.id;

    try {
      const responseData = await dataBase.getById(idParam);
      res.json({
        status: 200,
        ok: true,
        message: "El producto fue encontrado",
      });
      return;
    } catch (error) {
      res.json({
        status: 400,
        ok: false,
        message: `El producto no fue encontrado con el id ${idParam}`,
      });
      return;
    }
  },

  getByIdBody: async (req, res) => {
    const { id } = req.body;

    try {
      const responseData = await dataBase.getById(id);
      res.json({
        status: 200,
        ok: true,
        message: "El producto fue encontrado",
      });
      return;
    } catch (error) {
      res.json({
        status: 400,
        ok: false,
        message: `El producto no fue encontrado con el id ${id}`,
      });
      return;
    }
  },

  createProduct: async (req, res) => {
    const { nombre, descripcion, cantidad, tags } = req.body;
    const newProduct = new Product(nombre, descripcion, cantidad, tags);
    const response = await dataBase.createProduct(newProduct);
    res.json({
      status: 200,
      ok: true,
      message: "El producto fue creado",
      payload: response,
    });
    return;
  },

  deleteById: async (req, res) => {
    const { id } = req.params;

    try {
      /*const producto= await dataBase.getById(id);
      dataBase.deleteById(producto);*/
      await dataBase.deleteById(id);
      res.json({
        status: 200,
        ok: true,
        message: "El producto fue eliminado",
      });
      return;
    } catch (error) {
      res.json({
        status: 400,
        ok: false,
        message: error.message,
      });
      return;
    }
  },

  updateById: async (req, res) => {
    const { id } = req.params;
    const { descripcion, cantidad } = req.body;

    try {
      const producto = await dataBase.getById(id);

      producto.descripcion = descripcion;
      producto.cantidad = cantidad;

      const { oldDataProducto, newDataProducto } = await dataBase.updateById(producto);

      res.json({
        status: 200,
        ok: true,
        oldDataProducto,
        newDataProducto,
      });
      return;
    } catch (error) {
      res.json({
        status: 400,
        ok: false,
        message: error.message,
      });
      return;
    }
  },
};
