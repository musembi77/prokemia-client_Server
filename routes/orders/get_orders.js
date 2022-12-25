const express = require("express")

const Order = require("../../models/Utils/Order.js");

const router = express.Router();

router.get('/',async(req,res)=>{
    console.log('test')
    try{
        const orders = await Order.find();
        console.log(orders)
        return res.status(200).send(orders)
    }catch(err){
        console.log(err);
    }
})

module.exports = router;