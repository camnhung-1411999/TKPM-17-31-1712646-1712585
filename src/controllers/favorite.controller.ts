import favoriteService from "../services/favorite.service";
import productService from "../services/product.service";
import { Request, Response } from "express";
// import { IFavorite } from "../models/favorite.model";
import IFavorite from '../Components/favorite';
import { IProduct } from "../models/product.model";
class FavoriteController {
    static All(req: Request, res: Response) {
        let username = req.user.username;
        Promise.resolve(favoriteService.list(username).then((result: IFavorite[] | null) => {
            res.render('favorite/favorite', { title: 'Favorite List', list: result,user:req.user });
        }))
    }

    static PostAdd(req: Request, res: Response) {
        let username = req.user.username;
        let idproduct = req.params.idproduct;
        let type = req.params.type;
        Promise.resolve(favoriteService.find(username, idproduct, type).then((result: IFavorite | null) => {
            if (result) {
                res.cookie("favoriteexist", "false");
                res.redirect("/cart");
            } else {
                Promise.resolve(productService.find(type, idproduct).then((result: IProduct | null) => {
                    if (result) {
                        let favorite: IFavorite = {
                            idproduct: idproduct,
                            type: type,
                            username: username,
                            image: result.image,
                            nameproduct: result.name,
                            price: result.price,
                        }
                        favoriteService.create(favorite);
                        res.cookie("favoriteexist", "true");
                        res.redirect("/cart");
                    } else {
                        res.status(403).json({
                            message: "cannot find product to add favorite list",
                            status: 403,
                        });
                    }
                })
                );
            }
        })
        );
    }
}

export default FavoriteController;
