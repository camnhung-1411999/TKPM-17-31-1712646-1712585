import productService from "../services/product.service";
import { IProduct } from "../models/product.model";
import express,{ Request, Response } from "express";
// import { RequestHandler, Request, Response, NextFunction } from 'express-serve-static-core';
import fileUpload = require('express-fileupload');
var app = express.Router();

type UploadedFile = fileUpload.UploadedFile;
app.use(fileUpload({
  useTempFiles: true,
}))
class ProductController {
  static products(req:Request, res:Response) {
    Promise.resolve(productService.list().then(result=>res.send(result)));
    res.render('products/products',{title:"Sản phẩm"});
  }

  static find(req: Request, res:Response) {
    let idproduct: string = req.params.product;
    let product:Promise<IProduct| null>= productService.find(idproduct);
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

  static upload(req:Request, res:Response){
    res.render('products/upload',{title:"Upload New Product"});
  }

  static postUpload(req: Request, res:Response){
    console.log(req.files);
    if (typeof req.files === 'object') {
      const file = req.files.image;
      console.log(file);
    }else{
      console.log("nothing");
    }
    res.send("post upload");
  }
}

export default ProductController;
