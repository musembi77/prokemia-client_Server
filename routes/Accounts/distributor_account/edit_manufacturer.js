//modules imports
const express = require('express');

//models import
const Distributor = require('../../../models/Distributor/Distributor.js');

let router = express.Router()

router.post('/',async (req,res,next)=>{
    const payload = req.body; //get payload
    console.log(payload)
    //check if payload is available
    if(!payload){
        return  res.status(401).send('Bad Request'); 
    }

    const id = payload._id //use id to find existing user account
	const existing_distributor = await Distributor.findOne({_id:id}) //find user account

	if (existing_distributor != null)
	{
		const prev_name = payload.prev_name

		//create manufacturer object item
		manufacturer_item = {
			'name': 	payload.name,
			'email': 	payload.email,
			'mobile': 	payload.mobile
		}

		try{
			const query = {_id:id};
	        const update = { $pull: {"manufacturers": { name:prev_name}}};
	        const options = { };
			
			await Distributor.updateOne( query, update, options).then((response)=>{
				//console.log(response)
				//console.log('s1')
				//res.status(200).send("success")
			})
		}catch(err){
			console.log(err)
			return res.status(500).send("Could not edit this manufacturer, try again in a few minutes");
		}

		try{
			const query = {_id:id};
			const update = { $push: {"manufacturers": {"$each": [manufacturer_item]}}};
			const options = { };
			
			await Distributor.updateOne( query, update, options).then((response)=>{
				//console.log(response)
				//console.log('s2')
				return res.status(200).send("success")
			})
		}catch(err){
			console.log(err)
			return res.status(500).send("Could not edit this manufacturer, try again in a few minutes");
		}
	}else{
		return res.status(500).send("could not find this account, it may have been deleted or it doesnt exist");
	}
	
})

module.exports = router;