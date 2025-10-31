import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditDepartment = () => {

    const [Dep,setDep] = useState({
        dep_name:'',
        description:''
    })

    const navigate = useNavigate()

    const {id} = useParams()

    useEffect(()=>{
        const getData = async ()=>{
           try {
             const response = await axios.put(`http://localhost:5500/api/department/${id}`,{
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem('token')}`
                }
             })

            console.log(response);

            if(response.data.success){
                setDep(response.data.getDataByID)
               
            }
           } catch (error) {
            console.log(error);
            
           }
           
        }
        getData()
    },[])

  const handleChange=(e)=>{
        const {name,value} = e.target;

        setDep({...Dep,[name] : value})
    
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()

    try {
        const response =   await axios.put(`http://localhost:5500/api/department/${id}`,Dep,{
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem('token')}`
                }
             })
             console.log(response);

             if(response.data.success){
                
                navigate('/admin-dashboard/departments')
             }
             

        
    } catch (error) {
         if(error.response && !error.response.data.success){
                alert(error.response.data.error)
            }
    }
  }

  return (
    <div className="max-w=3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
      <h3 className="text-2xl font-bold mb-6">Add Department</h3>

      <form onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="dep_name"
            className="text-sm font-medium text-gray-700"
          >
            Department Name
          </label>
          <input
            type="text"
            placeholder="Enter Department"
            name="dep_name"
            className="mt-1 w-full p-2 border border-gray-300 rounded-md "
            value={Dep.dep_name}
            onChange={handleChange}
            required
            
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            name="description"
            placeholder="Description"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            value={Dep.description}
            onChange={handleChange}
            rows={4}
           
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
        >
          Add Department
        </button>
      </form>
    </div>
  )
}

export default EditDepartment