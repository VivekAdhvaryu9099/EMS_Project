import React, { useEffect, useState } from "react";
import axios from "axios";

const AttendanceReport = () => {
  const [report, setReport] = useState({});
  const [loading, setLoading] = useState(false);
  const [dateFilter, setDateFilter] = useState("");

  const fetchReport = async () => {
    setLoading(true);
    try {
      const params = {};
      if (dateFilter) params.date = dateFilter;

      const response = await axios.get(
        `http://localhost:5500/api/attendance/report`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params,
        }
      );

      if (response.data.success) {
        setReport(response.data.groupData);
      }
    } catch (error) {
      console.log("Error fetching report:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [dateFilter]);

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Attendance Report</h2>

      <div className="mb-4">
        <label className="mr-2 font-medium">Filter by Date:</label>
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="border p-1 rounded"
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : Object.keys(report).length === 0 ? (
        <p>No attendance records found.</p>
      ) : (
        Object.keys(report).map((date) => (
          <div key={date} className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Date: {date}</h3>
            <table className="w-full border">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border px-4 py-2">S No</th>
                  <th className="border px-4 py-2">Employee ID</th>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Department</th>
                  <th className="border px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {report[date].map((emp, index) => (
                  <tr key={emp.employeeId}>
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{emp.employeeId}</td>
                    <td className="border px-4 py-2">{emp.employeeName}</td>
                    <td className="border px-4 py-2">{emp.departmentName}</td>
                    <td className="border px-4 py-2">{emp.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
};

export default AttendanceReport;
