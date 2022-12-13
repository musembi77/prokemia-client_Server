const express = require("express");

const Sales = require("../../../models/Sales/SalesPerson.js");
const Hub_Community = require("../../../models/Sales/hub_community");

const router = express.Router();

router.post('/',async(req,res)=>{
	//get payload
	const payload = req.body;  
	//check if payload exists
	if (!payload)
		return res.status(400).send("Bad Request")
	
	//use the id to find existing user_account
	const id = payload._id //get the salesperson id
	const existing_salesperson = await Sales.findOne({_id:id}) //check a salesperson account exists

    try{
        if (!existing_salesperson)
        	res.status(200).send("could not find this salesperson account")

        const hub_account_id = existing_salesperson.hub_account_id
		//console.log(existing_salesperson)
		
        if (existing_salesperson.hub_access_status === true){
			console.log(existing_salesperson.hub_access_status)
        	await Hub_Community.findOneAndDelete({_id:hub_account_id}).then(()=>{
				const query = {_id:id};
				const update = { $set: {
					hub_access_status: false,
					hub_account_id: ""
				}};
				const options = { };

				Sales.updateOne( query, update, options).then(()=>{
					return res.status(400).send("Sucessfully deleted hub account")
				})
			})
		}else{
			return res.status(400).send("could not find your hub_account, it does not exist or you did not create one")
		}
		
    }catch(err){
		console.log(err);
    	return res.status(500).send("could not delete this account at the moment")
    }
})

module.exports = router;