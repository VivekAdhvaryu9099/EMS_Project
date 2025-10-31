import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { AddSalary, fetchSalary } from '../controller/salaryController.js'

const salaryRoute = express.Router()


salaryRoute.get('/:id',authMiddleware,fetchSalary)
salaryRoute.post('/add',authMiddleware,AddSalary)


export default salaryRoute