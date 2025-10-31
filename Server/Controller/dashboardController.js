import Department from "../models/department.js";
import Employee from "../models/employee.js";
import Leave from "../models/leave.js";

export const getSummary = async (req, res) => {
    try {
        const TotalEmp = await Employee.countDocuments();
        const TotalDep = await Department.countDocuments();

        const TotalSalary = await Employee.aggregate([
            { $group: { _id: null, totalSalary: { $sum: "$salary" } } }
        ]);

        const AppliedForLeave = await Leave.distinct("employeeId");

        const leaveStatus = await Leave.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ]);

        const leaveSummary = {
            appliedFor: AppliedForLeave.length,
            approved: leaveStatus.find(item => item._id === "Approved")?.count || 0,
            rejected: leaveStatus.find(item => item._id === "Rejected")?.count || 0,
            pending: leaveStatus.find(item => item._id === "Pending")?.count || 0,
        };

        return res.status(200).json({
            success: true,
            TotalEmp,
            TotalDep,
            TotalSalary: TotalSalary[0]?.totalSalary || 0,
            leaveSummary
        });

    } catch (error) {
        console.error("Dashboard Summary Error:", error);
        return res.status(500).json({ success: false, error: "Dashboard Summary Error" });
    }
};
