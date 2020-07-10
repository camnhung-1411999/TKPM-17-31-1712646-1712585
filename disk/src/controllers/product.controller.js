"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_service_1 = __importDefault(require("../services/product.service"));
const express_1 = __importDefault(require("express"));
// import { RequestHandler, Request, Response, NextFunction } from 'express-serve-static-core';
const fileUpload = require("express-fileupload");
var app = express_1.default.Router();
app.use(fileUpload({
    useTempFiles: true,
}));
class ProductController {
    static products(req, res) {
        Promise.resolve(product_service_1.default.list().then(result => res.send(result)));
        res.render('products/products', { title: "Sản phẩm" });
    }
    static find(req, res) {
        let idproduct = req.params.product;
        let product = product_service_1.default.find(idproduct);
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
    static upload(req, res) {
        res.render('products/upload', { title: "Upload New Product" });
    }
    static postUpload(req, res) {
        console.log(req.files);
        if (typeof req.files === 'object') {
            const file = req.files.image;
            console.log(file);
        }
        else {
            console.log("nothing");
        }
        res.send("post upload");
    }
}
exports.default = ProductController;
