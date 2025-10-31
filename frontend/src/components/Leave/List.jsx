import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Link, useParams} from 'react-router-dom'


const List = () => {
  const [leave,setLeave] = useState([]);

  const {id} = useParams()    

    useEffect(()=>{
        const FetchLeave = async ()=>{

            try {
                const response = await axios.get(`http://localhost:5500/api/leave/${id}`,{
                  headers:{
                    "Authorization":`Bearer ${localStorage.getItem('token')}`
                  }
                })
                console.log(response.data)
                setLeave(response.data.fetchLeave)
            } catch (error) {
                console.log(error);
                
            }

        }
        FetchLeave()
    },[])

  return (
    <>
    <div className='p-6'>
            <div className='text-center'>
                <h3 className='text-2xl font-bold'>Manage Leaves</h3>
            </div>

            <div className='flex justify-between items-center'>
                <input type="text" 
                placeholder='Search Here'
                className='px-4 py-0.5 border'/>

                <Link to={'/employee-dashboard/add-leave'} className='px-4 py-1 bg-blue-500 rounded text-white'>Add New Leave</Link>
            </div>
    </div>


        <table className="w-full text-sm text-left text-gray-500 border">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3">SNO</th>
                  <th className="px-6 py-3">Leave Type</th>
                  <th className="px-6 py-3">From</th>
                  <th className="px-6 py-3">To</th>
                  <th className="px-6 py-3">Description</th>
                  <th className="px-6 py-3">Applied_Date</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>

               <tbody>
                  {leave.map((l,index)=>(
                
                    <tr key={l._id} className="bg-white border-b">
                     <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{l.leaveType}</td>
                    <td className="px-6 py-4">{new Date(l.startDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4">{new Date(l.endDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4">{l.reason}</td>
                    <td className="px-6 py-4">{new Date(l.appliedAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">{l.status}</td>
                    
                    </tr>
                  ))}
              </tbody>

              </table>

                </>
  )
}

export default List