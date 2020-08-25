import CategoryController from '../controllers/category.controller';
import express = require('express');
const router = express.Router();

router.get(
    '/',
    CategoryController.list
)

router.get(
    '/:code',
    CategoryController.find
)
router.post(
    '/',
    CategoryController.create
)
router.post(
    '/renamecate',
    CategoryController.update
)
router.post(
    '/deletecate',
    CategoryController.delete
)
export default router;