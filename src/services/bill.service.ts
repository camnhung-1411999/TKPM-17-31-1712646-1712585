import BillCollection from '../models/bill.model';
import {IBill} from '../Components/bill';

class billService{
    static async create(bill:any):Promise<IBill>{
        return await BillCollection.create(bill);
    }
}
export default billService;