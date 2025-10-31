
import React, { useState } from 'react'

import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import PrivateRoute from './utils/PrivateRoute'
import RoleBasedRoute from './utils/RoleBasedRoute'
import AdminSummary from './components/Dashboard/AdminSummary'
import DepartmentList from './components/Departments/DepartmentList'
import AddDepartments from './components/Departments/AddDepartments'
import EditDepartment from './components/Departments/EditDepartment'
import List from './components/Employee/List'
import AddEmployee from './components/Employee/AddEmployee'
import View from './components/Employee/View'
import Edit from './components/Employee/Edit'
import Add from './components/Salary/Add'

import SalaryView from './components/Salary/View'
import EmployeeDashboard from './pages/EmployeeDashboard'
import Summary from './components/EmpDashboard/Summary'

import LeaveList from './components/Leave/List'
import AddLeave from './components/Leave/AddLeave'
import Setting from './components/EmpDashboard/Setting'
import TableLeave from './components/Leave/TableLeave'
import LeaveDetail from './components/Leave/LeaveDetail'
import Attendance from './components/Dashboard/Attendance'
import AttendanceReport from './components/Dashboard/AttendanceReport'


function App() {

  return (
  <BrowserRouter>
      <Routes>
          <Route path='/' element={<Navigate to={'/admin-dashboard'} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/admin-dashboard' element={
            
            <PrivateRoute>
             
              <RoleBasedRoute requiredRole={['admin']}>
                <AdminDashboard />
              </RoleBasedRoute>
            
            </PrivateRoute>
            }>

              <Route index element={<AdminSummary/>}></Route>

              <Route path='/admin-dashboard/departments' element={<DepartmentList/>}></Route>

              <Route path='/admin-dashboard/add-new-dep' element={<AddDepartments/>}></Route>

              <Route path='/admin-dashboard/departments/:id' element={<EditDepartment/>}></Route>

        
                <Route path='/admin-dashboard/employees' element={<List/>}></Route>
              <Route path='/admin-dashboard/add-new-employee' element={<AddEmployee/>}></Route>

              <Route path='/admin-dashboard/employees/:id' element={<View/>}></Route>

              <Route path='/admin-dashboard/employees/edit/:id' element={<Edit/>}></Route>
           
              <Route path='/admin-dashboard/employees/salary/:id' element={<SalaryView/>}></Route>

              <Route path='/admin-dashboard/salary/add' element={<Add/>}></Route>

              <Route path='/admin-dashboard/leave' element={<TableLeave/>}></Route>

              <Route path='/admin-dashboard/leave/:id' element={<LeaveDetail/>}></Route>
              
              <Route path='/admin-dashboard/employees/leave/:id' element={<LeaveList/>}></Route>

              <Route path='/admin-dashboard/setting' element={<Setting/>}></Route>

              <Route path='/admin-dashboard/attendance' element={<Attendance/>}></Route>
              <Route path='/admin-dashboard/attendance/report' element={<AttendanceReport/>}></Route>
              


            </Route>

    

          <Route path='/employee-dashboard' element={
            
            <PrivateRoute>

            <RoleBasedRoute requiredRole={['admin','employee']}>
              <EmployeeDashboard/>
              </RoleBasedRoute>  
            
            </PrivateRoute>
            } >

                <Route index element={<Summary/>} />

                <Route path='/employee-dashboard/profile/:id' element={<View/>} />

                <Route path='/employee-dashboard/leave/:id' element={<LeaveList/>} />
                <Route path='/employee-dashboard/add-leave' element={<AddLeave/>} />
                <Route path='/employee-dashboard/salary/:id' element={<SalaryView/>} />
                <Route path='/employee-dashboard/setting' element={<Setting/>} />

            </Route>
            
           
      </Routes>
  
  </BrowserRouter>
  )
}

export default App
