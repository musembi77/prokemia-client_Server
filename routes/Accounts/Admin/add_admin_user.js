//modules imports
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
//models imports
const Admin = require('../../../models/Admin/Admin.js');

let router = express.Router()

router.post('/',async (req,res,next)=>{
    const payload = req.body;
    //check if all params are available
    if(!payload){
        return  res.status(401).send('Bad Request');
    }
    //sign a token and encrypt password
    const salt = bcrypt.genSaltSync(10);
    const encrypted_password = bcrypt.hashSync(payload.password, salt);
    const user_name = payload.user_name
    try{
        const token = jwt.sign(
            {user_name},
            process.env.TOKEN_ADMIN_KEY,
            {
                expiresIn: '2d'
            }
        )
        //console.log(token)
        const new_Admin = await Admin.create({
            user_name:		payload.user_name,
			role:			payload.role,
			user_password:  payload.user_password,
			access_token: 	token,
            user_image:     payload.user_image,
			login_status:	true,
        })
        
        return res.status(200).json(new_Admin.access_token)
    }catch(err){
        res.status(401).send('Could not add new admin-user at the moment, try again')
    }
});