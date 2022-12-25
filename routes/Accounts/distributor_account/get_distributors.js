//modules imports
const express = require('express');
//models import
const Distributor = require('../../../models/Distributor/Distributor.js');

let router = express.Router()

router.get('/',async (req,res,next)=>{
	try{
        const distributors = await Distributor.find();
        return res.status(200).send(distributors)
    }catch(err){
        console.log(err);
        return res.status(500).send("Could not get distributors")
    }
});

module.exports = router;