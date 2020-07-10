import express  from 'express';
const router = express.Router();

import userRoutes from './user.routes';
import productRoutes from './product.routes';
import authRoutes from './auth.routes';
router.get('/',(req,res)=>{
    res.render('home',{
        title: 'Home'
    })
})
router.use('/users', userRoutes);
router.use('/products',productRoutes);
router.use('/auth',authRoutes);

export default router;