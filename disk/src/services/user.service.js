"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_model_1 = __importDefault(require("../models/user.model"));
var userService = /** @class */ (function () {
    function userService() {
    }
    userService.list = function () {
        return user_model_1.default.find({});
    };
    userService.find = function (user) {
        return user_model_1.default.findOne({ username: user });
    };
    userService.create = function (user) {
        return user_model_1.default.create(user);
    };
    return userService;
}());
exports.default = userService;
