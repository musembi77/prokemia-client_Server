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
    
    try{
        if (!existing_manufacturer)
        	return res.status(400).send("could not find this account")

		await Manufacturer.findOneAndDelete({_id:id} ).then((response)=>{
			return res.status(200).send("Sucessfully deleted this account.")
		})
    }catch(err){
		console.log(err);
    	return res.status(500).send("could not delete this account at the moment")
    }
})

module.exports = router;