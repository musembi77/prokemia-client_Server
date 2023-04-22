//modules imports
const express = require('express');

//models import
const Manufacturer = require('../../../models/Manufacturer/Manufacturer.js');

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

	if (existing_manufacturer != null)
	{
		const prev_name = payload.prev_name

		distributor_item = {
			'name': 	payload.name,
			'email': 	payload.email,
			'mobile': 	payload.mobile,
			'industry':  payload.industry
		}

		try{
			const query = {_id:id};
	        const update = { $pull: {"distributors": { name:prev_name}}};
	        const options = { };
			
			await Manufacturer.updateOne( query, update, options).then((response)=>{
				//console.log(response)
				//console.log('s1')
				//res.status(200).send("success")
			})
		}catch(err){
			console.log(err)
			return res.status(500).send("Could not edit this distributor, try again in a few minutes");
		}

		try{
			const query = {_id:id};
			const update = { $push: {"distributors": {"$each": [distributor_item]}}};
			const options = { };
			
			await Manufacturer.updateOne( query, update, options).then((response)=>{
				//console.log(response)
				//console.log('s2')
				return res.status(200).send("success")
			})
		}catch(err){
			console.log(err)
			return res.status(500).send("Could not edit this distributor, try again in a few minutes");
		}
	}else{
		return res.status(500).send("could not find this account, it may have been deleted or it doesnt exist");
	}
	
})

module.exports = router;