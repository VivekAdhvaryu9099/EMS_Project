import mongoose, { Schema } from "mongoose";


const LeaveSchema = new Schema({
    employeeId : {type:Schema.Types.ObjectId,ref:"Employee",required:true},
    leaveType:{
        type:String,
        enum:["sick_leave","casual_leave" , "annual_leavee"],
        required:true
    },
    startDate:{type:Date,required:true},
    endDate:{type:Date,required:true},
    reason:{type:String,required:true},
    status:{
        type:String,
        enum:['Pending','Approved','Rejected'],
        default:'Pending'
    },
    appliedAt:{type:Date,default:Date.now},
    updatedAt:{type:Date,default:Date.now}
});

const Leave = mongoose.model('Leave',LeaveSchema);

export default Leave ;