import productService from "../services/product.service";
import { IProduct } from "../models/product.model";
import { Request, Response } from "express";
import Image from "../Components/image";
import { title } from "process";
var cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: "hoang-man-1108",
  api_key: "185155598515121",
  api_secret: "eEp6LeeY1ak80gVdSmKpb5wMHqY",
});
class ProductController {
  static products(req: Request, res: Response) {
    Promise.resolve(
      productService.list().then((result) => {
        res.render("products/products", {
          title: "Sản phẩm",
          listproducts: result,
          all: true,
        });
      })
    );
  }

  // static find(req: Request, res: Response) {
  //   let idproduct: string = req.params.product;
  //   let product: Promise<IProduct | null> = productService.find(idproduct);
  //   res.send("find product");
  // }

  static create(req: Request, res: Response) {
    let product: IProduct = { ...req.body };
    var newproduct = productService.create(product);
    console.log(newproduct);
    res.send("create new product");
  }

  static update(req: Request) {
    return productService.update(req.params.product, req.body);
  }

  // static delete(req: Request) {
  //   return productService.delete(req.params.product);
  // }

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
  static productsFollowType(req: Request, res: Response) {
    let Men = false,
      Women = false,
      Kids = false;
    if (req.params.type === "Men") Men = true;
    else if (req.params.type === "Women") Women = true;
    else if (req.params.type === "Kids") Kids = true;
    Promise.resolve(
      productService.listFollowType(req.params.type).then((result) => {
        res.render("products/products", {
          title: "Products's " + req.params.type,
          listproducts: result,
          Men,
          Women,
          Kids,
        });
      })
    );
  }
  static productInformation(req: Request, res: Response) {
    let idproduct: string = req.params.id;
    let type: string = req.params.type;
    // let num:Number = 123456678.00;
    // let str:string = num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    // console.log(num, str);
    Promise.resolve(productService.find(type, idproduct)).then(
      (result: IProduct | null) => {
        if (result) {
          let temp:String = result.price;
          result.price = temp.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
          res.render("products/informationproduct", {
            title: result.name,
            product: result,
          });
        }else{
          res.send({error:404,message:'Cannot find product in database'});
        }
      }
    );
  }
}

export default ProductController;
