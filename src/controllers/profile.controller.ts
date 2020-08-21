import { Request, Response } from "express";
import UserCollection from "../models/user.model";
import BillService from "../services/bill.service";
class ProfileController {
    static async Profile(req: Request, res: Response) {
        const profile = await UserCollection.findOne({ username: req.user.username });
        res.render('profile/profile', { title: 'Profile', profile });
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
            list
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

        console.log(list);
   
        res.render('profile/infoBill',{
            title:'infor of my bill',
            list: list?.products,
            confirm,
            shipping,
            done
        })
    }
}

export default ProfileController;