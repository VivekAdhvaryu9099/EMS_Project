import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const AddLeave = () => {
    const {user} = useAuth()
    const [leave,setLeave] = useState({
        userId:user._id
       
    })


  const handleChange = (e) => {
    const {name,value} = e.target

    setLeave((prevState)=>({...prevState,[name]:value}))
  };

  const navigate = useNavigate()

  const handleSubmit = async (e)=>{
      e.preventDefault()
           try {
             const response = await axios.post(`http://localhost:5500/api/leave/add`,leave,{
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem('token')}`
                }
             })

            console.log(response.data);

            if(response.data.success){
                navigate(`/employee-dashboard/leave/${user._id}`)
            }
           } catch (error) {
            // alert(error)
            console.log("Failed To Add");
            
           }
           
        }


  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Request For Leave</h2>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Leave Type
            </label>

            <select
              name="leaveType"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            >

                <option value="">Select Leave Type</option>
                <option value="sick_leave">Sick Leave</option>
                <option value="casual_leave">Casual Leave</option>
                <option value="annual_leave">Annual Leave</option>
            </select>
          </div>
                {/* from Date */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">From Date</label>
                    <input 
                    type="date"
                    name="startDate"
                    onChange={handleChange}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required />
                </div>

                    {/* to date */}

                     <div>
                    <label className="block text-sm font-medium text-gray-700">To Date</label>
                    <input 
                    type="date"
                    name="endDate"
                    onChange={handleChange}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required />
                </div>


                {/* description */}

                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea name="reason" 
                    placeholder="Reason"
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-5"></textarea>
                </div>
        </div>

            <button type="submit" className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md">
                Request For A Leave
            </button>
      </form>
    </div>
  );
};

export default AddLeave;
