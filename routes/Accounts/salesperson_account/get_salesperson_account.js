//modules imports
const express = require('express');
//models import
const Sales = require('../../../models/Sales/SalesPerson.js');

let router = express.Router()

router.post('/',async (req,res,next)=>{
    const payload = req.body; //get payload
    
    //check if payload is available
    if(!payload){
        return  res.status(401).send('Bad Request'); 
    }
    const id = payload._id //get the salesperson id

	const existing_salesperson = await Sales.findOne({_id:id}) //checks if a sales_Account already exists

	if (existing_salesperson != null) //if there is a sales_account
		return res.status(200).send(existing_salesperson);
	return res.status(500).send("could not find this account, it may have been deleted or it doesnt exist");
});

module.exports = router;