const express = require('express');
const Client = require("../../../models/Client/Client.js");
const Send_delete_account_email = require("../send_deleted_account_email.js")
let router = express.Router()

router.post("/",async (req,res)=>{
    //get payload
    const payload = req.body;
    //check if payload exists
    if(!payload){
        return res.send(400).send("Bad Request")
    }
    let id = payload._id //use id to find existing user
    try{
        const existing_client = await Client.findOne({_id:id});
        if (!existing_client)
        	return res.status(400).send("could not find this account")

		await Client.findOneAndDelete({_id:id} ).then((response)=>{
            const email_payload = {
                email : existing_client.email_of_company
            }
            Send_delete_account_email(email_payload)
			return res.status(200).send("Sucessfully deleted this account")
		})
    }catch(err){
		console.log(err);
    	return res.status(500).send("could not delete this account at the moment")
    }
})

module.exports = router;