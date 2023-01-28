const express = require("express")
const axios = require("axios")

const router = express.Router()

const Send_delete_product_email=async(email_payload)=>{
	console.log(email_payload);

	if (!email_payload)
		return res.status(400).send("Bad Request, no email_payload found")

	await axios.post("http://localhost:5001/api/deleted_product_email",email_payload).then(()=>{
		console.log("success")
	}).catch((err)=>{
		console.log(err)
	})
}

module.exports = Send_delete_product_email