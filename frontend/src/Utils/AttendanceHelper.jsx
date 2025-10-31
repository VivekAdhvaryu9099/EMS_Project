import axios from "axios"
import React from "react"


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
        name:'Emp Id',
        selector:(row)=>row.employeeId,
        sortable:true
    },

    {
        name:'Department',
        selector:(row)=>row.department,
        sortable:true
    },
  

    {
        name:'Action',
        selector:(row)=>row.action
    },
]

export const AttendanceHelper = ({status,employeeId,statusChange}) => {
   const markEmployee = async (status, employeeId) => {
  try {
    const response = await axios.put(
      `http://localhost:5500/api/attendance/update/${employeeId}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.data.success) {
      statusChange(); // refresh attendance
    } else {
      alert(response.data.message);
    }
  } catch (error) {
    console.error("Update attendance failed:", error);
    alert(error.response?.data?.message || "Something went wrong");
  }
};

  return (
    <div>
        {status==null ?(
            
           <div className="flex flex-wrap">
                <button className="px-4 py-2 bg-green-600 text-white" onClick={()=>markEmployee('Present',employeeId)}>Present</button>
                <button className="px-4 py-2 bg-red-600 text-white" onClick={()=>markEmployee('Absent',employeeId)}>Absent</button>
                <button className="px-4 py-2 bg-orange-600 text-white" onClick={()=>markEmployee('HalfDay',employeeId)}>HalfDay</button>
                <button className="px-4 py-2 bg-yellow-600 text-white" onClick={()=>markEmployee('Leave',employeeId)}>Leave</button>
           </div> 
          )  :(
            <p className="bg-blue-300 w-20 text-center py-2 rounded">{status}</p>
          )
}
    </div>
  )
}

