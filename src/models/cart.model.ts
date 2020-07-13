import mongoose from "mongoose";

export type ICart = mongoose.Document & {
  username: String,
  idproduct: String,
  type: String,
  numproduct: String,
};

const cartSchema = new mongoose.Schema(
  {
    username: String,
    idproduct: String,
    type: String,
    numproduct: String,
  },
  { timestamps: true }
);

const CartCollection = mongoose.model<ICart>("cart", cartSchema);
export default CartCollection;
