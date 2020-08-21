import BillService from '../services/bill.service';
import { Request, Response } from 'express';
class BillController {
    static list(Req: Request, res: Response) {
        Promise.resolve(BillService.list()).then((result) => {
            res.render('admin/order', {
                title: "Manage order",
                list: result,
                user: "Admin",
                admin: true
            })
        })
    }

    static async infoBill(req: Request, res: Response) {
        const bill = await Promise.resolve(BillService.infoBill(req.params.idbill));
        let confirm = false, shipping = false, done = false;

        if(bill){
            if(bill.status === 'Confirm'){
                confirm = true;
            }else if(bill.status === 'Shipping'){
                shipping = true;
            }else if(bill.status === 'Done'){
                done = true;
            }
        }
        res.render('admin/infoBill', {
            title: "infor bill",
            list: bill?.products,
            admin: true,
            confirm,
            shipping,
            done
        })
    }

    static async update(req: Request, res: Response) {
        const code = req.body.code;
        const status = req.body.status;

        await BillService.update(code, status);
        res.redirect('/bill');
    }
}

export default BillController;