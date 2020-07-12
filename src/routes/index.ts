import express  from 'express';
import {authenticateAccessToken} from '../utils/jsonwebtoken';
const router = express.Router();

import userRoutes from './user.routes';
import productRoutes from './product.routes';
import authRoutes from './auth.routes';
import adminRoutes from './admin.routes';
router.get('/home',authenticateAccessToken,(req,res)=>{
    res.render('home',{
        title: 'Home',
        user: req.user
    })
})
router.get('/',(req,res)=>{
    res.render('home',{
        title: 'Home',
        user: req.user
    })
})
router.use('/users', userRoutes);
router.use('/products',productRoutes);
router.use('/auth',authRoutes);
router.use('/admin',adminRoutes )

export default router;