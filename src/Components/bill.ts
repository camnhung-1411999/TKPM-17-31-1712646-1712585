export interface IProBill{
    nameproduct: String,
    idproduct: String,
    type: String,
    numbuy:String,
    price: String,
}
export interface IBill{
    code: String,
    username: String,
    name: String,
    email: String,
    phone: String,
    deliveryadress: String,
    products: IProBill[],
    sumprice: String,
    status:String
}

