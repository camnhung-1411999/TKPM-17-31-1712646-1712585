import express from 'express';
const router = express.Router();
import { authenticateAccessToken } from "../utils/jsonwebtoken";
import productCollection from '../models/product.model';
router.get("/", authenticateAccessToken, async (req, res) => {

    let products = await productCollection.find({}).limit(9);
    res.render("home", {
        title: "Home",
        user: req.user,
        products
    });
});

router.get("/home", authenticateAccessToken, (req, res) => {
    res.render("home", {
        title: "Home",
        user: req.user,
    });
})

router.post('/search',authenticateAccessToken, (req,res)=>{
    res.redirect('/products?search='+req.body.search)
    // res.send(req.body.search);
})
export default router;