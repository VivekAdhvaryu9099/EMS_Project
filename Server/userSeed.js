import { User } from "./models/user.js"
import bcrypt from 'bcrypt'
import { connectToDb } from './db/db.js'

export const UserRegister = async ()=>{
    connectToDb()
    try {
        const hashedPassword = await bcrypt.hash('admin',10)
        const newUser = new User({
            name:"Admin",
            email:"admin@gmail.com",
            password:hashedPassword,
            role:'admin'
        })
        await newUser.save()
    } catch (error) {
        console.log(error);
        
    }
}

UserRegister()