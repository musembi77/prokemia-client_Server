//modules import
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
//models import
const Client = require("../../../models/Client/Client.js");
const Distributor = require("../../../models/Distributor/Distributor.js");
const Manufacturer = require("../../../models/Manufacturer/Manufacturer.js");
const Sales = require("../../../models/Sales/SalesPerson.js");

//creates a new client
const Client_User=async(payload)=>{
	//check if payload is available
    if(!payload){
        return  res.status(401).send('Bad Request'); 
    }

    //sign a token and encrypt password
    const salt = bcrypt.genSaltSync(10);
    const encrypted_password = bcrypt.hashSync(payload.password, salt);
    const email = payload.email_of_company

    try{
        const token = jwt.sign(
            {email},
            process.env.TOKEN_CLIENT_KEY,
            {
                expiresIn: '2d'
            }
        )
        //console.log(token)
        const new_Client = await Client.create({
			first_name:         payload.first_name,	
			last_name:          payload.last_name,
			password:           encrypted_password,	
			access_token:       token, 
			address:            "",	
			company_name:       "",	
			position:           "",	
			gender:             "",		
			mobile_of_company:  payload.mobile_of_company,		
			email_of_company:   payload.email_of_company,
            listing_status:     false,	
			recents:            [],
            suspension_status:  false,	
		})
        
        //on success email/sms the client to verify account
        return new_Client //return new user 
    }catch(err){
        res.status(401).send('Could not create an account at the moment, try again')
    }
}

//creates a new distributor account
const Distributor_User=async(payload)=>{
	//check if payload is available
    if(!payload){
        return  res.status(401).send('Bad Request'); 
    }

    //sign a token and encrypt password
    const salt = bcrypt.genSaltSync(10);
    const encrypted_password = bcrypt.hashSync(payload.password, salt);
    const email = payload.email

    try{
        const token = jwt.sign(
            {email},
            process.env.TOKEN_DISTRIBUTOR_KEY,
            {
                expiresIn: '2d'
            }
        )
        //console.log(token)
        const new_Distributor = await Distributor.create({
			first_name:             payload.first_name,
            last_name:              payload.last_name,
			mobile_of_company:  payload.mobile_of_company,		
			email_of_company:   payload.email_of_company,		
            address_of_company:     "",	
			company_name:           "",
            description:			"",
            password:               encrypted_password,
            access_token:           token,
			key_contact:            [],	
			experts:	            [],
			manufacturers:          [],
            industries:	            [],
			technologies:           [],
            subscription:	        false,
			subscription_plan:      '',
            listing_status: 	    false,
            sponsored_products:		0,
            verification_status:    false,
            suspension_status:  false,
		})
        
        //on success email/sms the client to verify account
        return new_Distributor //return new user 
    }catch(err){
        res.status(401).send('Could not create an account at the moment, try again')
    }
}

const Manufacturer_User=async(payload)=>{
	//check if payload is available
    if(!payload){
        return  res.status(401).send('Bad Request'); 
    }

    //sign a token and encrypt password
    const salt = bcrypt.genSaltSync(10);
    const encrypted_password = bcrypt.hashSync(payload.password, salt);
    const email = payload.email

    try{
        const token = jwt.sign(
            {email},
            process.env.TOKEN_MANUFACTURER_KEY,
            {
                expiresIn: '2d'
            }
        )
        //console.log(token)
        const new_Manufacturer = await Manufacturer.create({
			first_name:             payload.first_name,
            last_name:              payload.last_name,
			mobile_of_company:  payload.mobile_of_company,		
			email_of_company:   payload.email_of_company,	
            address_of_company:     "",	
			company_name:           "",
            description:			"",
            password:               encrypted_password,
            access_token:           token,
			key_contact:            [],	
			experts:	            [],
			distributors:          [],
            industries:	            [],
			technologies:           [],
            subscription:	        false,
			subscription_plan:      '',
            listing_status: 	    false,
            sponsored_products:		0,
            verification_status:    false,
            suspension_status:  false,
		})
        
        //on success email/sms the client to verify account
        return new_Manufacturer //return new user 
    }catch(err){
        res.status(401).send('Could not create an account at the moment, try again')
    }
}

const Sales_User=async(payload)=>{
    //check if payload is available
    if(!payload){
        return  res.status(401).send('Bad Request'); 
    }

    //sign a token and encrypt password
    const salt = bcrypt.genSaltSync(10);
    const encrypted_password = bcrypt.hashSync(payload.password, salt);
    const email = payload.email

    try{
        const token = jwt.sign(
            {email},
            process.env.TOKEN_SALES_KEY,
            {
                expiresIn: '2d'
            }
        )
        //console.log(token)
        const new_SalesPerson = await Sales.create({
			first_name:         payload.first_name,	
			last_name:          payload.last_name,
			gender:             "",		
			mobile_of_salesperson:  payload.mobile_of_company,		
			email_of_salesperson:   payload.email_of_company,		
			address:            "",	
			company_name:       "",
			position:           "",	
			password:           encrypted_password,	
			access_token:       token,
            hub_access_status:  false,
	        hub_account_id: 	"",
            account_status:     false,
			recents:            [],
            open_to_consultancy:    payload.open_to_consultancy,
            verification_status:    false,
            suspension_status:  false,
		})
        
        //on success email/sms the client to verify account
        return new_SalesPerson //return new user 
    }catch(err){
        res.status(401).send('Could not create an account at the moment, try again')
    }
}


module.exports = {
	create_client_account: Client_User,
	create_distributor_account: Distributor_User,
	create_manufacturer_account: Manufacturer_User,
	create_salesperson_account: Sales_User
}