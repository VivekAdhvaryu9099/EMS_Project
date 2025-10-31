import express from 'express'
import { attendanceReport, getAttendance, updateAttendance } from '../controller/attendanceController.js'
import authMiddleware from '../middleware/authMiddleware.js'
import defaultAttendance from '../middleware/defaultAttendance.js'

const attendanceRouter = express.Router()

attendanceRouter.get('/',authMiddleware,defaultAttendance,getAttendance)

attendanceRouter.put('/update/:employeeId',authMiddleware,updateAttendance)

attendanceRouter.get('/report',authMiddleware,attendanceReport)

export default attendanceRouter