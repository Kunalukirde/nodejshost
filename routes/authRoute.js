const express = require('express');

const mysqlDB  = require('../config/mysqlConnect.js');

const router = express.Router();


// CRUD WITH MYSQL
// =============================================================================================================================================================================================================

router.get('/' , async (req,res) => {
    res.status(200).send({ message : 'You Are live'});
    // mysqlDB.query('CREATE DATABASE NODEAUTH' , (Error , Result)=> {
    //     if(Error) { 
    //         console.log('error creating to DataBase', Error)
    //     } else {
    //         console.log('DB Created' ,Result)
    //     };
    // });

    // mysqlDB.query(`CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY,name varchar(255),email varchar(255),password varchar(255),mobile varchar(255))`, (Error,Result)=> {
    //     if(Error) { console.log('Error Creating table' , Error)}
    //     else { console.log('table created', Result);}
    // })
})

router.post('/register', async (req,res) => { 
    const {name,email,password,mobile} = req.body;
    try {
        const [existingUser] = await mysqlDB.query(`SELECT * FROM users WHERE email = ?`,[email])
        if (existingUser.length > 0) {
            res.status(409).send({message : 'Email Already Exist'});
        } else {
            if (name && email && password && mobile) {
                await mysqlDB.query(`INSERT INTO users (name,email,password,mobile) VALUES (?,?,?,?)`,[name,email,password,mobile]);
                res.status(200).send({message : 'Registration Successful..'});
            } else {
                res.status(400).send({message : 'All Fields are required'});
            }
        }
        
    } catch (error) {
        console.log('Error during registration : ',error)
        res.status(500).send({message : 'Internal Server Error'});
        
    }
}) 


router.post('/login' , async (req,res) => {
    try {
        const {email,password} = req.body;
        if(email && password) {
            const [registeredUser] = await mysqlDB.query(`SELECT * FROM users WHERE email = ?`,[email])
            if (registeredUser !== null) {
                if (email === registeredUser[0].email && password === registeredUser[0].password) {
                    res.status(200).send({ 'status' : 'success' ,message : 'Login Success'});
                } else {
                    res.status(400).send({message : 'Email or Password is invalid'});
                }
            } else {
                res.status(409).send({message : 'You are not registered user'});
            }
        }
        else {
            res.status(400).send({message : 'All fields are required'});
        }
    } catch (error) {
        res.send({message : 'Unable to login'});
    }
})







// CRUD WITH MONGODB
// =============================================================================================================================================================================================================
















module.exports = router;



