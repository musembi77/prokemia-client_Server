//modules imports
const express = require('express');
const bcrypt = require('bcryptjs');
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
	{
		const salt = bcrypt.genSaltSync(10);
		const encrypted_new_password = bcrypt.hashSync(payload.new_password,salt)
		try{
			const query = {_id:id};
			const update = { $set: {
				password: encrypted_new_password,
			}};
			const options = { };
			
			await Manufacturer.updateOne( query, update, options).then((response)=>{return res.status(200).send("success")})	
		}catch(err){
			console.log(err)
			return res.status(500).send("could not change the password at the moment");
		}
	}else{
		return res.status(500).send("could not find this account, it may have been deleted or it doesnt exist");
	}
})

module.exports = router;