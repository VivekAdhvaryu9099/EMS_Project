import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { getSummary } from '../controller/dashboardController.js'

const dashboardRoute = express.Router()

dashboardRoute.get('/summary',authMiddleware,getSummary)


export default dashboardRoute