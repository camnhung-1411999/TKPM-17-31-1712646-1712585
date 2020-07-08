import express from 'express';
const router = express.Router();
router.get('/',(req,res)=>{
    res.send('here is all user');
})

export default router;