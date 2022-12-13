//module imports
const express = require("express");
const bcrypt = require('bcryptjs');

//models imports
const Sales = require('../../../models/Sales/SalesPerson.js');

const router = express.Router();

router.post('/',async(req,res)=>{
	//get payload
	const payload = req.body;  
	//check if payload exists
	if (!payload)
		return res.status(400).send("Bad Request")
	
	//use the id to find existing user_account
	const id = payload._id //get the salesperson id
	const existing_salesperson = await Sales.findOne({_id:id})

	if (existing_salesperson != null){
		//encrypt new password
		const salt = bcrypt.genSaltSync(10);
		const encrypted_new_password = bcrypt.hashSync(payload.new_password,salt)
		try{
			const query = {_id:id};
			const update = { $set: {
				password: encrypted_new_password,
			}};
			const options = { };
			
			await Sales.updateOne( query, update, options).then((response)=>{
				return res.status(200).send("success")
			})	
		}catch(err){
			console.log(err)
			return res.status(500).send("could not change the password at the moment");
		}
	}else{
		return res.status(500).send("could not find this account, it may have been deleted or it doesnt exist");
	}

})

module.exports = router;