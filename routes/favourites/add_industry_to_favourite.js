const express = require("express");
const Favourite = require("../../models/Favourite.js");

const router = express.Router()

router.post("/",async(req,res)=>{
	const industry = req.body;

	if (!industry)
		return res.send(401).send("Bad Request")

	industryitem = {
		'name': industry.name,
		'link': industry.link
    }

	try{
        const query = {_id:id};
        const update = { $push: {"industries": {"$each": [industryitem]}}};
        const options = { };
        
        await Favourite.updateOne( query, update, options).then((response)=>{return res.status(200).send("success")})
    }catch(err){
        return res.status(500).send("Could not add industry to favourites, try again in a few minutes");
    }
})

module.exports = router;