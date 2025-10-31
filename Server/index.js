import express from 'express'
import cors from 'cors'
import router from './routes/authRoute.js'
import connectToDb from './db/db.js'
import dep_route from './routes/department.js'
import emp_route from './routes/employeeRouth.js'
import salaryRoute from './routes/salary.js'
import leaveRoute from './routes/leave.js'
import settingRoute from './routes/setting.js'
import dashboardRoute from './routes/dashboard.js'
import attendanceRouter from './routes/attendanceRoute.js'

connectToDb()

const app = express()

app.use(cors())
app.use(express.static('public/Uploads'))
app.use(express.json())

app.use('/api/auth',router)
app.use('/api/department',dep_route)

app.use('/api/employee',emp_route)

app.use('/api/salary',salaryRoute)

app.use('/api/leave',leaveRoute)

app.use('/api/setting',settingRoute)

app.use('/api/dashboard',dashboardRoute)

app.use('/api/attendance',attendanceRouter)




app.listen(process.env.PORT,()=>{
    console.log("Server is Running");
    
})