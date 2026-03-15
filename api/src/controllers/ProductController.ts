import { Request, Response } from "express";
import "reflect-metadata";
import {
  Param,
  Get,
  Post,
  Put,
  Delete,
  JsonController,
  UploadedFile,
  BodyParam,
  Res,
} from "routing-controllers";
import { ProductService } from "../services/product.service";
import { Product } from "../models/product";
import { promisify } from "util";

@JsonController("/products")
export class ProductController {
  @Get("/")
  getAll() {
    return ProductService.getAll();
  }

  @Get("/:id")
  getOne(@Param("id") id: string) {
    return ProductService.get(id);
  }

  @Post("/")
  post(
    @BodyParam("product") product: Product,
    @UploadedFile("image") image: any
  ) {
    return ProductService.create(product, image);
  }

  @Put("/:id")
  put(
    @Param("id") id: string,
    @BodyParam("product") product: Product,
    @UploadedFile("image") image: any
  ) {
    return ProductService.update(id, product, image);
  }

  @Delete("/:id")
  remove(@Param("id") id: string) {
    return ProductService.delete(id);
  }

  @Get("/image/:image")
  async getImage(@Param("image") image: string, @Res() res: Response) {
    const imagePath = ProductService.getImagePath(image);
    await promisify<string, void>(res.download.bind(res))(imagePath);
    return res;
  }
}
