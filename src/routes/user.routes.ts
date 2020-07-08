import express from 'express';
const router = express.Router();
// import User from '../models/user.test';
import service from '../services/user.service';
import { array } from 'joi';

router.get('/',(req,res)=>{

     Promise.resolve(service.list()).then(result=>console.log(result));
    res.send('here is all user');
})

export default router;