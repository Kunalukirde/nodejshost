const express = require('express');
const router = express.Router();
const messageTable = require('../models/message.js');




router.post('/message', async (req,res)=> {
    const {name,email,message,subject} = req.body;
    try {
        const clientMessage = messageTable({ 
            name : name,
            email : email,
            message : message,
            subject : subject
        });
        await clientMessage.save();
        const saved_msg = await messageTable.find({name : name});
        console.log('saved_msg',saved_msg);
        res.status(200).send({status : true, message : 'Message Sent Successfully'});
    } catch (error) {
        res.status(400).send({message : 'Internal Server Error'});
    }
});


module.exports = router;