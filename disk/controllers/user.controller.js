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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_service_1 = __importDefault(require("../services/user.service"));
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.list = function () {
        return user_service_1.default.list();
    };
    UserController.find = function (req) {
        var user = req.params.username;
        return user_service_1.default.find(user);
    };
    UserController.create = function (req) {
        var user = __assign({}, req.body);
        return user_service_1.default.create(user);
    };
    return UserController;
}());
exports.default = UserController;
