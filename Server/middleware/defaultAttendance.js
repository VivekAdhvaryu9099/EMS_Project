import Attendance from "../models/attendance.js";
import Employee from "../models/employee.js";

const defaultAttendance = async (req, res, next) => {
  try {
    const date = req.query.date || new Date().toISOString().split("T")[0];

    let attendanceRecords = await Attendance.find({ date });

    // If no attendance exists for this date, create it
    if (attendanceRecords.length === 0) {
      const employees = await Employee.find();

      const attendance = employees.map((employee) => ({
        date,
        employeeId: employee._id,
        status: null,
      }));

      await Attendance.insertMany(attendance);
      attendanceRecords = await Attendance.find({ date });
      console.log(`Attendance seeded for ${employees.length} employees on ${date}`);
    }

    // Pass attendance records to next middleware or route
    req.attendanceRecords = attendanceRecords;

    next();
  } catch (error) {
    console.error("Default Attendance Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export default defaultAttendance;
