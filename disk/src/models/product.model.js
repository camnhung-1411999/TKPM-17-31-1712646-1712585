"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    idproduct: {
        type: String,
        unique: true
    },
    name: String,
    image: String,
    decription: String,
    price: String
}, { timestamps: true });
const ProductCollection = mongoose_1.default.model('products', productSchema);
exports.default = ProductCollection;
