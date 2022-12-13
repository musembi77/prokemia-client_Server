//modules imports
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//models import
const Client = require('../../../models/Client/Client');

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
			mobile_of_company:  payload.mobile,		
			email_of_company:   payload.email,
            listing_status:     false,	
			recents:            []	
		})
        
        //on success email/sms the client to verify account
        return res.status(200).json(new_Client) //return new user 
    }catch(err){
        res.status(401).send('Could not create an account at the moment, try again')
    }
});