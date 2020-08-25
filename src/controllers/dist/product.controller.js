"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var product_service_1 = require("../services/product.service");
var comment_service_1 = require("../services/comment.service");
var moment_1 = require("moment");
var category_service_1 = require("../services/category.service");
var cloudinary = require("cloudinary");
cloudinary.config({
    cloud_name: "hoang-man-1108",
    api_key: "185155598515121",
    api_secret: "eEp6LeeY1ak80gVdSmKpb5wMHqY"
});
var ProductController = /** @class */ (function () {
    function ProductController() {
    }
    ProductController.products = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var query, result, categories, page, result, total, nPages, page_numbers, i, categories;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = req.query.search || null;
                        if (!query) return [3 /*break*/, 3];
                        return [4 /*yield*/, Promise.resolve(product_service_1["default"].findByName(query + ''))];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, Promise.resolve(category_service_1["default"].list())];
                    case 2:
                        categories = _a.sent();
                        res.render("products/products", {
                            title: "Sản phẩm",
                            listproducts: result,
                            all: true,
                            categories: categories
                        });
                        return [3 /*break*/, 7];
                    case 3:
                        page = Number(req.query.page) || 1;
                        if (page < 1)
                            page = 1;
                        return [4 /*yield*/, Promise.resolve(product_service_1["default"].listPage(page))];
                    case 4:
                        result = _a.sent();
                        return [4 /*yield*/, product_service_1["default"].count()];
                    case 5:
                        total = _a.sent();
                        nPages = Math.floor(total / 8);
                        if (total % 8 > 0)
                            nPages++;
                        page_numbers = [];
                        for (i = 1; i <= nPages; i++) {
                            page_numbers.push({
                                value: i,
                                isCurrentPage: i === +page
                            });
                        }
                        return [4 /*yield*/, Promise.resolve(category_service_1["default"].list())];
                    case 6:
                        categories = _a.sent();
                        res.render("products/products", {
                            title: "Sản phẩm",
                            listproducts: result,
                            all: true,
                            categories: categories,
                            page_numbers: page_numbers,
                            prev_value: +page - 1,
                            next_value: +page + 1,
                            user: req.user
                        });
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ProductController.create = function (req, res) {
        var product = __assign({}, req.body);
        var newproduct = product_service_1["default"].create(product);
        res.send("create new product");
    };
    ProductController.update = function (req) {
        return product_service_1["default"].update(req.params.product, req.body);
    };
    ProductController.upload = function (req, res) {
        res.render("products/upload", { title: "Upload New Product", admin: true });
    };
    ProductController.postUpload = function (req, res) {
        cloudinary.uploader.upload(req.file.path, function (result, err) {
            if (err)
                throw err;
            else {
                var product = __assign(__assign({}, req.body), { image: result.url });
                product_service_1["default"].create(product);
            }
            res.redirect("/upload/newproduct");
        });
    };
    ProductController.productsFollowType = function (req, res) {
        var _this = this;
        var Men = false, Women = false, Kids = false;
        var type = req.params.type;
        var page = Number(req.query.page) || 1;
        if (page < 1)
            page = 1;
        Promise.resolve(product_service_1["default"].listFollowTypePage(page, type).then(function (result) { return __awaiter(_this, void 0, void 0, function () {
            var total, nPages, page_numbers, i, categories, arrtemp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, product_service_1["default"].countType(type)];
                    case 1:
                        total = _a.sent();
                        nPages = Math.floor(total / 8);
                        if (total % 8 > 0)
                            nPages++;
                        page_numbers = [];
                        for (i = 1; i <= nPages; i++) {
                            page_numbers.push({
                                value: i,
                                isCurrentPage: i === +page
                            });
                        }
                        return [4 /*yield*/, Promise.resolve(category_service_1["default"].list())];
                    case 2:
                        categories = _a.sent();
                        arrtemp = [];
                        categories.map(function (value) {
                            var temp = { code: value.code, name: value.name, isEnabled: false };
                            if (type === temp.code) {
                                temp.isEnabled = true;
                            }
                            arrtemp.push(temp);
                        });
                        res.render("products/products", {
                            title: "Products's " + req.params.type,
                            listproducts: result,
                            Men: Men,
                            Women: Women,
                            Kids: Kids,
                            categories: arrtemp,
                            page_numbers: page_numbers,
                            prev_value: +page - 1,
                            next_value: +page + 1,
                            user: req.user
                        });
                        return [2 /*return*/];
                }
            });
        }); }));
    };
    ProductController.productInformation = function (req, res) {
        var _this = this;
        var idproduct = req.params.id;
        var type = req.params.type;
        Promise.resolve(product_service_1["default"].find(type, idproduct)).then(function (result) { return __awaiter(_this, void 0, void 0, function () {
            var temp, arr, comments_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!result) return [3 /*break*/, 2];
                        temp = result.price;
                        result.price = temp.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
                        return [4 /*yield*/, comment_service_1["default"].list(result.idproduct, result.type)];
                    case 1:
                        arr = _a.sent();
                        comments_1 = [];
                        if (arr) {
                            arr.map(function (value, index) {
                                var rates = [false, false, false, false, false];
                                for (var i = 0; i < value.rate; i++) {
                                    rates[i] = !rates[i];
                                }
                                var temp = {
                                    username: value.username,
                                    comment: value.comment,
                                    idproduct: value.idproduct,
                                    type: value.type,
                                    time: value.time,
                                    rates: rates
                                };
                                comments_1.push(temp);
                            });
                        }
                        res.render("products/informationproduct", {
                            title: result.name,
                            product: result,
                            user: req.user,
                            comments: comments_1
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        res.send({ error: 404, message: "Cannot find product in database" });
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    ProductController.PostComments = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var date, time, comment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        date = new Date();
                        time = moment_1["default"](date).format("DD-MM-YYYY hh:mm");
                        comment = {
                            username: req.user.username,
                            comment: req.body.comment,
                            rate: req.body.rate,
                            idproduct: req.params.idproduct,
                            type: req.params.type,
                            time: time
                        };
                        return [4 /*yield*/, comment_service_1["default"].create(comment)];
                    case 1:
                        _a.sent();
                        res.redirect('/products/' + comment.idproduct + '/' + comment.type);
                        return [2 /*return*/];
                }
            });
        });
    };
    return ProductController;
}());
exports["default"] = ProductController;
// static find(req: Request, res: Response) {
//   let idproduct: string = req.params.product;
//   let product: Promise<IProduct | null> = productService.find(idproduct);
//   res.send("find product");
// }
// static delete(req: Request) {
//   return productService.delete(req.params.product);
// }
