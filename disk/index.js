"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var express = require("express");
var app = express();
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.listen(3000, function () {
    console.log('App is listening on port 3000!');
});
// import { IUser } from './models/user.model';
// const user = {
//     username: "camnhung",
//     password: 'nhung123',
//     name: 'Doan thi cam nhung',
//     phone: "0334558099",
//     email: 'quynhlam1411999@gmail.com',
//     address: 'abc'
// }
// console.log(controller.create(user));
//const database = new Databases();
