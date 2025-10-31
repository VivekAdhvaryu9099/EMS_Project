import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { addLeave, ChangeDetail, fetchLeave, getDetail, getLeave } from '../controller/leaveController.js'


const leaveRoute = express.Router()


leaveRoute.get('/:id',authMiddleware,fetchLeave)
leaveRoute.post('/add',authMiddleware,addLeave)

leaveRoute.get('/',authMiddleware,getLeave)
leaveRoute.get('/detail/:id',authMiddleware,getDetail)

leaveRoute.put('/:id',authMiddleware,ChangeDetail)

export default leaveRoute