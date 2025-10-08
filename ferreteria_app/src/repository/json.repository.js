import { error } from "console";
import fs from "fs";
//import product from "../models/product.model.js";
//clase encargada de la lectura y escritura de archivos json
export class DataBaseRepository {
  constructor(path) {
    this.path = path;
  }

  //funcion destinada a lectura asincronica de archivos
  async getAllData() {
    //lee el archivo JSON, lo convierte a objeto JS y devuelve un array con todos los productos
    const data = await fs.promises.readFile(this.path, { encoding: "utf-8" });
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
    const filterData = data.filter((product) => product.id === idParam);
    if (!filterData || filterData.length === 0)
      throw new Error(`No se encontro el producto con ese ${idParam}`);

    const objetoPlain = filterData[0];

    const product = new Product(
      objetoPlain.id,
      objetoPlain.nombre,
      //si antepongo el signo ? indico que ese campo puede estar o no,si no esta pone null
      objetoPlain?.descripcion,
      objetoPlain.cantidad,
      objetoPlain.tags,
    );

    console.log(product);
    return product;
  }

  async createProduct(newProduct) {
    let data = await this.getAllData();
    data.push(newProduct);
    await fs.promises.writeFile(this.path, JSON.stringify(data, null, 2));
    return {
      idProducto: newProduct.id,
    };
  }

  async deleteById(id) {
    // const {id} = producto;
    let data = await this.getAllData();
    const filterData = data.filter((product) => product.id !== id);
    await fs.promises.writeFile(this.path, JSON.stringify(filterData, null, 2));
    return {
      idProducto: id,
    };
  }
  async updateById(producto) {
    const { id } = producto;
    let data = await this.getAllData();

    const filterData = data.filter((product) => product.id !== id);

    const oldDataProducto = filterData.find((product) => product.id === id);

    filterData.push(producto);

    await fs.promises.writeFile(this.path, JSON.stringify(filterData, null, 2));
    return { oldDataProducto, newDataProducto: producto };
  }

  /*async updateById(producto) { 
  const {id} = producto;
  let data = await this.getAllData();

  // Buscar el producto viejo antes de filtrar
  const oldDataProducto = data.find((product) => product.id === id);

  // Si no existe, lanzar error
  if (!oldDataProducto) throw new Error(`No se encontró el producto con id ${id}`);

  // Eliminar el producto viejo
  const filterData = data.filter((product) => product.id !== id);

  // Agregar el producto actualizado
  filterData.push(producto);

  // Guardar el array actualizado
  await fs.promises.writeFile(this.path, JSON.stringify(filterData, null, 2));

  return {oldDataProducto, newDataProducto: producto};
}*/
}
