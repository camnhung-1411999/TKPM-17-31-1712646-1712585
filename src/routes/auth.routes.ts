import validation from '../utils/validation';
import check from '../utils/auth';

import express = require('express');
import { fail } from 'assert';
// import joi = require('joi');

const router = express.Router();

router.get(
    '/login',
    (req,res)=>{
        res.render('auth/signin',{title:"login"});
    }
)
router.get(
    '/logout',
    (req,res)=>{
        res.clearCookie('token');
        res.redirect('/auth/login');
    }
)
router.get(
    '/signup',
    (req,res)=>{
        res.clearCookie('token');
        res.render('auth/signup',{title:"signup"});
    }
)

router.post(
    '/login',
    check.account,
    (req,res)=>{
        res.redirect('/home');
    }

)
export default router;