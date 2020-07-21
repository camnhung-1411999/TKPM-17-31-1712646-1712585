import CartCollection, { ICart } from "../models/cart.model";

class cartService {
  static async list(username: string): Promise<ICart[] | null> {
    return await CartCollection.find({ username: username });
  }
  static async create(cart: ICart): Promise<ICart> {
    return await CartCollection.create(cart);
  }
  static async remove(idproduct: string, type: string):Promise<ICart|null> {
    return await CartCollection.findOneAndDelete({ idproduct, type });
  }
}

export default cartService;
