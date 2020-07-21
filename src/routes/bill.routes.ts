import BillController from '../controllers/bill.controller';
import express = require('express');
const router = express.Router();

router.get(
    '/',
    BillController.list
)

router.put(
    '/:code',
    BillController.update
)

export default router;