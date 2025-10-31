import React, { useEffect, useState } from 'react'
import SummaryCard from './SummaryCard'
import { FaBuilding, FaCheckCircle, FaFileAlt, FaHourglassHalf, FaMoneyBillWave, FaTimesCircle, FaUsers } from 'react-icons/fa'
import axios from 'axios'
const AdminSummary = () => {
  const [summary,setSummary] = useState(null)

  useEffect(()=>{
    const fetchSummary = async ()=>{
      try {
          const summary = await axios.get('http://localhost:5500/api/dashboard/summary',{
            headers:{
              "Authorization":`Bearer ${localStorage.getItem('token')}`
            }
          })
            setSummary(summary.data)

      } catch (error) {
        console.log(error);
      }
    }
    fetchSummary()
  },[])

    if(!summary){
      return <div>Loading......</div>
    }

  return (
    
    <div className='p-6'>
        
        <h3 className='text-2xl font-bold'>Dashboard Overview </h3>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-6'>
                <SummaryCard icon={<FaUsers/>} text={"Total Employess"} number={summary.TotalEmp} color={"bg-blue-800"} />
                <SummaryCard icon={<FaBuilding/>} text={"Total Departments"} number={summary.TotalDep} color={"bg-yellow-500"} />
                <SummaryCard icon={<FaMoneyBillWave/>} text={"Monthly Pay"} number={`$ ${summary.TotalSalary}`} color={"bg-red-500"} />
            </div>

            <div className='mt-12'>
                <h4 className='text-center text-2xl font-bold'>Leave Details</h4>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>

                    <SummaryCard icon={<FaFileAlt/>} text={"Leave Applied"} number={summary.leaveSummary.appliedFor} color={"bg-blue-500"} />

                    <SummaryCard icon={<FaCheckCircle/>} text={"Leave Approved"} number={summary.leaveSummary.approved} color={"bg-green-500"} />

                    <SummaryCard icon={<FaHourglassHalf/>} text={"Leave Pending"} number={summary.leaveSummary.rejected} color={"bg-yellow-500"} />

                    <SummaryCard icon={<FaTimesCircle/>} text={"Leave Rejected"} number={summary.leaveSummary.pending} color={"bg-red-500"} />

                </div>

            </div>

    </div>
  )
}

export default AdminSummary