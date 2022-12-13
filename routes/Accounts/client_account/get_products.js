//gets products listed by the user
const express = require('express')
const Product = require("../../../models/Utils/Product");

let router = express.Router()

router.get('/',async(req,res)=>{
    //get payload
    const payload = req.body;
    //check if i dont have a payload
    if (!payload)
        return res.status(401).send("Bad request")
    
    try{
        const products = await Product.find();
        //applying payload params to get results
        const response = (products?.filter((item)=> item.listed_by_id?.includes(payload.listed_by_id)));
        return res.status(200).json(response)
    }catch(err){
        console.log(err);
        return res.status(500).send("Could not get products")
    }
})

module.exports = router;