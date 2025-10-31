import Employee from "../models/employee.js";
import Leave from "../models/leave.js";

export const addLeave = async (req, res) => {
  try {
    const { userId, leaveType, startDate, endDate, reason } = req.body;

    const employee = await Employee.findOne({ userId: userId });

    const EmpLeave = new Leave({
      employeeId: employee._id,
      leaveType,
      startDate,
      endDate,
      reason,
    });

    await EmpLeave.save();

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Add Leave Error" });
  }
};

export const fetchLeave = async (req, res) => {
  try {
    const { id } = req.params;

    // Step 1: Try directly with employeeId
    let fetchLeave = await Leave.find({ employeeId: id });

    // Step 2: If no results, maybe id is a userId → find employee
    if (fetchLeave.length === 0) {
      const employee = await Employee.findOne({ userId: id });
      if (employee) {
        fetchLeave = await Leave.find({ employeeId: employee._id });
      }
    }

    return res.status(200).json({ success: true, fetchLeave });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Fetch Leave Error" });
  }
};

export const getLeave = async (req, res) => {
  try {
    const leaves = await Leave.find().populate({
      path: "employeeId",
      select: "employeeId department userId", // pick fields you need
      populate: [
        { path: "department", select: "dep_name" },
        { path: "userId", select: "name" }
      ]
    });

    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: "Get Leave Error" });
  }
};



export const getDetail = async (req, res) => {
  try {
    const {id} = req.params
    const leaves = await Leave.findById(id).populate({
      path: "employeeId",
      select: "employeeId department userId", // pick fields you need
      populate: [
        { path: "department", select: "dep_name" },
        { path: "userId", select: "name , ProfileImage" }
      ]
    });

    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: "Get Leave Error" });
  }
};



export const ChangeDetail = async (req,res)=>{
    try {
        const {id} = req.params;
        const leave = await Leave.findByIdAndUpdate(id,{status:req.body.status},{new:true})
        if(!leave){
            return res.status(500).json({ success: false, error: "Leave Found Error" })
        }
         return res.status(200).json({ success: true, message:"Leave Change Done" });
    } catch (error) {
        
    }
}