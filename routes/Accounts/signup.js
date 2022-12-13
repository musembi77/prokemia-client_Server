//modules import
const express = require("express");
const bcrypt = require('bcryptjs');

//account creation fucntions at utils
const verify = require("./auth_utils/verify.js")
const utils = require("./auth_utils/account_creation_handler.js")

let router = express.Router()

router.post("/",async(req,res)=>{
	const payload = req.body; //gets payload
	console.log(payload)
	//checks if payload is not null
	if (!payload) 
		return res.status(401).send("Bad Request");

	//check if the user credentials already exists
	try{
		await check_Existing_Account(payload).then((response)=>{ 
			//calls function to check if account exists in the different db models
			console.log(response)
			if (response === false) 
				// if the response is false i.e if account does not exist condition to create a new account is called
				handle_create_account(payload).then((response)=>{
					//console.log(response)
					return res.status(200).send(response)
				}) //creates a new account
			// if (response === -1)
			// 	return res.status(500).send("could not search through db") //returns a 401 when an account exists	
			else
				return res.status(401).send("account already exists") //returns a 401 when an account exists
		})
	}catch(err){
		console.log(err)
		return res.status(500).send(err)
	}

})

module.exports = router;

const check_Existing_Account=async(payload)=>{
	const email = payload.email_of_company;

    console.log(email)

	const client_result = 			await verify.verify_client_account(email) //checks if email exists in the client db returns true if account exists
	const distributor_result = 		await verify.verify_distributor_account(email) //checks if email exists in distributors db returns true if account exists
	const manufacturer_result = 	await verify.verify_manufacturer_account(email) //checks if email exists in distributors db returns true if account exists
	const salesperson_result = 		await verify.verify_salesperson_account(email) //checks if email exists in distributors db returns true if account exists

	console.log(client_result,distributor_result,manufacturer_result,salesperson_result)
	if (client_result)
		return true
	else if (distributor_result)
		return true
	else if (manufacturer_result)
		return true
	else if (salesperson_result)
		return true
	else
		return false

	// if (client_result === true || distributor_result === true || manufacturer_result === true || salesperson_result === true) 
	// 	//if either of the results are true, returns true value 
	// 	return (true)
	// else if ( client_result === -1 || distributor_result === -1 || manufacturer_result === -1 || salesperson_result === -1)
	// 	return -1; // if an error occurs in all checks
	// else
	// 	return false// account does not exist
}

//creates a new account
const handle_create_account=async(payload)=>{
	const acc_type = payload.acc_type
	
	if (acc_type === 'client'){
		var result = utils.create_client_account(payload) // function to create a new client
		return result
		//console.log(result)
	}else if (acc_type === 'distributor'){
		var result = utils.create_distributor_account(payload) // function to create a new distributor
		return result
		//console.log(result)
	}else if (acc_type === 'manufacturer'){
		var result = utils.create_manufacturer_account(payload) // function to create a new manufacturer
		return result
	}else if (acc_type === 'sales'){
		var result = utils.create_salesperson_account(payload) // function to create a new salesperson
		return result
	}
}
