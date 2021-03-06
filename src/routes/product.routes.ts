import productController from '../controllers/product.controller';
import express from 'express';
const router = express.Router();

router.get('/',productController.products);

router.get('/:type',productController.productsFollowType);

router.get('/:id/:type',productController.productInformation);

router.post('/',productController.create);
router.post("/:idproduct/:type/comments", productController.PostComments);


export default router;