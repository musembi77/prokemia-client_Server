const express = require('express')

const Client = require("../../models/Client.js");
const Distributor = require("../../models/Distributor.js");
const Manufacturer = require("../../models/Manufacturer.js");
const Sales = require("../../models/SalesPerson.js");

let router = express.Router()

router.post('/',async(req,res)=>{
    let query = req.body; //gets payload
    console.log(query)

    if (!query)
        return res.status(400).send("Bad Request")

    let id = query._id

    const client_result = await Client.findOne({_id:id})
    const distributor_result= await Distributor.findOne({_id:id})
    const manufacturer_result= await Manufacturer.findOne({_id:id})
    const sales_result= await Sales.findOne({_id:id})

    try{
        if (client_result !== null){
            console.log(client_result)
            return res.status(200).json(client_result)
        }else if (distributor_result !== null){
            console.log(distributor_result)
            return res.status(200).json(distributor_result)
        }else if (manufacturer_result !== null){
            console.log(manufacturer_result)
            return res.status(200).json(manufacturer_result)
        }else if (sales_result !== null){
            console.log(sales_result)
            return res.status(200).json(sales_result)
        }else{
            return res.status(500).send("could not find an account");
        }
    }catch(err){
        return res.status(500).send("error");
    }
})

module.exports = router;