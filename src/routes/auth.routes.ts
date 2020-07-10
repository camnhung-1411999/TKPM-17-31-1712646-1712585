import validation from '../utils/validation';
import check from '../utils/auth';

import express = require('express');
// import joi = require('joi');

const router = express.Router();

router.get(
    '/login',
    (req,res)=>{
        res.render('auth/signin',{title:"login"});
    }
)
export default router;