import userService from '../services/user.service';
import { IUser } from '../models/user.model';
import { Request, Response} from 'express';
import Password from '../utils/auth';
class UserController {
    static list(req: Request, res: Response) {
        const list =  userService.list();
        Promise.resolve(list).then((result) =>{
            res.render(
                'admin/user',
                {
                    title: "Manage user",
                    list: result, 
                    admin: true
                }
            )
        });
    }
    static find(req: Request) {
        let username: string = req.params.username;
        return userService.find(username);
    }
    static create(req: Request, res: Response) {
        let user: IUser = {
            ...req.body
        }
        user.name = req.body.firstName + ' ' + req.body.lastName;
        Promise.resolve(Password.hashPassword(user.password)).then(async(result) => {
            user.password = result;
            await userService.create(user);
            if(user.username === "admin"){
                res.redirect('/admin');
            }else{
                res.redirect('/home');
            }
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