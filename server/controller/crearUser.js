const usermodel = require('../model/createuserModel')
const createUser ={
   //function for create user 
    createRegisterUser: async (req,res) =>{
         const userObj ={};
         let datares;
         let userBody =req.body.user;
         userObj.email =userBody.email;
         userObj.username =userBody.username;
         userObj.password =userBody.password;
         // check colection has any records
         const resData = await usermodel.find({});

         //store the values into collection part
         if(!Object.keys(resData).length){
            userObj.role ="admin";
            const user = usermodel(userObj);
            datares = await user.save();
         }else{
            userObj.role ="noadmin";
            const user = usermodel(userObj);
            datares = await user.save();
         }
         // function for get all records
         const totalRecord = await usermodel.find({});

         res.json({success:true,data: totalRecord});
         res.end();
         return false;
    },
   //function for get user details

    getRegisterUser: async (req,res) =>{
      // function for get all records

         const totalRecord = await usermodel.find({});
         res.json({success:true,data: totalRecord});
         res.end();
         return false;
    }

}
module.exports=createUser;


