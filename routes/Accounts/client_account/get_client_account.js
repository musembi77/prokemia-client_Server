//modules imports
const express = require('express');
//models import
const Client = require('../../../models/Client/Client');

let router = express.Router()

router.post('/',async (req,res,next)=>{
    const payload = req.body; //get payload
    
    //check if payload is available
    if(!payload){
        return  res.status(401).send('Bad Request'); 
    }
    const id = payload._id //get the client id

	const existing_client = await Client.findOne({_id:id}) //checks if a client_Account already exists

	if (existing_client != null) //if there is a client_account
		return res.status(200).send(existing_client);
	return res.status(500).send("could not find this account, it may have been deleted or it doesnt exist");
});

module.exports = router;