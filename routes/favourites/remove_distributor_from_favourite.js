// const express = require('express');
// const Favourite = require("../../models/Favourite.js");
// //const { db } = require('../model/Client.js');

// const router = express.Router();

// router.post('/',async(req,res)=>{
//     const { details } = req.body;
//     console.log(details)
//     //find existing user
//     if(!details){
//         return res.status(201).send('We cannot remove this item to the cart, please try again')
//     }
//     //get user
//     const existinguser = await Client.findOne({access_token:details.token})
//     if(!existinguser ){
//         return res.status(201).send('could not find an account , try again in a few minutes')
//     }
//     //update user cart
//     try{
//         const query = {_id:existinguser._id};
//         const update = { $pull: {"cart": { prodctId:details.id}}};
//         const options = { };
        
//         db.collection('clients').updateOne( query, update, options);
//     }catch(err){
//         console.log(err)
//     }
//     //return a success
//     return res.status(200).send('successfully removed item from your cart');
// })

// module.exports = router ;