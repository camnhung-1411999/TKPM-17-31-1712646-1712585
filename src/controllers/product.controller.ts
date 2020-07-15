import productService from "../services/product.service";
import { IProduct } from "../models/product.model";
import { Request, Response } from "express";
import Image from "../Components/image";
import { title } from "process";
import { type } from "os";
var cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: "hoang-man-1108",
  api_key: "185155598515121",
  api_secret: "eEp6LeeY1ak80gVdSmKpb5wMHqY",
});
class ProductController {
  static products(req: Request, res: Response) {
    let page: number = Number(req.query.page) || 1;
    if (page < 1) page = 1;
    Promise.resolve(
      productService.listPage(page).then(async (result) => {
        let total = await productService.count();
        let nPages = Math.floor(total / 8);
        if (total % 8 > 0) nPages++;
        const page_numbers = [];
        for (let i = 1; i <= nPages; i++) {
          page_numbers.push({
            value: i,
            isCurrentPage: i === +page,
          });
        }
        res.render("products/products", {
          title: "Sản phẩm",
          listproducts: result,
          all: true,
          page_numbers,
          prev_value: +page - 1,
          next_value: +page + 1,
        });
      })
    );
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
        res.redirect("/upload/newproduct");
      }
    );
  }
  static productsFollowType(req: Request, res: Response) {
    let Men = false,
      Women = false,
      Kids = false;
    let type = req.params.type;
    if (type === "Men") Men = true;
    else if (type === "Women") Women = true;
    else if (type === "Kids") Kids = true;
    let page: number = Number(req.query.page) || 1;
    if (page < 1) page = 1;
    Promise.resolve(
      productService.listFollowTypePage(page, type).then(async (result) => {
        let total = await productService.countType(type);
        let nPages = Math.floor(total / 8);
        if (total % 8 > 0) nPages++;
        const page_numbers = [];
        for (let i = 1; i <= nPages; i++) {
          page_numbers.push({
            value: i,
            isCurrentPage: i === +page,
          });
        }
        res.render("products/products", {
          title: "Products's " + req.params.type,
          listproducts: result,
          Men,
          Women,
          Kids,
          page_numbers,
          prev_value: +page - 1,
          next_value: +page + 1,
        });
      })
    );
  }
  static productInformation(req: Request, res: Response) {
    let idproduct: string = req.params.id;
    let type: string = req.params.type;
    Promise.resolve(productService.find(type, idproduct)).then(
      (result: IProduct | null) => {
        if (result) {
          let temp: String = result.price;
          result.price = temp.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
          res.render("products/informationproduct", {
            title: result.name,
            product: result,
          });
        } else {
          res.send({ error: 404, message: "Cannot find product in database" });
        }
      }
    );
  }
}

export default ProductController;
// static find(req: Request, res: Response) {
//   let idproduct: string = req.params.product;
//   let product: Promise<IProduct | null> = productService.find(idproduct);
//   res.send("find product");
// }

// static delete(req: Request) {
//   return productService.delete(req.params.product);
// }
