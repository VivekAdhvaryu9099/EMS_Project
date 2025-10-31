import React, { useEffect, useState } from "react";
import { column, LeaveBtn } from "../../utils/LeaveHelper";
import DataTable from "react-data-table-component";
import axios from "axios";

const TableLeave = () => {
  const [leaves, setLeave] = useState(null);

  const [filterLeave, setFilterLeave] = useState(null);

  const fetchLeave = async () => {
    try {
      const response = await axios.get("http://localhost:5500/api/leave", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response.data);

      if (response.data.success) {
        let sno = 1;
        const data = response.data.leaves.map((leave, index) => ({
          _id: leave._id,
          sno: index + 1,
          employeeId: leave.employeeId?.employeeId || "N/A",
          name: leave.employeeId?.userId?.name || "N/A",
          department: leave.employeeId?.department?.dep_name || "N/A",
          leaveType: leave.leaveType,
          days:
            leave.startDate && leave.endDate
              ? Math.ceil(
                  (new Date(leave.endDate) - new Date(leave.startDate)) /
                    (1000 * 60 * 60 * 24)
                ) + 1
              : 0,
          status: leave.status,
          action: <LeaveBtn id={leave._id} />,
        }));

        setLeave(data);
        setFilterLeave(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  useEffect(() => {
    fetchLeave();
  }, []);

  const filterByInput = (e) => {
    const data = leaves.filter((leave) =>
      leave.employeeId.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilterLeave(data)
  };

  const filterByButton=(status)=>{
    const data = leaves.filter((leave) =>
      leave.status.toLowerCase().includes(status.toLowerCase())
    );
    setFilterLeave(data)
  }

  return (
    <>
      {filterLeave ? (
        <div className="p-6">
          <div className="p-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold">Manage Leaves</h3>
            </div>

            <div className="flex justify-between items-center">
              <input
                type="text"
                placeholder="Search Here"
                className="px-4 py-0.5 border"
                onChange={filterByInput}
              />

              <div className="space-x-3">
                <button className="px-2 py-1 bg-blue-800 text-white hover:bg-blue-700" onClick={()=>filterByButton('Pending')}>
                  Pending
                </button>
                <button className="px-2 py-1 bg-blue-800 text-white hover:bg-blue-700" onClick={()=>filterByButton('Approved')}>
                  Approved
                </button>
                <button className="px-2 py-1 bg-blue-800 text-white hover:bg-blue-700" onClick={()=>filterByButton('Rejected')}>
                  Rejected
                </button>
              </div>
            </div>
          </div>

          <DataTable columns={column} data={filterLeave} pagination />
        </div>
      ) : (
        <div>Loading........</div>
      )}
    </>
  );
};

export default TableLeave;
