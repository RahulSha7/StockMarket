const validator = require("validator");

const validateSignup = (req)=>{
    const {firstName,lastName,email,password,age,gender}= req.body;
    if(!firstName||!lastName){
        throw new Error("Name is not valid");
    }
    if(!validator.isEmail(email)){
        throw new Error("Insert correct Email Id");
    }
    if(!validator.isStrongPassword(password)){
        throw new Error("Enter a strong password");
    }
    if(age<18){
        throw new Error("Age should be greater than 18");
    }
    if(!gender){
        throw new Error("Gender is required");
    }
}
module.exports=validateSignup;