//modules imports
const express = require('express');

//models import
const Manufacturer = require('../../../models/Manufacturer/Manufacturer.js');
const Manufacturer_Request = require('../../../models/Manufacturer/Manufacturer_Request');

let router = express.Router()

router.post('/',async (req,res,next)=>{
    const payload = req.body; //get payload
    console.log(payload)
    //check if payload is available
    if(!payload){
        return  res.status(401).send('Bad Request'); 
    }

    const id = payload._id //use id to find existing user account
	const existing_manufacturer = await Manufacturer.findOne({_id:id});

	if (!existing_manufacturer)
		return res.status(400).send('could not find this account')

	try{
		const new_obj = await Manufacturer_Request.create({
			industry: 				payload.industry,
			technology: 			payload.technology,
			region: 				payload.region,
			description: 			payload.description,
			name_of_requester: 		payload.name_of_requester,
			id_of_requester:		id,
			complete_request:       false
		})
		//console.log(new_obj)
		return res.status(200).send("successfully created this request")
	}catch(err){
		console.log(err)
		return res.status(500).send("Could not create this request")
	}
})

module.exports = router;