import { NotFoundError } from "routing-controllers";
import { Product } from "../models/product";
import * as fs from "fs";
import * as path from "path";
import prisma from "../utils/db";
import { generateUUID } from "../utils/helper";

export class ProductService {
  static async getAll() {
    const products = await prisma.product.findMany();
    return products;
  }

  static async get(id: string) {
    const product = await prisma.product.findFirst({
      where: { id },
    });

    if (!product) {
      throw new NotFoundError("product not found");
    }

    return product;
  }

  static async create(productData: Product, image: any) {
    const { code, name, quantity, price } = productData;

    const productWithCode = await prisma.product.findFirst({
      where: { code },
    });

    if (productWithCode !== null) {
      throw new Error("Product with code '" + code + "' already exists!!!");
    }

    const id = generateUUID();

    let img: string;
    if (image) {
      img = this.saveImage(id, image.originalname, image.buffer);
    }

    const newProduct = await prisma.product.create({
      data: { id, code, name, quantity, price, image: img },
    });

    return { success: true, id: newProduct.id };
  }

  static async update(id: string, productData: Product, image: any) {
    const { code, name, quantity, price } = productData;

    let img: string;
    if (image) {
      img = this.saveImage(id, image.originalname, image.buffer);
    }

    await prisma.product.update({
      where: { id },
      data: { code, name, quantity, price, image: img },
    });

    return { success: true };
  }

  static async delete(id: string) {
    this.deleteImage(id);

    await prisma.product.delete({
      where: { id },
    });

    return { success: true };
  }

  static saveImage(productId: string, originalName: string, file: Buffer) {
    this.deleteImage(productId);

    const ext = path.extname(originalName);

    const filename = productId + ext;

    fs.writeFile(path.join(__dirname, "../assets/" + filename), file, (err) => {
      // Rest of your code
      if (err) throw err;
      console.log("Saved file for ProductID : " + productId);
    });

    return filename;
  }

  static deleteImage(productId: string) {
    const directory = path.join(__dirname, "../assets");

    const files = fs.readdirSync(directory);
    files.forEach((file) => {
      if (file.includes(productId)) {
        fs.unlinkSync(path.join(directory, file));
      }
    });
  }

  static getImagePath(image: string) {
    const imagePath = path.join(__dirname, "../assets", image);
    return imagePath;
  }
}
