import BillService from '../services/bill.service';
import {Request, Response} from 'express';
class BillController {
    static list(Req:Request,res:Response) {
        Promise.resolve(BillService.list()).then((result)=>{
            res.render('admin/order',{
                title: "Manage order",
                list: result,
                user: "Admin",
                admin: true
            })
        })
    }
    static async update(req: Request, res: Response){
        const code = req.body.code;
        const status = req.body.status;

        await BillService.update(code, status);
        res.redirect('/bill');
    }
}

export default BillController;