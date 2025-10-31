import Department from "../models/department.js"

const addDepartment = async (req,res)=>{
    
    try {
        const {dep_name,description} = req.body

        const newDep = new Department({
            dep_name:dep_name,
            description:description
        })

        await newDep.save()

        return res.status(200).json({success:true,department:newDep})

    } catch (error) {
        return res.status(500).json({success:false,error:"Server Error IN ADD Department"})
    }

}

const getDepartment = async(req,res)=>{
    try {
        const getDep = await Department.find()

        return res.status(200).json({success:true,getDep})

    } catch (error) {
         return res.status(500).json({success:false,error:"Server Error IN GET Department"})
    }
}

const getDataById = async (req,res)=>{
    const {id} = req.params
    try {
        const getDataByID = await Department.findById(id)
        return res.status(200).json({success:true,getDataByID})
    } catch (error) {
          return res.status(500).json({success:false,error:"Server Error IN GET ID Department"})
    }
}

const UpdateData = async (req,res)=>{
    const {id} = req.params


    try {
        const UpdateOne = await Department.findByIdAndUpdate(id,req.body,{new:true})
          return res.status(200).json({success:true,UpdateOne})
    } catch (error) {
        return res.status(500).json({success:false,error:"Server Error IN Update Department"})
    }
}

const DeleteData = async(req,res)=>{
    try {
        const {id} = req.params
        const DelData = await Department.findById(id)
        await DelData.deleteOne()
         return res.status(200).json({success:true,DelData})
    } catch (error) {
         return res.status(500).json({success:false,error:"Server Error IN Delete Department"})
    }
}

export  {addDepartment,getDepartment,getDataById,UpdateData,DeleteData}