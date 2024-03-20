// Student model
let studentSchema = require('../models/Student');

// Create Student
exports.createStudent = async(req, res, next)=>{
    try {
        let data = await studentSchema.create(req.body);
        console.log(data);
        res.status(200).json(data);
    } catch(error){
        return next(error);
    }
}

// Get all student
exports.getAllStudent = async(req, res)=>{
    try{
        let data = await studentSchema.find();
        res.status(200).json(data);
    } catch(error){
        return next(error);
    }
}

// Get single student
exports.getStudent = async(req, res)=>{
    try{
        let data = await studentSchema.findById(req.params.id);
        res.status(200).json(data);
    } catch(error){
        return next(error);
    }
}

// Update student
exports.updateStudent = async(req, res, next)=>{
    try{
        let data = await studentSchema.findByIdAndUpdate(req.params.id, {$set: req.body});
        res.status(200).json(data);
        console.log('student updated successfully');
    } catch(error){
        console.log(error);
        return next(error);
    }
}

// Delete student
exports.deleteStudent = async(req, res, next)=>{
    try{
        let data = await studentSchema.findByIdAndDelete(req.params.id);
        res.status(200).json({msg:data});
    } catch(error){
        return next(error);
    }
}