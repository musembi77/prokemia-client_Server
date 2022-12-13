//modules imports
const express = require('express');

//models import
const Distributor = require('../../../models/Distributor/Distributor.js');

let router = express.Router()

router.post('/',async (req,res,next)=>{
    const payload = req.body; //get payload
    
    //check if payload is available
    if(!payload){
        return  res.status(401).send('Bad Request'); 
    }

	//get ids'
	const distributor_id = 	payload.distributor_id
	const existing_distributor = await Distributor.findOne({_id:distributor_id})

	if (existing_distributor != null)
		try{
			const query = {_id:id};
	        const update = { $set: {
	            subscription: 		true,
				subscription_plan:  payload.subscription_plan,
	        }};
	        const options = { };
	        
	        await Distributor.updateOne( query, update, options).then((response)=>{return res.status(200).send("success")})	
    	}catch(err){
			console.log(err)
			return res.status(500).send("could not upgrade your account to a paid plan at the moment");
		}
	else{
		return res.status(500).send("could not find this account, as it may have been deleted or it doesnt exist");
	}
})

module.exports = router;