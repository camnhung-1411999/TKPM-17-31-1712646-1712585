import express = require('express');
// import joi = require('joi');

const router = express.Router();
router.get(
    '/',
    (req,res)=>{
        res.render('admin/home',{title:"admin"});
    }
)
router.get(
    '/category',
    (req,res)=>{
        res.render('admin/categories',{title:"Manage categories"});
    }
)

router.get(
    '/order',
    (req,res)=>{
        res.render('admin/order',{title:"Manager order"})
    }
)

export default router;