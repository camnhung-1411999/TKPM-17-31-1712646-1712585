import express = require('express');
const router = express.Router();
import productService from '../services/product.service';

router.get('/',(req,res)=>{
    Promise.resolve(
        productService.list().then((result: any) => {
          res.render("admin/products", { title: "Cart", list: result, size: result.length, user: req.user, admin: true });
        })
      );
});

router.post('/remove/:idproduct/:type',async (req,res)=>{
    let idproduct = req.params.idproduct;
    await productService.delete(idproduct);
    res.redirect('/admin/products');
})


export default router;