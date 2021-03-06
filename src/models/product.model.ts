import mongoose from "mongoose";

export type IProduct = mongoose.Document & {
  idproduct: String;
  name: String;
  image: String;
  decription: String;
  price: String;
  type: String,
  numberproduct: String,
  size: [];
};

const productSchema = new mongoose.Schema(
  {
    idproduct:{
        type:String,
        unique: true,
    },
    name: String,
    image: String,
    decription: String,
    price: String,
    type: String,
    numberproduct: String,
    size: [],
  },
  { timestamps: true }
);
productSchema.index({name: 'text'});
const ProductCollection = mongoose.model<IProduct>("product", productSchema);
export default ProductCollection;
