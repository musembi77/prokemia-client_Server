const express = require("express");
const Industry = require("../../models/Utils/Industry.js");

const router = express.Router()

router.post("/",async(req,res)=>{
	//get payload
	const payload = req.body;
	//check if payload exists
	if (!payload)
		return res.send(401).send("Bad Request")

	const existing_industry = await Industry.findOne({title:payload.title});

	if (!existing_industry){
		try{
		const newIndustry = await Industry.create({
			title:						payload.title,
			cover_image: 				"",
			verification_status: 		false, 
		})
		return res.status(200).send("successfully suggested a new industry")
	}catch(err){
		console.log(err)
		return res.status(500).send("Could not suggest a new industry")
	}
	}else{
		return res.status(401).send("This industry already exists")
	}
})

module.exports = router;