import Salary from "../models/salary.js"
import Employee from "../models/employee.js"



export const AddSalary = async(req,res)=>{
    try {
        const {employeeId,basicSalary,allowances,deduction,payDate} = req.body

        const totalSalary = parseInt(basicSalary) + parseInt(allowances) - parseInt(deduction)


        const NewSalary = new Salary ({
            employeeId,
            basicSalary,
            allowances,
            deduction,
            netSalary:totalSalary,
            payDate
        })

        await NewSalary.save()

        return res.status(200).json({success:true,NewSalary})

    } catch (error) {   
        return res.status(500).json({success:false,error:"Add Salary Error"})
    }
}
export const fetchSalary = async (req, res) => {
    const { id } = req.params;
    try {
        // First, try to find salary by employeeId directly
        let salary = await Salary.find({ employeeId: id }).populate('employeeId', 'employeeId');

        // If not found, maybe the id is a userId
        if (!salary || salary.length < 1) {
            const employee = await Employee.findOne({ userId: id });

            if (!employee) {
                return res.status(404).json({ success: false, error: "Employee not found" });
            }

            salary = await Salary.find({ employeeId: employee._id }).populate('employeeId', 'employeeId');
        }

        return res.status(200).json({ success: true, salary });
    } catch (error) {
        console.error("Fetch Salary Error:", error);
        return res.status(500).json({ success: false, error: "Fetch Salary Error" });
    }
};

