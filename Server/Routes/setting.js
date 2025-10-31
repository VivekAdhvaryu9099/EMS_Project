import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { change_password } from '../controller/settingController.js'


const settingRoute = express.Router()

settingRoute.post('/change_password',authMiddleware,change_password)

export default settingRoute