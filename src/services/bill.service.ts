import BillCollection from '../models/bill.model';
import {IBill} from '../Components/bill';

class billService{
    static async create(bill:any):Promise<IBill>{
        return await BillCollection.create(bill);
    }

    static async update(code: string,status: string):Promise<IBill | null>{
        const bill = await BillCollection.findOneAndUpdate({code:code},{status: status});
        return bill;
    }
    static async list(){
        const bill = await BillCollection.find();
        return bill;
    }
}
export default billService;