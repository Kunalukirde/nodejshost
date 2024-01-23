const express = require('express');
const router = express.Router();
const userTable = require('../models/user.js');

router.get('/',(req,res) =>{
    res.status(200).send('mongo API working');
});

router.post('/register', async (req,res) => {
    try {
        const {name,email,password,mobile} = req.body;
        const existingEmail = await userTable.findOne({email : email});
        if (existingEmail !== null) { 
                res.status(409).send({ message: "Email already exists." });
            }
            else
            {
                if (name && email && password && mobile) {
                    const doc = userTable({
                        name : name,
                        email : email,
                        password : password,
                        mobile : mobile
                    });
                    doc.save();
                     saved_user = await userTable.findOne({email : email});
                    console.log('saved_user',saved_user);
                    res.status(200).send({message : 'Registration Successfully...'});
                }
                else
                {
                    res.status(409).send({ message: "All fields are required." });
                }
            }
        } catch (error) {
        console.log('bad req error',error);
        res.status(400).send({message : 'Bad Request'});
    }
});


router.post('/login' , async (req,res) => {
    try {
        const {email,password} = req.body;
        if (email && password) {
            registered_user = await userTable.findOne({email : email});
            console.log('registered_user',registered_user);
            if (registered_user !== null) {
                res.status(200).send({status : true , message : 'Login success'});
            } else {
                res.send({message : 'You are not registered user'});
            }
        } else {
            res.send({message : 'all fields are required'});
        }
    } catch (error) {
        res.status(400).send({message : 'Bad Request'});
    }
})


module.exports = router;