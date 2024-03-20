let imageSchema = require('../models/TestImage');

exports.uploadImage = async(req, res)=>{
    const body = req.body;
    try {
        let newImage = await imageSchema.create(body)
        console.log(newImage)
        res.status(201).json(newImage)
    } catch(error){
        res.status(409).json({ message: error.message });
    }
}

exports.getImage = async(req, res)=>{
    try {
        let getImage = await imageSchema.find();
        res.status(200).json(getImage[0]);
    }catch(error){
        return next(error);
    }
}