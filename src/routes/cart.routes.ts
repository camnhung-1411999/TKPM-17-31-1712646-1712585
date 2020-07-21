import express, { Response, Request } from "express";
const router = express.Router();
import cartController from "../controllers/cart.controller";
router.get("/", cartController.Cart);
router.get('/checkout',cartController.CheckOut);
router.post('/Checkout',cartController.PostCheckOut);

router.post("/addtocart/:idproduct/:type", cartController.PostAddToCart);
router.post("/remove/:idproduct/:type", cartController.Remove);

export default router;
