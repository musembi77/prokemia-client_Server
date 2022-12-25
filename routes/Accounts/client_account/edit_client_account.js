//modules import
const express = require("express");

//models imports
const Client = require('../../../models/Client/Client');

const router = express.Router();

router.post('/',async(req,res)=>{
	const payload = req.body; 

	if (!payload)
		return res.status(400).send("Bad Request")

	const id = payload._id //get the client id

	const existing_client = await Client.findOne({_id:id}) //checks if a client_Account already exists

	if (existing_client != null) //if there is a client_account
		try{
			const query = {_id:id};
	        const update = { $set: {
				first_name: 		payload.first_name,
				last_name: 			payload.last_name,
				company_name: 		payload.company_name,
				mobile_of_company:  payload.mobile_of_company,		
				email_of_company:   payload.email_of_company,
				address: 			payload.address_of_company,
				position:           payload.position,	
				gender:             payload.gender,
	        }};
	        const options = { };
	        
	        await Client.updateOne( query, update, options).then((response)=>{return res.status(200).send("success")})	
    	}catch(err){
		console.log(err)
		return res.status(500).send("could not edit profile at the moment");
	}
	else{
		return res.status(500).send("could not this account, it may have been deleted or it doesnt exist");
	}
})

module.exports = router;