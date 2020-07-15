import express from 'express';
const router = express.Router();
import FavoriteController from '../controllers/favorite.controller';
router.get('/',FavoriteController.All);
router.post('/add/:idproduct/:type', FavoriteController.PostAdd);

export default router;