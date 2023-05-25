//modules imports
const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
//models import
const Client = require("../../models/Client/Client.js");
const Distributor = require("../../models/Distributor/Distributor.js");
const Manufacturer = require("../../models/Manufacturer/Manufacturer.js");
const Sales = require("../../models/Sales/SalesPerson.js");

const router = express.Router();

router.post('/',async(req,res)=>{
	const payload = req.body; //gets payload
	//console.log(payload);

	if (!payload)
		return res.status(400).send("Bad Request, no payload found")

	const email = payload.email_of_company
	const password = payload.password

	const client_result = await Client.findOne({email_of_company:email})
	const distributor_result= await Distributor.findOne({email_of_company:email})
	const manufacturer_result= await Manufacturer.findOne({email_of_company:email})
	const sales_result= await Sales.findOne({email_of_salesperson:email})

	//let user_result = null; // gets the user from non-null query
	//console.log(client_result)
	
	if (client_result !== null){
		//console.log(client_result)
		const acc_type = 'client'
		if(bcrypt.compareSync(password, client_result.password)){
			const id = client_result._id
			const token = jwt.sign(
				{email,id,acc_type},
				process.env.TOKEN_CLIENT_KEY,
				{
					expiresIn: '2d'
				}
			)
			return res.status(200).send(token);
		} // true value indictates user credentials are correct
		return res.status(401).send("wrong credentials, try again"); // false value indicates user credentials are wrong
	}else if (distributor_result !== null){
		//console.log(distributor_result)
		const acc_type = 'distributor'
		if(bcrypt.compareSync(password,distributor_result.password)){
			const id = distributor_result._id
			const token = jwt.sign(
				{email,id,acc_type},
				process.env.TOKEN_DISTRIBUTOR_KEY,
				{
					expiresIn: '2d'
				}
			)
			return res.status(200).send(token);
		} // true value indictates user credentials are correct
		return res.status(401).send("wrong credentials, try again"); // false value indicates user credentials are wrong
	}else if (manufacturer_result !== null){
		//console.log(manufacturer_result)
		const acc_type = 'manufacturer'
		if(bcrypt.compareSync(password,manufacturer_result.password)){
			const id = manufacturer_result._id
			const token = jwt.sign(
				{email,id,acc_type},
				process.env.TOKEN_MANUFACTURER_KEY,
				{
					expiresIn: '2d'
				}
			)
			return res.status(200).send(token);
		} // true value indictates user credentials are correct
		return res.status(401).send("wrong credentials, try again"); // false value indicates user credentials are wrong
	}else if (sales_result !== null){
		//console.log(sales_result)
		const acc_type = 'sales'
		if(bcrypt.compareSync(password,sales_result.password)){
			const id = sales_result._id
			const token = jwt.sign(
				{email,id,acc_type},
				process.env.TOKEN_SALES_KEY,
				{
					expiresIn: '2d'
				}
			)
			return res.status(200).send(token);
		} // true value indictates user credentials are correct
		return res.status(401).send("wrong credentials, try again"); // false value indicates user credentials are wrong
	}else{
		return res.status(500).send("wrong credentials,or your account does not exist");
	}
})

module.exports = router;