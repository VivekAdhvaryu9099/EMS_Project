import path from "path";
import Employee from "../models/employee.js";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import multer from "multer";
import Department from '../models/department.js'
// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/Uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const Upload = multer({ storage });

// Add Employee
const AddEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department, // must be ObjectId from frontend
      salary,
      password,
      role,
    } = req.body;

    // Check existing user/employee
    if (await User.findOne({ email })) {
      return res.status(400).json({ success: false, error: "User already exists" });
    }
    if (await Employee.findOne({ employeeId })) {
      return res.status(400).json({ success: false, error: "Employee ID already exists" });
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create User
    const newUser = new User({
      name,
      email,
      password: hashPassword,
      role,
      ProfileImage: req.file ? req.file.filename : "",
    });
    const savedUser = await newUser.save();

    // Create Employee
    const newEmployee = new Employee({
      userId: savedUser._id,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
    });
    await newEmployee.save();

    res.status(200).json({ success: true, message: "Employee created successfully" });
  } catch (error) {
    console.error("Error adding employee:", error);
    res.status(500).json({ success: false, message: "Server error in adding employee" });
  }
};

// Get Employees
const getEmployee = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("userId", "name ProfileImage role") // include name and profile image
      .populate("department", "dep_name"); // include department name only

    res.status(200).json({ success: true, employees });
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ success: false, message: "Server error in getting employee" });
  }
};

const getEmp = async (req, res) => {
    const {id} = req.params
  try {
      let employee;
       employee = await Employee.findById(id) 
      .populate("userId", "name ProfileImage role") // include name and profile image
      .populate("department", "dep_name");

      if(!employee){
        employee = await Employee.findOne({userId:id})
        .populate('userId',{password:0})
        .populate('department')
      }

        return res.status(200).json({success:true,employee})

  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ success: false, message: "Server error in getting employee" });
  }
};


const updateEmp = async (req,res)=>{
      try {
        const {id} = req.params

     const {
      name,
      maritalStatus,
      designation,
      department, // must be ObjectId from frontend
      salary,
    } = req.body;

    const employee = await Employee.findById(id);

    if(!employee){
       return res.status(500).json({success:false, error:"Employee not Found"})
    }

    const user = await User.findById({_id:employee.userId})

    
    if(!user){
       return res.status(500).json({success:false, error:"User not Found"})
    }

    const updateUser = await User.findByIdAndUpdate({_id:employee.userId},{name})
    const updateEmployee = await Employee.findByIdAndUpdate({_id:id},{
      name,
      maritalStatus,
      designation,
      department,
      salary
    })

      if(!updateEmployee || !updateUser){
          return res.status(500).json({success:false, error:"Dpcument not Found"})
      }

          return res.status(200).json({success:true,message:"Employee update"})


      } catch (error) {
         res.status(500).json({ success: false, message: "Server error in updating employee" });
      }
}


const fetchEmployee = async (req,res)=>{
    const {id} = req.params
  try {
      const employees = await Employee.find({department:id}) 

        return res.status(200).json({success:true,employees})

  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ success: false, message: "Server error in getting employee" });
  }
}


export { AddEmployee, Upload, getEmployee,getEmp,updateEmp,fetchEmployee };
