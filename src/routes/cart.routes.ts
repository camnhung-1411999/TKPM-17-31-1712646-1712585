import express,{Response, Request} from 'express';
const router = express.Router();
import cartController from '../controllers/cart.controller';
router.post('/addtocart/:idproduct/:type',cartController.PostAddToCart);
export default router;