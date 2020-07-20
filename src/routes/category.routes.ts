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
router.put(
    '/:code',
    CategoryController.update
)
router.delete(
    '/:code',
    CategoryController.delete
)
export default router;