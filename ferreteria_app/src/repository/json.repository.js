import { error } from "console";
import fs from "fs";
//clase encargada de la lectura y escritura de archivos json
export class DataBaseRepository {
  constructor(path) {
    this.path = path;
  }

  //funcion destinada a lectura asincronica de archivos
  async getAllData() {
    //lee el archivo JSON, lo convierte a objeto JS y devuelve un array con todos los productos
    const data = await fs.promises.readFile(this.path, "utf-8");
    return JSON.parse(data);
  }

  //funcion destinada a obtener un producto por su id usando la funcion getAllData
  //Lee todos los productos desde el archivo JSON y devuelve los que coincidan con el id recibido.
  //Si no hay datos o no existe ese id, lanza un error
  async getById(idParam) {
    let data = await this.getAllData();
    if (!data || data.length === 0) throw new Error("No se encontraron datos");
    //.filter() para buscar todos los productos cuyo id coincida con el parámetro recibido.
    //crea un nuevo array con los elementos que cumplan la condición
    //product es una variable temporal que representa cada elemento del array data mientras .filter() lo recorre.
    const filterData = data.filter((product) => product.id === Number(idParam));
    if (!filterData || filterData.length === 0)
      throw new Error("No se encontro el producto con ese id");
    return filterData;
  }
}
