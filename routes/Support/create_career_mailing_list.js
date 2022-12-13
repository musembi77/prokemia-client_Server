//modules imports
const express = require("express");
//models imports
const Mailing_list = require("../../models/Support/Career_mailing_list");

const router = express.Router()

router.post("/",async(req,res)=>{
	const payload = req.body;

	if (!payload)
		return res.status(401).send("Bad Request")

	const existing_email = await Mailing_list.find({email:payload.email})

	if (existing_email != null)
		return res.status(400).send("Your email already exists in our list")

	try{
		const new_acc = await Mailing_list.create({
			name:			payload.name,
			email:  	    payload.email,
		})
		
		return res.status(200).send("successfully added to mailing list")
	}catch(err){
		console.log(err)
		return res.status(500).send("Could not add to mailing list")
	}
})

module.exports = router;