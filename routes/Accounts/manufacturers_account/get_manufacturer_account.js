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
    const id = payload._id //get the Manufacturer id
    console.log(payload)
	const existing_Manufacturer = await Manufacturer.findOne({_id:id}) //checks if a manufacturer_Account already exists
    console.log(existing_Manufacturer)
	if (existing_Manufacturer != null) //if there is a manufacturer_account
		return res.status(200).send(existing_Manufacturer);
	return res.status(500).send("could not find this account, it may have been deleted or it doesnt exist");
});

module.exports = router;