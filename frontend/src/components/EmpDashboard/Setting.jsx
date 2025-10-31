import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/authContext'
import axios from 'axios'

const Setting = () => {

    const navigate = useNavigate()

    const {user} = useAuth()

    const [setting,setSetting] = useState({
        userId:user._id,
        old_pass:'',
        new_pass:'',
        confirm_pass:''
    })

    const [error,SetError] = useState(null)

    const handleChange = (e) =>{
        const {name,value} = e.target;

        setSetting({...setting,[name]:value});
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();

        if(setting.new_pass !== setting.confirm_pass ){
            SetError('Password Not Matched')
        }
        else{
            try {
                const response = await axios.post('http://localhost:5500/api/setting/change_password',setting,{
                    headers:{
                        "Authorization":`Bearer ${localStorage.getItem('token')}`
                    }
                })
                navigate('/employee-dashboard')
                console.log(response.data)
            } catch (error) {
                console.log(error);
            }
        }
    }

  return (
    <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96'>

        <h2 className='text-2xl font-bold mb-6'>Change Password</h2>


            <form onSubmit={handleSubmit}>
                 

            <div className='bg-gray-100 w-full p-10'>

                <div>
                    <label htmlFor="old_pass" className='block text-2xl font-bold'>Old Password:</label>
                    <input type="password" name='old_pass' placeholder='Old Password' className='w-full border border-2 p-2 rounded'
                    onChange={handleChange} />
                </div>

                  <div>
                    <label htmlFor="new_pass" className='block text-2xl font-bold'>New Password:</label>
                    <input type="password" name='new_pass' placeholder='New Password' className='w-full border border-2 p-2 rounded' 
                      onChange={handleChange} />
                </div>

                  <div>
                    <label htmlFor="confirm_pass" className='block text-2xl font-bold'>Confirm Password:</label>
                    <input type="password" name='confirm_pass' placeholder='Confirm Password' className='w-full border border-2 p-2 rounded' 
                      onChange={handleChange} />
                </div>

                <button type='submit' className='w-full mt-10 bg-blue-700 p-4 text-white rounded font-bold text-xl'>Change Password</button>

            </div>
            </form>

    </div>
  )
}

export default Setting