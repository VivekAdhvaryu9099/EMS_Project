import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import DataTable from "react-data-table-component";
import columns, { DepartmentBtn } from "../../utils/DepartmentHelper";
import axios from "axios";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);

  const [depLoading,setdepLoading] = useState(false)

  const [filterDeparments,setFilterDepartments] = useState([])

  const OnDeleteData = async(id)=>{
    const data = await departments.filter(dep=>dep._id !== id)
    setDepartments(data)
  }

  useEffect(() => {
    const fetchDepartment = async () => {
      setdepLoading(true)
      try {
        const response = await axios.get(
          "http://localhost:5500/api/department",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response);
        
        if (response.data.success) {
          let sno = 1;
          const data = await response.data.getDep.map((dep) => ({
            _id: dep._id,
            sno: sno++,
            dep_name: dep.dep_name,
            action: <DepartmentBtn _id={dep._id} OnDeleteData={OnDeleteData}/>,
          }));
          setDepartments(data);
          setFilterDepartments(data);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }finally{setdepLoading(false)}
    };
    fetchDepartment()
  }, []);

  const filterDep = (e)=>{
      const records = departments.filter((dep)=>dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase()))
      setFilterDepartments(records)
  }

  return (
    <>{depLoading?<div>...LOADING</div>:
    <div className="p-5">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Departments</h3>
      </div>

      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search Departments"
          className="px-5 py-0.5"
          onChange={filterDep}
        />
        <Link
          to={"/admin-dashboard/add-new-dep"}
          className="px-4 py-1 bg-blue-600 rounded text-white"
        >
          Add New Department
        </Link>
      </div>

      <div>
        <DataTable columns={columns} data={filterDeparments} OnDeleteData={OnDeleteData} pagination/>
      </div>
    </div>
    }</>
  );
};



export default DepartmentList;
