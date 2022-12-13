const express = require("express");
const Favourite = require("../../models/Favourite.js");

const router = express.Router()

router.post("/",async(req,res)=>{
	const product = req.body;

	if (!product)
		return res.send(401).send("Bad Request")

	productitem = {
		'name': product.name,
		'industry': product.industry,
		'technology': product.technology, 
		'link': product.link
    }

	try{
        const query = {_id:id};
        const update = { $push: {"products": {"$each": [productitem]}}};
        const options = { };
        
        await Favourite.updateOne( query, update, options).then((response)=>{return res.status(200).send("success")})
    }catch(err){
        return res.status(500).send("Could not add product to favourites, try again in a few minutes");
    }
})

module.exports = router;