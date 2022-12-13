const express = require("express");
const Favourite = require("../../models/Favourite.js");

const router = express.Router()

router.post("/",async(req,res)=>{
	const technology = req.body;

	if (!technology)
		return res.send(401).send("Bad Request")

	technologyitem = {
		'name': technology.name,
		'link': technology.link
    }

	try{
        const query = {_id:id};
        const update = { $push: {"technologies": {"$each": [technologyitem]}}};
        const options = { };
        
        await Favourite.updateOne( query, update, options).then((response)=>{return res.status(200).send("success")})
    }catch(err){
        return res.status(500).send("Could not add technology to favourites, try again in a few minutes");
    }
})

module.exports = router;