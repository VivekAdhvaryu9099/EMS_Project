import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const LeaveDetail = () => {
  const { id } = useParams();

  const [leave, setLeave] = useState(null);

  const navigate = useNavigate()

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5500/api/leave/detail/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        console.log(response.data);

        if (response.data.success) {
          setLeave(response.data.leaves);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchDetail();
  }, []);

  const changeStatus = async (id,status)=>{
        try {
            const response = await axios.put(`http://localhost:5500/api/leave/${id}`,{status},{
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem('token')}`
                }
            })
            if(response.data.success){
                navigate('/admin-dashboard/leave')
            }
        } catch (error) {
            
        }
  }

  return (
    <>
      {leave ? (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded shadow-lg">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Leave Detail Detail
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img
                src={`http://localhost:5500/${leave?.employeeId?.userId?.ProfileImage}`}
                alt="Image"
                className="w-65 rounded"
              />
            </div>

            <div>
              <div className="flex items-center space-x-3 mb-5">
                <p className="text-lg font-bold">Name:</p>
                <p className="font-medium text-xl">
                  {leave.employeeId?.userId?.name}
                </p>
              </div>

              <div className="flex  items-center space-x-3 mb-5">
                <p className="text-lg font-bold">Employee Id:</p>
                <p className="font-medium text-xl">
                  {leave?.employeeId?.employeeId}
                </p>
              </div>

              <div className="flex items-center space-x-3 mb-5">
                <p className="text-lg font-bold">Leave Type:</p>
                <p className="font-medium text-xl">{leave?.leaveType}</p>
              </div>

              <div className="flex items-center space-x-3 mb-5">
                <p className="text-lg font-bold">Reason:</p>
                <p className="font-medium text-xl">{leave?.reason}</p>
              </div>

              <div className="flex items-center space-x-3 mb-5">
                <p className="text-lg font-bold">Department:</p>
                <p className="font-medium text-xl">
                  {leave?.employeeId?.department?.dep_name}
                </p>
              </div>

              <div className="flex items-center space-x-3 mb-5">
                <p className="text-lg font-bold">From:</p>
                <p className="font-medium text-xl">
                  {new Date(leave?.startDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center space-x-3 mb-5">
                <p className="text-lg font-bold">To:</p>
                <p className="font-medium text-xl">
                  {new Date(leave?.endDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center space-x-3 mb-5">
                <p className="text-lg font-bold">Total Days:</p>
                <p className="font-medium text-xl">
                  {Math.ceil(
                    (new Date(leave.endDate) - new Date(leave.startDate)) /
                      (1000 * 60 * 60 * 24)
                  ) + 1}
                </p>
              </div>

              <div className="flex items-center space-x-3 mb-5">
                <p className="text-lg font-bold">
                  {leave.status === "Pending" ? "Action:" : "Status:"}
                </p>

                {leave.status === "Pending" ? (
                  <div className="flex space-x-2">
                    <button
                      className="bg-green-700  rounded p-2 text-white font-bold cursor-pointer hover:bg-green-600"
                      onClick={() => changeStatus(leave._id, "Approved")}
                    >
                      Approve
                    </button>
                    <button className="bg-red-800  rounded p-2 text-white font-bold cursor-pointer hover:bg-red-600"
                     onClick={() => changeStatus(leave._id, "Rejected")}>
                      Reject
                    </button>
                  </div>
                ) : (
                  <p className="font-medium text-xl">{leave.status}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading....</div>
      )}
    </>
  );
};

export default LeaveDetail;
