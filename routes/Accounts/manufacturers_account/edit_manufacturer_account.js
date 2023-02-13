//modules imports
const express = require('express');

//models import
const Manufacturer = require('../../../models/Manufacturer/Manufacturer.js');

let router = express.Router()

router.post('/',async (req,res,next)=>{
    const payload = req.body; //get payload
    
    //check if payload is available
    if(!payload){
        return  res.status(401).send('Bad Request'); 
    }
	const id = payload._id //use id to find existing user account
	const existing_manufacturer = await Manufacturer.findOne({_id:id});

	if (existing_manufacturer != null)
		try{
			const query = {_id:id};
	        const update = { $set: {
				contact_person_name:        payload.contact_person_name,
				contact_mobile:          	payload.contact_mobile,		
				contact_email:          	payload.contact_email,	
				email_of_company:   		payload.email_of_company,		
				mobile_of_company:  		payload.mobile_of_company,		
				address_of_company: 		payload.address_of_company,	
				company_name:       		payload.company_name,
				description:				payload.description,
				profile_photo_url:  		payload.profile_photo_url,
	        }};
	        const options = { };
	        
	        await Manufacturer.updateOne( query, update, options).then((response)=>{
				return res.status(200).send("success")
			})	
    	}catch(err){
			console.log(err)
			return res.status(500).send("could not edit profile at the moment");
		}
	else{
		return res.status(500).send("could not this account, it may have been deleted or it doesnt exist");
	}
})

module.exports = router;