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

    const id = payload._id //use id to find existing user account
	const existing_distributor = await Distributor.findOne({_id:id}) //find user account

	if (existing_distributor != null)
	{
		const name = payload.name
		try{
			const query = {_id:id};
	        const update = { $pull: {"manufacturers": { name:name}}};
	        const options = { };
			
			await Distributor.updateOne( query, update, options).then((response)=>{
				console.log(response)
				return res.status(200).send("success")
			})
		}catch(err){
			console.log(err)
			return res.status(500).send("Could not delete this manufacturer, try again in a few minutes");
		}
	}else{
		return res.status(500).send("could not find this account, it may have been deleted or it doesnt exist");
	}
	
})

module.exports = router;