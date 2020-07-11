import productService from "../services/product.service";
import { IProduct } from "../models/product.model";
import { Request, Response } from "express";
import Image from "../Components/image";
var cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: "hoang-man-1108",
  api_key: "185155598515121",
  api_secret: "eEp6LeeY1ak80gVdSmKpb5wMHqY",
});
class ProductController {
  static products(req: Request, res: Response) {
    Promise.resolve(productService.list().then(result=>{
      res.render('products/products',{
        title: "Sản phẩm",
        listproducts: result
      })
    }));
  }

  static find(req: Request, res: Response) {
    let idproduct: string = req.params.product;
    let product: Promise<IProduct | null> = productService.find(idproduct);
    res.send("find product");
  }

  static create(req: Request, res: Response) {
    let product: IProduct = { ...req.body };
    var newproduct = productService.create(product);
    console.log(newproduct);
    res.send("create new product");
  }

  static update(req: Request) {
    return productService.update(req.params.product, req.body);
  }

  static delete(req: Request) {
    return productService.delete(req.params.product);
  }

  static upload(req: Request, res: Response) {
    res.render("products/upload", { title: "Upload New Product" });
  }

  static postUpload(req: Request, res: Response) {
    cloudinary.uploader.upload(
      req.file.path,
      (result: Image, err: Object | null) => {
        if (err) throw err;
        else {
          let product = {
            ...req.body,
            image: result.url,
          };
          productService.create(product);
        }
        res.redirect("/products/upload");
      }
    );
  }
}

export default ProductController;
