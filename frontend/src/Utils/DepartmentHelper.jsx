import axios from "axios"
import React from "react"
import { useNavigate, useParams } from "react-router-dom"


const columns =[
    {
        name:'S No',
        selector:(row)=>row.sno
    },

    {
        name:'Department',
        selector:(row)=>row.dep_name,
        sortable:true
    },

    {
        name:'Action',
        selector:(row)=>row.action
    },
]

export const DepartmentBtn = ({_id,OnDeleteData})=>{

    const HandleDelete =async (id)=>{
        try {
            const response = await axios.delete(`http://localhost:5500/api/department/${id}`,{
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem('token')}`
                }
            })
            if(response.data.success){
                OnDeleteData(id)
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    const navigate = useNavigate()
    return(
        <div className="flex space-x-3">
            <button className="px-3 py-1 bg-green-600 text-white" onClick={()=>navigate(`/admin-dashboard/departments/${_id}`)}>Edit</button>
            <button className="px-3 py-1 bg-red-600 text-white " onClick={()=>HandleDelete(_id)}>Delete</button>
        </div>
    )
}


export default columns