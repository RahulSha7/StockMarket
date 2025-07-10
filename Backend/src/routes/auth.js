const express = require("express");
const validateSignup = require("../utils/validation");
const authRouter = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

authRouter.post("/signup",async (req,res)=>{
    try{
        validateSignup(req);
    const {email, firstName,lastName,password,age,gender} = req.body;

    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).json({
            message:"User already exists"
        })
    };

    const hashedPassword = await bcrypt.hash(password,10);  
    const user = new User({
        firstName,
        lastName,
        email,
        password:hashedPassword,
        age,
        gender
    });

   const savedUser = await user.save();
   const token = savedUser.getJWT();

     res.cookie("token", token, {
        httpOnly:true,
      expires: new Date(Date.now() + 8 * 3600000),
    });

    res.status(201).json({
        message:"User registered successfully"
    })
    }catch(err){
        res.status(400).json({message:err.message});
    }
})

authRouter.post("/login",async (req,res)=>{
    try{
        const{email,password} = req.body;
    const user= await User.findOne({email:email});
    if(!user){
       throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await user.validatePassword(password);
    if(!isPasswordValid){
         throw new Error("Invalid Credentials");
    }
    else{
         const token = user.getJWT();

     res.cookie("token", token, {
        httpOnly:true,
      expires: new Date(Date.now() + 8 * 3600000),
    });
    res.send(user);
    }
    }catch(err){
        res.status(400).json({message:err.message});
    }
})

authRouter.post("/logout",async(req,res)=>{
    
authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout Successful!!");
});
})

module.exports = authRouter;