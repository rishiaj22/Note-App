import jwt from "jsonwebtoken"
import { UserModel } from "../Models/user.model.js"

const auth = async(req,res,next)=>{
    const token = req.headers.authorization;
    if(!token){
        return res.status(505).json({message:"Token not found"})
    }
    try {
        const decoded = jwt.verify(token,process.env.tokenKey)
        if(!decoded){
            return res.status(505).json({message:"Invalid token, please login first"})
        }
        const user = await UserModel.findById(decoded.id)
        req.user = user;
        next()
    } catch (error) {
        res.status(303).json({message:"Invalid Token"})
    }
}

export default auth