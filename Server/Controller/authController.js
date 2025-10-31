import User from '../models/user.js'

import jwt from 'jsonwebtoken'

import bcrypt from 'bcrypt'

export const login = async (req,res)=>{

        try {
            
            const {email,password} = req.body; 

            const user = await User.findOne({email})

            if(!user){
                res.status(404).json({success:false,error:"User Not Found"})
            }

            const isMatched = await bcrypt.compare(password,user.password)

            if(!isMatched){
                 res.status(404).json({success:false,error:"Password Not Matched"})
            }

            const token = jwt.sign({_id:user._id,role:user.role},process.env.JWT_SECRET_KEY,{expiresIn:"1D"})

            res.status(200).json({success:true,token,user:{_id:user._id,name:user.name,role:user.role}})

        } catch (error) {
          
            res.status(500).json({success:false,error:error.message})
            
        }

}

export const verify = (req,res)=>{
    return res.status(200).json({success:true,user:req.user})
}