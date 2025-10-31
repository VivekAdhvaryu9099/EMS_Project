import React from 'react'
import {} from 'react-icons'
import { FaUsers } from 'react-icons/fa'
import { useAuth } from '../../context/authContext'

const Summary = () => {
    const {user}= useAuth()
  return (
    <div className='p-6'>

    <div className='rounded flex bg-gray-200'>

        <div className={`text-3xl flex justify-center items-center bg-blue-500 text-white px-4`}>
          <FaUsers/>
        </div>

        <div className='pl-4 py-1'>
            <p className='text-lg font-semibold'>Welcome</p>
            <p className='text-xl font-bold'>{user.name}</p>
        </div>

    </div>
    </div>
  )
}

export default Summary