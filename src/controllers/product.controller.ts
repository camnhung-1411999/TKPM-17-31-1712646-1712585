import productService from "../services/product.service";
import { IProduct } from "../models/product.model";
import { Request, Response } from "express";

class ProductController {
  static list(req:Request, res:Response) {
    // var products:Promise<IProduct[]| null> =  productService.list();
    // console.log(products);
    Promise.resolve(productService.list().then(result=>res.send(result)));

  }

  static find(req: Request, res:Response) {
    let idproduct: string = req.params.product;
    let product:Promise<IProduct| null>= productService.find(idproduct);
    // Promise.resolve(service.list()).then(result=>console.log(result));
    res.send("find product");
  }

  static create(req: Request, res: Response) {
    let product: IProduct = { ...req.body };
    var newproduct = productService.create(product);
    console.log(newproduct);
    res.send("create new product");
  }
  
  static update(req:Request){
      return productService.update(req.params.product, req.body);
  }

  static delete(req: Request){
      return productService.delete(req.params.product);
  }
}

export default ProductController;
