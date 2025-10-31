import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { AddEmployee,fetchEmployee,getEmp,getEmployee,updateEmp,Upload } from '../controller/employeeController.js'

const emp_route = express.Router()

emp_route.get('/',authMiddleware,getEmployee)
emp_route.post('/add',authMiddleware,Upload.single('ProfileImage'),AddEmployee)



emp_route.get('/:id',authMiddleware,getEmp)

emp_route.put('/edit/:id',authMiddleware,updateEmp)

emp_route.get('/department/:id',authMiddleware,fetchEmployee)

// dep_route.put('/:id',authMiddleware,UpdateData)

// dep_route.delete('/:id',authMiddleware,DeleteData)


export default emp_route