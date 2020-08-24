import { Request, Response } from "express";
import cartService from "../services/cart.service";
import productService from "../services/product.service";
import billService from "../services/bill.service";

import CartCollection, { ICart } from "../models/cart.model";
import { IProduct } from "../models/product.model";
import { IUser } from "../models/user.model";
import { IBill, IProBill } from '../Components/bill';

import userService from "../services/user.service";


class CartController {
  static Cart(req: Request, res: Response) {
    Promise.resolve(
      cartService.list(req.user.username).then((result: any) => {
        res.render("cart/cart", { title: "Cart", list: result, size: result.length, user: req.user });
      })
    );
  }

  static CheckOut(req: Request, res: Response) {
    let user: IUser;
    Promise.resolve(userService.find(req.user.username).then((result: IUser | null) => {
      if (result) {
        user = result;
      }
    }))
    Promise.resolve(cartService.list(req.user.username).then((result: ICart[] | null) => {
      res.render('pay/checkout', { title: 'check out', list: result, user });
    }))
  }

  static async BillUser(req: Request, res: Response) {
    let bills = await Promise.resolve(billService.listFollowUser(req.user.username));
    res.render('pay/bill', { title: "Bill's" + req.user.username, bills });
  }

  static async PostCheckOut(req: Request, res: Response) {
    let product: ICart[] | null = await Promise.resolve(cartService.list(req.user.username));
    let proInBills: IProBill[] = [];
    if (product) {
      product.forEach(element => {
        let proInBill: IProBill = {
          idproduct: element.idproduct,
          nameproduct: element.nameproduct,
          type: element.type,
          numbuy: element.numproduct,
          price: element.price,
          image: element.image
        };
        proInBills.push(proInBill);
      });
    }

    let sum: number = 0;
    proInBills.forEach((element, index) => {
      let arr = element.price.split(',');
      let str = '';
      arr.map((value) => {
        str += value;
      })
      sum += Number(str) * Number(element.numbuy);
    });
    let temp = String(sum);
    let result = temp.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");



    const num = await (await billService.list()).length;
    let bill: IBill = {
      code: req.user.username + num,
      username: req.user.username,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      deliveryadress: req.body.address,
      products: proInBills,
      sumprice: result,
      status: 'Processing..'
    };
    billService.create(bill);
    if (product) {
      product.forEach(async element => {
        cartService.remove(String(element.idproduct), String(element.type));
        let pro: IProduct | null = await productService.find(String(element.type), String(element.idproduct));
        if (pro) {
          productService.update(element.idproduct + '', { numberproduct: Number(pro.numberproduct) - Number(element.numproduct) });
        }
      });
    }
    res.cookie("paysucess",true);
    res.redirect('/cart');

   

  }

  static PostAddToCart(req: Request, res: Response) {
    let idproduct = req.params.idproduct;
    let type = req.params.type;

    Promise.resolve(
      productService.find(type, idproduct).then((result: IProduct | null) => {
        if (result) {
          if (result) {
            let num: String = req.body.number;
            let name: String = req.user.username;
            let temp: String = result.price;
            result.price = temp.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
            const cart = new CartCollection({
              username: name,
              idproduct: result.idproduct,
              image: result.image,
              nameproduct: result.name,
              type: result.type,
              numproduct: num,
              price: result.price,
            });
            cart.save();
            res.cookie("addtocart", true);

          }
        } else {
          res.cookie("addtocart", false);
        }
        res.redirect("/products/" + idproduct + "/" + type + "/");
      })
    );
  }

  static PostBuyNow(req: Request, res: Response) {
    let idproduct = req.params.idproduct;
    let type = req.params.type;

    Promise.resolve(
      productService.find(type, idproduct).then((result: IProduct | null) => {
        if (result) {
          if (result) {
            let num: String = req.body.number;
            let name: String = req.user.username;
            let temp: String = result.price;
            result.price = temp.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
            const cart = new CartCollection({
              username: name,
              idproduct: result.idproduct,
              image: result.image,
              nameproduct: result.name,
              type: result.type,
              numproduct: num,
              price: result.price,
            });
            cart.save();
          }
        } else {
          res.cookie("addtocart", true);
        }
        res.redirect("/cart");
      })
    );
  }

  static Remove(req: Request, res: Response) {
    Promise.resolve(cartService.remove(req.params.idproduct, req.params.type).then(result => {
      res.redirect('/cart');
    }))

  }

}
export default CartController;
