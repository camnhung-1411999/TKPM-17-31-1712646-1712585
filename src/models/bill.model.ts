import mongoose from "mongoose";
type IProBill = {
    nameproduct: String,
    idproduct: String,
    type: String,
    numbuy: String,
    price: String,
}
export type IBill = mongoose.Document & {
    username: String,
    name: String,
    email: String,
    phone: String,
    deliveryadress: String,
    products: IProBill[],
    sumprice: String,
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
    products: [IProBillSchema],
},
{timestamps: true});
const BillCollection = mongoose.model<IBill>("bill", billSchema);
export default BillCollection;