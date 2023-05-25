//modules imports
const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
//models import
const Client = require("../../../models/Client/Client.js");
const Distributor = require("../../../models/Distributor/Distributor.js");
const Manufacturer = require("../../../models/Manufacturer/Manufacturer.js");
const Sales = require("../../../models/Sales/SalesPerson.js");

const router = express.Router();

router.post('/',async(req,res)=>{
	const payload = req.body; //gets payload
	// console.log(payload);

	if (!payload)
		return res.status(400).send("Bad Request, no payload found")

	const email = payload.email_of_company

	const client_result = await Client.findOne({email_of_company:email})
	const distributor_result= await Distributor.findOne({email_of_company:email})
	const manufacturer_result= await Manufacturer.findOne({email_of_company:email})
	const sales_result= await Sales.findOne({email_of_salesperson:email})


	// console.log(client_result,distributor_result,manufacturer_result,sales_result)
	//let user_result = null; // gets the user from non-null query
	//console.log(client_result)
	//sign a token and encrypt password
    const salt = bcrypt.genSaltSync(10);
    const encrypted_password = bcrypt.hashSync(payload.password, salt);
	
	if (client_result !== null){
		const id = client_result?._id
		try{
			const query = {_id:id};
	        const update = { $set: {
				password:           encrypted_password,
	        }};
	        const options = { };
	        
	        await Client.updateOne( query, update, options).then((response)=>{return res.status(200).send("success")})	
    	}catch(err){
			console.log(err)
			return res.status(500).send("could not edit profile at the moment");
		}
	}else if (distributor_result !== null){
		const id = distributor_result?._id
		try{
			const query = {_id:id};
	        const update = { $set: {
				password:           encrypted_password,
	        }};
	        const options = { };
	        
	        await Distributor.updateOne( query, update, options).then((response)=>{return res.status(200).send("success")})	
    	}catch(err){
			console.log(err)
			return res.status(500).send("could not edit profile at the moment");
		}
	}else if (manufacturer_result !== null){
		const id = manufacturer_result?._id
		try{
			const query = {_id:id};
	        const update = { $set: {
				password:           encrypted_password,
	        }};
	        const options = { };
	        
	        await Manufacturer.updateOne( query, update, options).then((response)=>{return res.status(200).send("success")})	
    	}catch(err){
			console.log(err)
			return res.status(500).send("could not edit profile at the moment");
		}
	}else if (sales_result !== null){
		const id = sales_result?._id
		try{
			const query = {_id:id};
	        const update = { $set: {
				password:           encrypted_password,
	        }};
	        const options = { };
	        
	        await Sales.updateOne( query, update, options).then((response)=>{return res.status(200).send("success")})	
    	}catch(err){
			console.log(err)
			return res.status(500).send("could not edit profile at the moment");
		}
	}else{
		return res.status(400).send("could not find an account, that uses this email.");
	}
})

module.exports = router;