//modules imports
const express = require("express");
//models imports
const Distributor = require('../../../models/Distributor/Distributor.js');

const router = express.Router();

router.post('/',async(req,res)=>{
	//get paylaod
	const payload = req.body; 
	//check if payload exists
	if (!payload)
		return res.status(400).send("Bad Request")
	
	let id = payload._id // use payload to find user account

	const existing_distributor = await Distributor.findOne({_id:id})

	if (existing_distributor != null)
	{
		//create manufacturer object item
		manufacturer_item = {
			'name': 	payload.name,
			'email': 	payload.email,
			'mobile': 	payload.mobile
		}

		try{
			const query = {_id:id};
			const update = { $push: {"manufacturers": {"$each": [manufacturer_item]}}};
			const options = { };
			
			await Distributor.updateOne( query, update, options).then((response)=>{
				return res.status(200).send("success")
			})
		}catch(err){
			return res.status(500).send("Could not add a manufacturer, try again in a few minutes");
		}
	}else{
		return res.status(500).send("could not find this account, it may have been deleted or it doesnt exist");
	}
	
})

module.exports = router;