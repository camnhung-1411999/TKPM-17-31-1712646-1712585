import userService from '../services/user.service';
import { IUser } from '../models/user.model';
import { Request} from 'express';
import Password from '../utils/auth';
class UserController {
    static list() {
        return userService.list();
    }
    static find(req: Request) {
        let username: string = req.params.username;
        return userService.find(username);
    }
    static create(req: Request) {
        let user: IUser = {
            ...req.body
        }
        user.name = req.body.firstName + ' ' + req.body.lastName;
        Promise.resolve(Password.hashPassword(user.password)).then((result) => {
            user.password = result;
            return userService.create(user);
        });
    }
    static update(req: Request) {
        if (req.body.password === undefined) {
            return userService.update(req.params.username, req.body);
        }
        else {
            const password = Password.hashPassword(req.body.password);
            return userService.update(req.params.username, {
                password: password
            })
        }

    }
    static delete(req: Request) {
        return userService.delete(req.params.username);
    }
}

export default UserController;