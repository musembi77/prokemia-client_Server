//modules imports
const express = require("express");
//models imports
const Vacancy = require("../../models/Utils/Vacancies.js");

const router = express.Router()

router.get("/",async(req,res)=>{
    try{
        const vacancies = await Vacancy.find();
        return res.status(200).send(vacancies);
    }catch(err){
        console.log(err);
    }
})

module.exports = router;