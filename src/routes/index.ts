import express  from 'express';
const router = express.Router();

import userRoutes from './user.routes';
import productRoutes from './product.routes';
router.get('/',(req,res)=>{
    res.render('home',{
        title: 'Home'
    })
})
router.use('/users', userRoutes);
router.use('/products',productRoutes);

export default router;