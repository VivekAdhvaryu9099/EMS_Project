import React from 'react'
import { useAuth } from '../../context/authContext'

const Navbar = () => {
    const {user,logout} = useAuth()
  return (
    <div className='flex items-center justify-between h-12 bg-blue-800 px-5 p-6'>
        <p className='text-white'>Welcome {user.name}</p>
        <button className='px-4 py-1 bg-red-600 text-white cursor-pointer hover:bg-red-700' onClick={logout}>Logout</button>
    </div>
  )
}

export default Navbar