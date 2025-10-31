import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import DataTable from "react-data-table-component";
import { columns, EmployeeBtn } from "../../utils/EmployeeHelper";
import axios from "axios";

const List = () => {
  const [employee, setEmployee] = useState([]);

  const [empLoading, setEmpLoading] = useState(false);

  const [filteredEmp,setFilteredEmp] = useState([])

  useEffect(() => {
    const fetchEmployee = async () => {
      setEmpLoading(true);
      try {
        const response = await axios.get("http://localhost:5500/api/employee", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(response.data);

        if (response.data.success) {
          let sno = 1;
          const data = response.data.employees.map((emp, index) => ({
            _id: emp._id,
            sno: index + 1,
            dep_name: emp.department?.dep_name || "N/A",
            name: emp.userId?.name || "N/A",
            dob: emp.dob ? new Date(emp.dob).toDateString() : "N/A",
            profileImage: emp.userId?.ProfileImage
              ? <img src={`http://localhost:5500/${emp.userId.ProfileImage}`} alt="Image" className="rounded w-15 h-15" />
              : "/default.png",
            action: <EmployeeBtn _id={emp._id} />,
          }));

          setEmployee(data);
          setFilteredEmp(data);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setEmpLoading(false);
      }
    };
    fetchEmployee();
  }, []);

  const handleFilterEmp = (e)=>{
    const records = employee.filter((emp)=>{
      emp.name.toLowerCase().includes(e.target.value.toLowerCase())
      
    })
    setFilteredEmp(records)
  }

  return (
    <div className="p-5">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Employees</h3>
      </div>

      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search Employee"
          onChange={handleFilterEmp}
          className="px-5 py-0.5"
        />
        <Link
          to={"/admin-dashboard/add-new-employee"}
          className="px-4 py-1 bg-blue-600 rounded text-white"
        >
          Add New Employee
        </Link>
      </div>

      <div>
        <DataTable columns={columns} data={filteredEmp} pagination />
      </div>
    </div>
  );
};

export default List;
