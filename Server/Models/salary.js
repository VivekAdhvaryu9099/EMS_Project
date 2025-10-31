import mongoose, { Schema } from "mongoose";


const SalarySchema = new mongoose.Schema({
    employeeId:{type:Schema.Types.ObjectId,ref:'Employee',required:true},
    basicSalary:{type:Number,required:true},
    allowances:{type:Number},
    deduction:{type:Number},
    netSalary:{type:Number},
    payDate:{type:Date,required:true},
    createdAt:{type:Date,default:Date.now},
    updatedAt:{type:Date,default:Date.now},
});


const Salary = mongoose.model('Salary',SalarySchema)

export default Salary;