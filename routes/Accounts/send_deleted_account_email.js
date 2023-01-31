const express = require("express")
const axios = require("axios")

const router = express.Router()

const Send_delete_account_email=async(email_payload)=>{
	console.log(email_payload);

	if (!email_payload)
		return res.status(400).send("Bad Request, no email_payload found")

	await axios.post("https://prokemiaemailsmsserver-production.up.railway.app/api/deleted_account_email",email_payload).then(()=>{
		console.log('email sent')
		return;
		//return res.status(200).send("email sent")
		//console.log("success")
	}).catch((err)=>{
		console.log(err)
		return;
		//return res.status(500).send("could not send email")
	})
}

module.exports = Send_delete_account_email