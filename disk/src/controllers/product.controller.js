"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_service_1 = __importDefault(require("../services/product.service"));
class ProductController {
    static list(req, res) {
        // var products:Promise<IProduct[]| null> =  productService.list();
        // console.log(products);
        Promise.resolve(product_service_1.default.list().then(result => res.send(result)));
    }
    static find(req, res) {
        let idproduct = req.params.product;
        let product = product_service_1.default.find(idproduct);
        // Promise.resolve(service.list()).then(result=>console.log(result));
        res.send("find product");
    }
    static create(req, res) {
        let product = { ...req.body };
        var newproduct = product_service_1.default.create(product);
        console.log(newproduct);
        res.send("create new product");
    }
    static update(req) {
        return product_service_1.default.update(req.params.product, req.body);
    }
    static delete(req) {
        return product_service_1.default.delete(req.params.product);
    }
}
exports.default = ProductController;
