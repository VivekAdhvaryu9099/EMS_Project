import Attendance from "../models/attendance.js";
import Employee from "../models/employee.js";


export const getAttendance = async (req , res)=>{
    try{
        const date = new Date().toISOString().split('T')[0];
    
        const attendance = await Attendance.find({date}).populate({
            path:'employeeId',
            populate:[
                "department",
                "userId"
            ]
        })

        res.status(200).json({success:true,attendance})


    }catch(error){
        console.log(error);
        res.status(500).json({success:false,message:error.message}) 
        
    }

}


// controller updateAttendance
export const updateAttendance = async (req,res)=>{
  try {
    const { employeeId } = req.params;   // this is EMP001 from frontend
    const { status } = req.body;
    const date = new Date().toISOString().split("T")[0];

    // find employee by employeeId field
    const employee = await Employee.findOne({ employeeId });
    if (!employee) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }

    // update attendance for that employee on this date
    const attendance = await Attendance.findOneAndUpdate(
      { employeeId: employee._id, date },
      { status },
      { new: true }
    );

    if (!attendance) {
      return res.status(404).json({ success: false, message: "Attendance not found" });
    }

    return res.status(200).json({ success: true, attendance });
  } catch (error) {
    console.error("Update error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};


export const attendanceReport = async (req, res) => {
  try {
    const { date, limit = 5, skip = 0 } = req.query;

    // Initialize query object
    const query = {};
    if (date) {
      query.date = date;
    }

    const attendanceData = await Attendance.find(query)
      .populate({
        path: "employeeId",
        populate: ["department", "userId"],
      })
      .sort({ date: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip));

    const groupData = attendanceData.reduce((result, record) => {
      if (!result[record.date]) {
        result[record.date] = [];
      }

      result[record.date].push({
        employeeId: record.employeeId.employeeId,
        employeeName: record.employeeId.userId.name,
        departmentName: record.employeeId.department.dep_name,
        status: record.status || "Not Marked",
      });

      return result;
    }, {});

    return res.status(200).json({ success: true, groupData });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message });
  }
};
