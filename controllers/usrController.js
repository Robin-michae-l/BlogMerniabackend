//logic to resolve the request

 
 //import model
 const users=require('../models/userschema')

 //import jwt
 const jwt=require('jsonwebtoken')

 //logic for register

 exports.register=async(req,res)=>{
   
    console.log('inside register function');
    //extract data from request body
    const {username,email,password}=req.body

   try{const ifuser= await users.findOne({email})
   if(ifuser){
    res.status(406).json('Account already exists ,please login')
   }else{
    //create an object for the model
    const newuser=new users({
        username,
        email,
        password

    })
    //save function in mongoose-to permanently store this data in mongodb.
   await newuser.save()
   

    //response
    res.status(200).json(newuser)
}}
catch(err){
    res.status(401).json('register request failed due to',err);
}
 }

 //logic for login

 exports.login=async(req,res)=>{
    console.log('inside login function');

    const {email,password}=req.body

   try{ const existingUser=await users.findOne({email,password})
    console.log(existingUser);

    if(existingUser){
        const token=jwt.sign({userid:existingUser._id},"secckey770")
        res.status(200).json({
            existingUser,
            token
        })
    }
    else{
        res.status(406).json('incorrect emailid or password')
    }}catch(err){
        res.status(401).json(`login failed due to ${err}`)

    }
 }