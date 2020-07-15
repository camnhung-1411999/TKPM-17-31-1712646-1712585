import express, { Response, Request } from "express";
const router = express.Router();
import cartController from "../controllers/cart.controller";
router.post("/addtocart/:idproduct/:type", cartController.PostAddToCart);
router.get("/", cartController.Cart);
router.post("/remove/:idproduct/:type", cartController.Remove);
export default router;
