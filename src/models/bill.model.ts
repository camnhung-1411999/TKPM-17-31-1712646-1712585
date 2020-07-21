import mongoose from "mongoose";
type IProBill = {
    code: String,
    nameproduct: String,
    idproduct: String,
    type: String,
    numbuy: String,
    price: String,
    status: String
}
export type IBill = mongoose.Document & {
    code: String,
    username: String,
    name: String,
    email: String,
    phone: String,
    deliveryadress: String,
    products: IProBill[],
    sumprice: String,
    status: String,
}

const IProBillSchema = new mongoose.Schema(
    {
        nameproduct: String,
        idproduct: String,
        type: String,
        numbuy: String,
        price: String,
    }
)

const billSchema = new mongoose.Schema({
    username: String,
    name: String,
    email: String,
    phone: String,
    deliveryadress: String,
    status: String,
    code: String,
    products: [IProBillSchema],
},
{timestamps: true});
const BillCollection = mongoose.model<IBill>("bill", billSchema);
export default BillCollection;