import React, { useEffect, useState } from "react";
import { fetchDepartments, getEmployees } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const AddSalary = () => {
  const [salaryData, setSalaryData] = useState({
    employeeId: "",
    basicSalary: 0,
    allowances: 0,
    deduction: 0,
    payDate: "",
    department: "",
  });

  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams(); // employee id for editing, optional

  // Fetch all departments on mount
  useEffect(() => {
    const loadDepartments = async () => {
      const deps = await fetchDepartments();
      setDepartments(deps);
    };
    loadDepartments();
  }, []);

  // If editing, fetch employee data
  useEffect(() => {
    if (!id) return;
    const loadEmployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5500/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          const emp = response.data.employee;
          setSalaryData({
            employeeId: emp._id,
            department: emp.department._id,
            basicSalary: 0,
            allowances: 0,
            deduction: 0,
            payDate: "",
          });
          const emps = await getEmployees(emp.department._id);
          setEmployees(emps);
        }
      } catch (err) {
        console.log(err);
      }
    };
    loadEmployee();
  }, [id]);

  // Handle department change and load employees
  const handleDepartmentChange = async (e) => {
    const depId = e.target.value;
    setSalaryData((prev) => ({ ...prev, department: depId, employeeId: "" }));
    const emps = await getEmployees(depId);
    setEmployees(emps);
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSalaryData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5500/api/salary/add",
        salaryData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/admin-dashboard/employees");
      }
    } catch (err) {
      console.log(err);
      alert("Failed to add salary");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add Salary</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Department
            </label>
            <select
              name="department"
              value={salaryData.department}
              onChange={handleDepartmentChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Department</option>
              {departments.map((dep) => (
                <option key={dep._id} value={dep._id}>
                  {dep.dep_name}
                </option>
              ))}
            </select>
          </div>

          {/* Employee */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Employee
            </label>
            <select
              name="employeeId"
              value={salaryData.employeeId}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Employee</option>
              {employees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.employeeId}
                </option>
              ))}
            </select>
          </div>

          {/* Basic Salary */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Basic Salary
            </label>
            <input
              type="number"
              name="basicSalary"
              value={salaryData.basicSalary}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Allowances */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Allowances
            </label>
            <input
              type="number"
              name="allowances"
              value={salaryData.allowances}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Deduction */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Deduction
            </label>
            <input
              type="number"
              name="deduction"
              value={salaryData.deduction}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Pay Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Pay Date
            </label>
            <input
              type="date"
              name="payDate"
              value={salaryData.payDate}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
        >
          {id ? "Update Salary" : "Add Salary"}
        </button>
      </form>
    </div>
  );
};

export default AddSalary;
