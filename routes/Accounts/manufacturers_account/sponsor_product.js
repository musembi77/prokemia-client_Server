//modules imports
const express = require('express');

//models import
const Manufacturer = require('../../../models/Manufacturer/Manufacturer.js');
const Product = require('../../../models/Utils/Product.js');

let router = express.Router()

router.post('/',async (req,res,next)=>{
    const payload = req.body; //get payload
    
    //check if payload is available
    if(!payload){
        return  res.status(401).send('Bad Request'); 
    }

	//get ids'
	const manufacturer_id = 	payload.manufacturer_id
	const product_id = 		payload.product_id
	//find existing user account
	const existing_manufacturer = await Manufacturer.findOne({_id:manufacturer_id})

	if (existing_manufacturer != null){
		//find existing_product
		const existing_product = await Product.findOne({_id:product_id})
		const count = existing_manufacturer.sponsored_products
		if (existing_product != null)
			try{
					//update product status
					const product_query = {_id:product_id};
			        const product_update = { $set: {
			            sponsored: 		true,
			        }};
			        const product_options = { }; 
			        
			        await Product.updateOne( product_query, product_update, product_options)
					//update sponsored count by manufacturer
					const manufacturer_query = {_id:product_id};
			        const manufacturer_update = { $set: {
			            sponsored_products: 	count+1,
			        }};
			        const manufacturer_options = { }; 
			        
			        await Manufacturer.updateOne( manufacturer_query, manufacturer_update, manufacturer_options)
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