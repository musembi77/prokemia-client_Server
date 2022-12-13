//checks if an account already exits in db

const Client = require("../../../models/Client/Client.js");
const Distributor = require("../../../models/Distributor/Distributor.js");
const Manufacturer = require("../../../models/Manufacturer/Manufacturer.js");
const Sales = require("../../../models/Sales/SalesPerson.js");

const Client_User=async(email)=>{
	console.log(email)
	try{
		const result = await Client.findOne({email_of_company:email})
		//console.log(result)
		if (!result || result === null) //return false result shows that the account does not exist
			return false;
		return true; // account exists
	}catch(err){
		return -1;
	}
}

const Distributor_User=async(email)=>{
	try{
		const result = await Distributor.findOne({email_of_company:email})
		//console.log(result)
		if (!result || result === null) //return false result shows that the account does not exist
			return false;
		return true; // account exists
	}catch(err){
		return -1;
	}
}

const Manufacturer_User=async(email)=>{
	try{
		const result = await Manufacturer.findOne({email_of_company:email})
		//console.log(result)
		if (!result || result === null) //return false result shows that the account does not exist
			return false;
		return true; // account exists
	}catch(err){
		return -1;
	}
}

const Sales_User=async(email)=>{
	try{
		const result = await Sales.findOne({email_of_salesperson:email})
		//console.log(result)
		if (!result || result === null) //return false result shows that the account does not exist
			return false;
		return true; // account exists
	}catch(err){
		return -1;
	}
}

module.exports = {
	verify_client_account: 			Client_User,
	verify_distributor_account: 	Distributor_User,
	verify_manufacturer_account:	Manufacturer_User,
	verify_salesperson_account: 	Sales_User
}