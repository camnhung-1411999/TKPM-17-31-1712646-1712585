import productController from '../controllers/product.controller';
import express from 'express';
const router = express.Router();

router.get('/',productController.products)

router.post('/',productController.create);

router.get('/upload',productController.upload);

router.post('/upload',productController.postUpload);

export default router;