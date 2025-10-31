import React from "react";
import { useNavigate } from "react-router-dom";
export const column = [

    {
        name:"S no",
        selector:(row)=>row.sno,
        width:'70px',
    },

    
    {
        name:"Emp Id",
        selector:(row)=>row.employeeId,
        width:'120px',
    },

    
    {
        name:"Name",
        selector:(row)=>row.name,
        width:'120px',
    },

    
    {
        name:"Leave Type",
        selector:(row)=>row.leaveType,
        width:'140px',
    },

    
    {
        name:"Department",
        selector:(row)=>row.department,
        width:'170px',
    },

    
    {
        name:"Days",
        selector:(row)=>row.days,
        width:'80px',
    },

    
    {
        name:"Status",
        selector:(row)=>row.status,
        width:'120px',
    },

    
    {
        name:"Action",
        selector:(row)=>row.action,
    },

]


export const LeaveBtn =({id})=>{
    const navigate = useNavigate()

    const handleView = (id) =>{
        navigate(`/admin-dashboard/leave/${id}`)
    }

    return(
        <button className="px-4 py-1 bg-blue-700 rounded text-white hover:bg-blue-700" onClick={()=>handleView(id)}>View</button>
    )

}