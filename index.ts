import 'dotenv/config';
import Databases from "./utils/db";
import controller from "./controllers/user.controller";

import {IUser} from './models/user.model';
const user:IUser = {
    username:"camnhung",
    password:'nhung123',
    name:'Doan thi cam nhung',
    phone:"0334558099",
    email:'quynhlam1411999@gmail.com',
    address:'abc'
}
console.log(controller.create(user));


const database = new Databases();
