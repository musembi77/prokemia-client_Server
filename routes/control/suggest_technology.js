const express = require("express");
const Technology = require("../../models/Utils/Technology.js");

const router = express.Router()

router.post("/",async(req,res)=>{
	//get payload
	const payload = req.body;
	//check if payload exists
	if (!payload)
		return res.send(401).send("Bad Request")

	const existing_technology = await Technology.findOne({title:payload.title});

	if (!existing_technology){
		try{
			const newTechnology= await Technology.create({
				title:			payload.title,
				cover_image: 	"",
				verification_status: 		false,
			})
			return res.status(200).send("successfully suggested a new technology")
		}catch(err){
			console.log(err)
			return res.status(500).send("Could not suggest a new technology")
		}
	}else{
	return res.status(401).send("This technology already exists")}
})

module.exports = router;