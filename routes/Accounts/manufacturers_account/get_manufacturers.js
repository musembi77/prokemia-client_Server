//modules imports
const express = require('express');
//models import
const Manufacturer = require('../../../models/Manufacturer/Manufacturer.js');

let router = express.Router()

router.get('/',async (req,res,next)=>{
	try{
        const manufacturers = await Manufacturer.find();
        return res.status(200).send(manufacturers)
    }catch(err){
        console.log(err);
        return res.status(500).send("Could not get manufacturers")
    }
});

module.exports = router;