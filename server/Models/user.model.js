import mongoose from "mongoose";

const userSchema= mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    gender:{type:String,required:true},
    age:{type:Number,required:true},
    role:{type:String,required:true,default:"user",enum:["user","admin"]}
})

const UserModel = mongoose.model("user",userSchema)

export {UserModel}