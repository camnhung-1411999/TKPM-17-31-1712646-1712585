import productController from '../controllers/product.controller';
import express from 'express';
const router = express.Router();

router.get('/',productController.list)

router.post('/',productController.create);
export default router;