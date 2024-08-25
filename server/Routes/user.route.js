import express from "express"
const userRouter = express.Router();
import { UserModel } from "../Models/user.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


// Register
userRouter.post("/register",async(req,res)=>{
    const {name,email,password,age,gender,role} = req.body;
    try {
        bcrypt.hash(password,3, async function(err,hash){
            if(err){
                return res.status(303).json({message:"Error while hashing the password",err})
            }
            const user = new UserModel({
                name,
                email,
                password:hash,
                age,
                gender,
                role
            })
            await user.save();
            res.status(201).json({message:"User registered successfully"})
        })
        
    } catch (error) {
        res.status(404).json({message:"Error while registering the user",error})
    }
})

// Login
userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password,user.password,async function(err,result){
                if(err){
                    return res.status(505).json({message:"Internal server Error"})
                }
                if(result){
                    const token =  jwt.sign({id:user._id},process.env.tokenKey)
                    res.status(201).json({message:"User logged in successfully",token})
                }
            })
        }
    } catch (error) {
        res.status(303).json({message:"Error while login in",error})
    }   
})


export {userRouter}