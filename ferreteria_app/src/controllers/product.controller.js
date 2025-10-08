//segun el docente
/*import { DataBaseRepository } from "../repository/json.repository.js";

const dataBase = new DataBaseRepository("../../database/ferreteria.db.json");*/

//segun chat gpt para que funcione resto client en el modulos test
import path from "path";
import { fileURLToPath } from "url";
import { DataBaseRepository } from "../repository/json.repository.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta correcta al JSON, independiente de desde dónde ejecutes npm run dev
const jsonPath = path.join(__dirname, "../../database/ferreteria.db.json");

const repo = new DataBaseRepository(jsonPath);
const dataBase = repo;

export const ProductController = {
  getById: async (req, res) => {
    const idParam = req.params.id;

    const responseData = await dataBase.getById(idParam);
    try {
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
      return
    }
  },
};
