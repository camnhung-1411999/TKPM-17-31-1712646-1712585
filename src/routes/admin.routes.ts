import express = require('express');
// import joi = require('joi');

const router = express.Router();
router.get(
    '/',
    (req,res)=>{
        res.render('admin/home',{
            title:"admin",
            user: "Admin"
        });
    }
)


export default router;