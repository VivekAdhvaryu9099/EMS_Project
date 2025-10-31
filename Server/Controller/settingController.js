import User from "../models/user.js"
import bcrypt from 'bcrypt'

export const change_password = async (req,res)=>{
    try {
        const {userId, old_pass, new_pass} = req.body

        const user = await User.findById(userId)

        if(!user){
            return res.status(404).json({success:false, error:'User not found'})
        }

        // ✅ Use await here
        const isMatch = await bcrypt.compare(old_pass, user.password)

        if(!isMatch){
            return res.status(400).json({success:false, error:'Wrong old password'})
        }

        // ✅ Hash new password
        const hashPassword = await bcrypt.hash(new_pass, 10)

        await User.findByIdAndUpdate(
            userId,
            { password: hashPassword },
            { new: true }
        )

        return res.status(200).json({success:true, message: "Password updated successfully"})
         
    } catch (error) {
        console.error("Change Password Error:", error)
        res.status(500).json({success:false, error:"Setting Error"})
    }
}
