import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import {addDepartment, DeleteData, getDataById, getDepartment, UpdateData } from '../controller/departmentController.js'

const dep_route = express.Router()

dep_route.post('/add',authMiddleware,addDepartment)

dep_route.get('/',authMiddleware,getDepartment)

dep_route.get('/:id',authMiddleware,getDataById)

dep_route.put('/:id',authMiddleware,UpdateData)

dep_route.delete('/:id',authMiddleware,DeleteData)


export default dep_route