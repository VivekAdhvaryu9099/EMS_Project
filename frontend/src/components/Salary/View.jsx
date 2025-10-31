import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const View = () => {
  const [salary, setSalary] = useState([]);
  const [filteredSalaries, setFilteredSalaries] = useState([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  // Fetch salaries from backend
  const fetchSalaries = async () => {
    try {
      const response = await axios.get(`http://localhost:5500/api/salary/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
         const data = Array.isArray(response.data.salary)
        ? response.data.salary
        : [response.data.salary];
    setSalary(data);
    setFilteredSalaries(data);
    console.log(response.data);
    
}
      
    } catch (error) {
      console.error("Error fetching salaries:", error);
      alert("Failed to fetch salaries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSalaries();
  }, []);

  // Filter salaries by employee ID
  const handleSearch = (query) => {
    const filtered = salary.filter((s) =>
      s.employeeId.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredSalaries(filtered);
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-x-auto p-5">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold">Salary History</h2>
          </div>

          <div className="flex justify-end mb-3">
            <input
              type="text"
              placeholder="Search By Emp ID"
              className="border px-2 rounded-md py-1 border-gray-300"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          {filteredSalaries.length === 0 ? (
            <div>No Records</div>
          ) : (
            <table className="w-full text-sm text-left text-gray-500 border">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3">SNO</th>
                  <th className="px-6 py-3">EMP ID</th>
                  <th className="px-6 py-3">Salary</th>
                  <th className="px-6 py-3">Allowance</th>
                  <th className="px-6 py-3">Deduction</th>
                  <th className="px-6 py-3">Total</th>
                  <th className="px-6 py-3">Pay Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredSalaries.map((s, index) => (
                  <tr key={s._id} className="bg-white border-b">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{s.employeeId.employeeId}</td>
                    <td className="px-6 py-4">{s.basicSalary}</td>
                    <td className="px-6 py-4">{s.allowances}</td>
                    <td className="px-6 py-4">{s.deduction}</td>
                    <td className="px-6 py-4">{s.netSalary}</td>
                    <td className="px-6 py-4">
                      {new Date(s.payDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </>
  );
};

export default View;
