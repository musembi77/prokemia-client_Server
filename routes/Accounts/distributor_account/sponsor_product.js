//modules imports
const express = require('express');

//models import
const Distributor = require('../../../models/Distributor/Distributor.js');
const Product = require('../../../models/Utils/Product.js');

let router = express.Router()

router.post('/',async (req,res,next)=>{
    const payload = req.body; //get payload
    
    //check if payload is available
    if(!payload){
        return  res.status(401).send('Bad Request'); 
    }

	//get ids'
	const distributor_id = 	payload.distributor_id
	const product_id = 		payload.product_id
	//find existing user account
	const existing_distributor = await Distributor.findOne({_id:distributor_id})

	if (existing_distributor != null){
		//find existing_product
		const existing_product = await Product.findOne({_id:product_id})
		const count = existing_distributor.sponsored_products
		if (existing_product != null)
			try{
					//update product status
					const product_query = {_id:product_id};
			        const product_update = { $set: {
			            sponsored: 		true,
			        }};
			        const product_options = { }; 
			        
			        await Product.updateOne( product_query, product_update, product_options)
					//update sponsored count by distributor
					const distributor_query = {_id:product_id};
			        const distributor_update = { $set: {
			            sponsored_products: 	count+1,
			        }};
			        const distributor_options = { }; 
			        
			        await Distributor.updateOne( distributor_query, distributor_update, distributor_options)
					//on success 
					return res.status(200).send("successfully sponsored this product")
			}catch(err){
				console.log(err)
				return res.status(500).send("could not sponsor this product, try again in a few minutes");
			}
		return res.status(500).send("could not find this product, it may have been deleted or it does not exist");
	}else{
		return res.status(500).send("could not find this account, it may have been deleted or it doesnt exist");
	}
})

module.exports = router;