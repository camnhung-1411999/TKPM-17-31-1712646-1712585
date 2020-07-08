import express  from 'express';
const router = express.Router();

import userRoutes from './user.routes';
router.get('/',(req,res)=>{
    res.render('home',{
        title: 'Home'
    })
})
router.use('/users', userRoutes);

export default router;