import userService from '../services/user.service';
import {IUser} from '../models/user.model';
import {Request,Response} from 'express';
class UserController{
    static list(){
        return userService.list();
    }
    static find(req: Request){
        let user: string = req.params.username;
        return userService.find(user);
    }
    static create(req: Request){
        let user: IUser = {
            ...req.body
        }
        return userService.create(user);
    }
}

export default UserController;