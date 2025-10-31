import React from 'react'
import Sidebar from '../components/EmpDashboard/Sidebar'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Dashboard/Navbar'

const EmployeeDashboard = () => {
  return (
    <div className='flex '>
       <Sidebar/>
     
        <div className='flex-1 ml-64  h-screen '>
            <Navbar/>
            <Outlet/>
        </div>

    </div>
  )
}

export default EmployeeDashboard
