import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, AttendanceHelper } from "../../utils/AttendanceHelper";
import axios from "axios";

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredAttendance, setFilteredAttendance] = useState([]);

    const statusChange = ()=>{
        fetchAttendance()
    }


  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5500/api/attendance", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        const data = response.data.attendance.map((attend, index) => ({
          employeeId: attend.employeeId.employeeId,
          sno: index + 1,
          department: attend.employeeId?.department?.dep_name || "N/A",
          name: attend.employeeId?.userId?.name || "N/A",
          action: <AttendanceHelper status={attend.status} employeeId={attend.employeeId.employeeId} statusChange={statusChange} />,
        }));

        setAttendance(data);
        setFilteredAttendance(data); // initial copy
      }
    } catch (error) {
      console.error("Error fetching attendance:", error);
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const handleFilterEmp = (e) => {
    const keyword = e.target.value.toLowerCase();
    const records = attendance.filter((emp) =>
      emp.name.toLowerCase().includes(keyword)
    );
    setFilteredAttendance(records);
  };

  return (
    <div className="p-5">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Attendance</h3>
      </div>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search Employee"
          onChange={handleFilterEmp}
          className="px-5 py-1 border rounded"
        />

            <p>Mark Attendance <span className="text-xl">{new Date().toISOString().split('T')[0]}</span></p>

        <Link
          to={"/admin-dashboard/add-new-employee"}
          className="px-4 py-1 bg-blue-600 rounded text-white"
        >
          Attendance Report
        </Link>
      </div>

      <div>
        <DataTable
          columns={columns}
          data={filteredAttendance} // ✅ use filtered list
          pagination
          progressPending={loading}
        />
      </div>
    </div>
  );
};

export default Attendance;
