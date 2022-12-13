const express = require("express");
const Favourite = require("../../models/Favourite.js");

const router = express.Router()

router.post("/",async(req,res)=>{
	const manufacturer = req.body;

	if (!manufacturer)
		return res.send(401).send("Bad Request")

	manufactureritem = {
		'name': manufacturer.name,
		'industry': manufacturer.industry,
		'technology': manufacturer.technology, 
		'link': manufacturer.link
    }

	try{
        const query = {_id:id};
        const update = { $push: {"manufacturers": {"$each": [manufactureritem]}}};
        const options = { };
        
        await Favourite.updateOne( query, update, options).then((response)=>{return res.status(200).send("success")})
    }catch(err){
        return res.status(500).send("Could not add manufacturer to favourites, try again in a few minutes");
    }
})

module.exports = router;