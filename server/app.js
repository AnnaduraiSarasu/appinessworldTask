const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config =require('./config/local'); 
const db =require('./config/dbconnection');
const { check, validationResult } = require('express-validator');
const createUsercontroller =require('../server/controller/crearUser');

const app =express();

// middleware setup for access json data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// middle ware for cros origin issue
app.use(cors());
// database connection function call
db.connect();

app.use("/createUser",  
[
    // username must be an email
    check('email').isEmail(),
    // check username should not empty
    check('username').not().isEmpty(),
    // password must be at least 5 chars long
    check('password').isLength({ min: 5 })
  ], (req, res) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          res.json({success:true,error: errors.array()});
          res.end();
           return false;
         res.end();
        }else{
            //function for create user 
            createUsercontroller.createRegisterUser(req,res);
        }
    });


app.use("/getUser",(req,res)=>{
    //function for get user details
    createUsercontroller.getRegisterUser(req,res);
});


app.listen(config.PORT,function(err){
    console.log("server Running Port::"+config.PORT);
});
