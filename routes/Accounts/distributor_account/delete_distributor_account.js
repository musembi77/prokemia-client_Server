const express = require('express');
const Distributor = require('../../../models/Distributor/Distributor.js');

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
        const existing_distributor = await Distributor.findOne({_id:id});
        if (!existing_distributor)
        	return res.status(400).send("could not find this account")

		await Distributor.findOneAndDelete({_id:id} ).then((response)=>{
			return res.status(200).send("Sucessfully deleted this account.")
		})
    }catch(err){
		console.log(err);
    	return res.status(500).send("could not delete this account at the moment")
    }
})

module.exports = router;