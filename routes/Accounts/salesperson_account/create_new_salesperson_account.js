//modules imports
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//models import
const Sales = require('../../../models/Sales/SalesPerson.js');

let router = express.Router()
 
router.post('/',async (req,res,next)=>{
    const payload = req.body; //get payload
    
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
            process.env.TOKEN_SALESPERSON_KEY,
            {
                expiresIn: '2d'
            }
        )
        //console.log(token)
        const new_SalesPerson = await Sales.create({
			first_name:         payload.first_name,	
			last_name:          payload.last_name,
			gender:             "",		
			email_of_salesperson:   payload.email,
			mobile_of_salesperson:  payload.mobile,		
			address:            "",	
			company_name:       "",	
			position:           "",	
			password:           encrypted_password,	
			access_token:       token,
            hub_access_status:  false,
	        hub_account_id: 	"",
            account_status:     false,
			recents:            []
		})
        
        //on success email/sms the client to verify account
        return res.status(200).json(new_SalesPerson) //return new user 
    }catch(err){
        res.status(401).send('Could not create an account at the moment, try again')
    }
});