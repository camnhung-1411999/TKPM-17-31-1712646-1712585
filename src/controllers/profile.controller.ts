import { Request, Response } from "express";
import UserCollection from "../models/user.model";
import BillService from "../services/bill.service";
import bcrypt from 'bcrypt';

class ProfileController {
    static async Profile(req: Request, res: Response) {
        const profile = await UserCollection.findOne({ username: req.user.username });
        res.render('profile/profile', { title: 'Profile', profile,   user: req.user, });
    }

    static async UpdateProfile(req: Request, res: Response) {
        const update = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address
        }
        const entity = {
            username: req.user.username
        }
        await UserCollection.findOneAndUpdate(entity, update, { new: true });

        res.redirect('/profile');
    }

    static async ProfileBill(req: Request, res: Response){
        const list = await BillService.listOfUser(req.user.username);
        res.render('profile/profilebill',{ 
            title:'my bill',
            list,
            user: req.user,
        })
    }

    static async InfoBill(req: Request, res: Response){
        const id = req.params.id;
        let confirm = false, shipping = false, done = false;
        const list = await BillService.infoBill(id);

        if(list){
            if(list.status === 'Confirm'){
                confirm = true;
            }else if(list.status === 'Shipping'){
                shipping = true;
            }else if(list.status === 'Done'){
                done = true;
            }
        }

        res.render('profile/infoBill',{
            title:'infor of my bill',
            list: list?.products,
            confirm,
            shipping,
            done,
            user: req.user,
        })
    }

    static async ChangePassword(req:Request, res:Response){
        res.render('profile/changepassword',{
            title:'Change password',
            user: req.user
        });
    }

    static async PostChangePassword(req: Request, res: Response){
        let temp = {
            password: req.body.password,
            newpassword: req.body.newpassword,
            confirm: req.body.confirm
        }
        const value: any = await UserCollection.find({ username: req.user.username});

        bcrypt.compare(req.body.password, value.password, async (result) => {
            if (result) {
                if(temp.newpassword === temp.confirm){
                    await bcrypt.hash(temp.newpassword, 10, async (error, hash) => {
                        if (error) {
                            throw error;
                        }
                       await UserCollection.findOneAndUpdate({username: req.user.username},{password: hash},{new:true});
                       if(req.user.username === 'admin'){
                           res.redirect('/admin');
                       }
                       else{ 
                        res.redirect('/');
                       }
                    });
                }
            } else {
                console.log("invalid");
            }
        });
    }
}

export default ProfileController;