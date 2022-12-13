const express = require("express");
const Favourite = require("../../models/Favourite.js");

const router = express.Router()

router.post("/",async(req,res)=>{
	const distributor = req.body;

	if (!distributor)
		return res.send(401).send("Bad Request")

	distributoritem = {
		'name': distributor.name,
		'industry': distributor.industry,
		'technology': distributor.technology, 
		'link': distributor.link
    }

	try{
        const query = {_id:id};
        const update = { $push: {"distributors": {"$each": [distributoritem]}}};
        const options = { };
        
        await Favourite.updateOne( query, update, options).then((response)=>{return res.status(200).send("success")})
    }catch(err){
        return res.status(500).send("Could not add distributor to favourites, try again in a few minutes");
    }
})

module.exports = router;