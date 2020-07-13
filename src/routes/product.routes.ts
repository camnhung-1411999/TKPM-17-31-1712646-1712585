import productController from '../controllers/product.controller';
import express,{Response, Request} from 'express';
const router = express.Router();
const fs = require('fs');
import multer from 'multer';
var upload = multer({dest:'uploads/'});

router.get('/',productController.products)

router.get('/:type',productController.productsFollowType);

router.get('/:id/:type',productController.productInformation);

router.post('/',productController.create);

router.get('/upload',productController.upload);

// ,upload.single('avatar')
router.post('/upload',upload.single('avatar'),productController.postUpload);

export default router;