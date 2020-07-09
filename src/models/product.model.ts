import mongoose from 'mongoose';

export type IProduct = mongoose.Document &{
    idproduct: String,
    name: String,
    image: String,
    decription: String,
    price: String,
};

const productSchema = new mongoose.Schema({
    idproduct:{
        type: String,
        unique: true
    },
    name: String,
    image: String,
    decription: String,
    price: String
}, {timestamps: true});

const ProductCollection = mongoose.model<IProduct>('products',productSchema);
export default ProductCollection;