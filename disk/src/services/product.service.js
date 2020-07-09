"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_model_1 = __importDefault(require("../models/product.model"));
class productService {
    static async list() {
        return await product_model_1.default.find();
    }
    static async find(product) {
        return await product_model_1.default.findOne({ idproduct: product });
    }
    static async create(product) {
        return await product_model_1.default.create(product);
    }
    static async update(idproduct, product) {
        return await product_model_1.default.update({ idproduct }, product);
    }
    static async delete(product) {
        return await product_model_1.default.findOneAndDelete({ idproduct: product });
    }
}
exports.default = productService;
