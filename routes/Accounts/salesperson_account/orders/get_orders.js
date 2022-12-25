//modules import
const express = require("express");
//models import
const Order = require("../../../../models/Utils/Order.js");

const router = express.Router()

router.get("/",async(req,res)=>{
	//get payload
	const payload = req.body;
	//check if payload exists
	if (!payload)
		return res.send(401).send("Bad Request")

    try{
        const orders = await Order.find();
        const response = (orders?.filter((item)=> item.creator_id?.includes(payload._id)));
        return res.status(200).send(response)
    }catch(err){
        console.log(err);
        return res.status(500).send("could not fetch orders")
    }
})

module.exports = router;