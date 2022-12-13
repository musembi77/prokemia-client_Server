//modules imports
const express = require("express");
//models imports
const Mailing_list = require("../../models/Support/Landing_page_mailing_list");

const router = express.Router()

router.post("/",async(req,res)=>{
	const payload = req.body;

	if (!payload)
		return res.send(401).send("Bad Request")

	try{
		const new_Email = await Mailing_list.create({
			name:			payload.name,
			email:  	    payload.email,
			mobile:	        payload.mobile,
		})
		
		return res.status(200).send("successfully added to mailing list")
	}catch(err){
		console.log(err)
		return res.status(500).send("Could not add to mailing list")
	}
})

module.exports = router;