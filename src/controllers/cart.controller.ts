import { Request, Response} from "express";
import cartService from "../services/cart.service";
import productService from "../services/product.service";
import CartCollection, { ICart } from "../models/cart.model";
import { IProduct } from "../models/product.model";
class CartController {
  static Cart(req: Request, res: Response) {
    Promise.resolve(
      cartService.list(req.user.username).then((result:any) => {
        res.render("cart/cart", { title: "Cart", list: result, size: result.length });
      })
    );
  }

  static PostAddToCart(req: Request, res: Response) {
    let idproduct = req.params.idproduct;
    let type = req.params.type;

    Promise.resolve(
      productService.find(type, idproduct).then((result: IProduct | null) => {
        if (result) {
          if (result) {
            let num: String = req.body.number;
            let name: String = "hoangman";
            let temp: String = result.price;
            result.price = temp.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
            const cart = new CartCollection({
              username: name,
              idproduct: result.idproduct,
              image: result.image,
              nameproduct: result.name,
              type: result.type,
              numproduct: num,
              price: result.price
            });
            cart.save();
            // result.numberproduct =
            //   Number(result.numberproduct) - Number(num) + "";
            // productService.update(idproduct, result);
          }
        } else {
          res.cookie("addtocart", true);
        }
        res.redirect("/products/" + idproduct + "/" + type + "/");
      })
    );
  }

  static Remove(req:Request, res:Response){
    Promise.resolve( cartService.remove(req.params.idproduct, req.params.type).then(result =>{
      res.redirect('/cart');
    }))
    
  }
}
export default CartController;
