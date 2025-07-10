const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt"); 

const userSchema = new mongoose.Schema({

    
        firstName:{
            type:String,
            required:true,
            trim:true,
            maxlength:55
        },
        lastName:{
            type:String,
            trim:true,
            maxlength:30,
            required:true,

        },
        email:{
            type:String,
            trim:true,
            lowercase:true,
            unique:true,
            required:true,
        },
        password:{
            type:String,
            trim:true,
            minlength:8,
            required:true,
        },
        age:{
            type:Number,
            min:18,
            required:true,

        },
        gender:{
            type:String,
            lowercase:true,
            enum:['male','female','others'],
            required:true,
        }
   


},{
    timestamps:true,
})

userSchema.methods.getJWT= async function(){
    const user = this;
    const token = await jwt.sign({_id:user._id},"Rahul@123",{expiresIn:"14d"});
    return token;
}
userSchema.methods.validatePassword = async function(password){
    const user=this;
    const validate = await bcrypt.compare(password,user.password);
    return validate;
}
const User = mongoose.model("User",userSchema);

module.exports = User;