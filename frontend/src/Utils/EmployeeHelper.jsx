
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";


export const columns =[
    {
        name:'S No',
        selector:(row)=>row.sno
    },

    {
        name:'Name',
        selector:(row)=>row.name,
        sortable:true
    },
    {
        name:'Image',
        selector:(row)=>row.profileImage,
        sortable:true
    },
    {
        name:'Department',
        selector:(row)=>row.dep_name,
        sortable:true
    },
    {
        name:'DOB',
        selector:(row)=>row.dob,
        sortable:true
    },



    {
        name:'Action',
        selector:(row)=>row.action
    },
]


export const fetchDepartments = async ()=>{
    let departments;
      try {
        const response = await axios.get(
          "http://localhost:5500/api/department",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response);
        
        if (response.data.success) {
            departments=response.data.getDep
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }

      return departments ; 
    };


    //Employee and Salary


    
export const getEmployees = async (id)=>{
    let employees;
      try {
        const response = await axios.get(
          `http://localhost:5500/api/employee/department/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response);
        
        if (response.data.success) {
            employees=response.data.employees
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }

      return employees ; 
    };



    export const EmployeeBtn = ({_id})=>{
    
        const navigate = useNavigate()
        return(
            <div className="flex space-x-3">
                <button className="px-3 py-1 bg-blue-600 text-white" onClick={()=>navigate(`/admin-dashboard/employees/${_id}`)}>View</button>
                <button className="px-3 py-1 bg-green-600 text-white " onClick={()=>navigate(`/admin-dashboard/employees/edit/${_id}`)} >Edit</button>
                <button className="px-3 py-1 bg-yellow-600 text-white " onClick={()=>navigate(`/admin-dashboard/employees/salary/${_id}`)}>Salary</button>
                <button className="px-3 py-1 bg-purple-600 text-white "  onClick={()=>navigate(`/admin-dashboard/employees/leave/${_id}`)} >Leave</button>
            </div>
        )
    }
    