import express from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';

const router = express.Router();

router.post("/admin",async(req,res)=>{
    const {email,password}  = req.body;
try{
const admin  = await User.findOne({email,password,role:'admin'});
if(!admin){
    return res.status(401).json({message:"Unauthorized access"});
}
if(!email || !password){
    return res.status(400).json({message:"Username and password are required"});
}
const token = jwt.sign({id:admin._id,username:admin.name,role:admin.role},process.env.JWT_SECRET,{expiresIn:'1h'});
res.status(200).json({message:"Admin logged in successfully",token,user:{
    id:admin._id,
    username:admin.name,
    email:admin.email,
    role:admin.role
}});
}catch(err){
    res.status(500).json({message:"Error in admin route",error:err.message});
}
})

export default router;