//modules imports
const express = require("express");
//models imports
const Request_Demo_Ticket = require("../../models/Support/Request_Demo_Ticket.js");

const router = express.Router()

router.post("/",async(req,res)=>{
	const payload = req.body;
	console.log(payload)
	if (!payload)
		return res.status(401).send("Bad Request")

	try{
		const new_ticket = await Request_Demo_Ticket.create({
			name:			payload.name,
			email:  	    payload.email,
            mobile:  	    payload.mobile,
            job_function:  	payload.job_function,
            completed_status: false,
            completed_by:   ''
		})
		
		return res.status(200).send("successfully created a new ticket, we will contact you soon.")
	}catch(err){
		console.log(err)
		return res.status(500).send("Could not create a new ticket.")
	}
})

module.exports = router;