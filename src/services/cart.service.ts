import CartCollection,{ICart} from '../models/cart.model';

class cartService{
   static async find(username:string):Promise<ICart|null>{
       return await CartCollection.findOne({username:username});
   };
   static async create(cart:ICart):Promise<ICart>{
       return await CartCollection.create(cart);
   };
}

export default cartService;