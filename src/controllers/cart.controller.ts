import e, { Request, Response } from "express";
import cartService from "../services/cart.service";
import productService from "../services/product.service";
import { ICart } from "../models/cart.model";
import { IProduct } from "../models/product.model";
class CartController {
  static PostAddToCart(req: Request, res: Response) {
    let idproduct = req.params.idproduct;
    let type = req.params.type;

    Promise.resolve(
      productService.find(type, idproduct).then((result: IProduct | null) => {
        if (result) {
          if (result) {
            console.log(req.user);
            let num:String = req.body.number;
            let name:String = "hoangman";
            const cart =new ICart
            ( {
              username: name,
              idproduct: result.idproduct,
              type: result.type,
              numproduct: num,
            });
            //tau là mèo đây, và t đang chat với ngươi
            cartService.create(cart);
          }
        } else {
          res.cookie("addtocart", true);
        }
        res.redirect("/products/" + idproduct + "/" + type + "/");
      })
    );
  }
}
export default CartController;
