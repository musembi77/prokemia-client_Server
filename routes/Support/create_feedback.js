//modules imports
const express = require("express");
//models imports
const Feedback = require("../../models/Support/Feedback.js");

const router = express.Router()

router.post("/",async(req,res)=>{
	const payload = req.body;

	if (!payload)
		return res.send(401).send("Bad Request")

	try{
		const new_Feedback = await Feedback.create({
			name:			payload.name,
			email:  	    payload.email,
			feedback:		payload.feedback,
            rate:           payload.rate
		})
		
		return res.status(200).send("successfully posted a feedback")
	}catch(err){
		console.log(err)
		return res.status(500).send("Could not post a feedback")
	}
})

module.exports = router;