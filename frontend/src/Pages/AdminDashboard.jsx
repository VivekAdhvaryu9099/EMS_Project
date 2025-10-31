import React from 'react'
import { useAuth } from '../context/authContext'
import AdminSidebar from '../components/Dashboard/AdminSidebar'
import Navbar from '../components/Dashboard/Navbar'
import AdminSummary from '../components/Dashboard/AdminSummary'
import { Outlet } from 'react-router-dom'

const AdminDashboard = () => {

  const {user} = useAuth()

  return (
    
    <div className='flex '>
       <AdminSidebar/>
     
        <div className='flex-1 ml-64  h-screen '>
            <Navbar/>
            <Outlet/>
        </div>

    </div>
  )
}

export default AdminDashboard
