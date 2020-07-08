"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var App_1 = __importDefault(require("./App"));
var db_1 = __importDefault(require("./src/utils/db"));
var data = new db_1.default();
App_1.default.listen(3000, function () {
    console.log('App is listenning on port 3000');
});
