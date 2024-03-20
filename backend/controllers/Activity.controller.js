// Ativity model
let activitySchema = require('../models/Activity');

// Create student
exports.createActivity = async(req, res, next)=>{
    try {
        let data = await activitySchema.create(req.body);
        console.log(data);
        res.status(200).json(data);
    } catch(error){
        return next(error);
    }
}

// Get all activity
exports.getAllActivity = async(req, res)=>{
    try {
        let data = await activitySchema.find();
        res.status(200).json(data);
    } catch(error){
        return next(error);
    }
}

// Get single activity
exports.getActivity = async(req, res)=>{
    try {
        let data = await activitySchema.findById(req.params.id);
        res.status(200).json(data);
    } catch(error){
        return next(error);
    }
}

// Update activity
exports.updateActivity = async(req, res)=>{
    try {
        let data = await activitySchema.findByIdAndUpdate(req.params.id, {$set: req.body});
        res.status(200).json(data);
        console.log('activity updated successfully');
    } catch(error){
        console.log(error);
        return next(error);
    }
}

// Add member to activity
exports.addMemberToActivity = async (req, res, next) => {
    try {
        const activityId = req.params.id; // Assuming the activity ID is provided in the URL params
        const memberId = req.body.membered_user; // Assuming the member ID is provided in the request body

        // Find the activity by ID
        const activity = await activitySchema.findById(activityId);
        if (!activity) {
            return res.status(404).json({ message: "Activity not found" });
        }

        // Check if the member ID already exists in the membered_user array
        if (activity.membered_user.includes(memberId)) {
            return res.status(400).json({ message: "Member already added to the activity" });
        }

        // Update the membered_user array by pushing the new member ID
        const updatedActivity = await activitySchema.findByIdAndUpdate(
            activityId,
            { $push: { membered_user: memberId } },
            { new: true } // To return the updated document
        );

        res.status(200).json(updatedActivity);
    } catch (error) {
        return next(error);
    }
};


// Add data to recruit_member
exports.addRecruitMemberToActivity = async (req, res, next) => {
    try {
        const activityId = req.params.id; // Assuming the activity ID is provided in the URL params
        const { member_id, member_status, recruit_role } = req.body; // Assuming member ID, status, and role are provided in the request body

        // Find the activity by ID
        let activity = await activitySchema.findById(activityId);
        if (!activity) {
            return res.status(404).json({ message: "Activity not found" });
        }
        
        // Find the activity recruit by recruit_role
        let activityRecruit = activity.activity_recruit.find(recruit => recruit.recruit_role === recruit_role);
        if (!activityRecruit) {
            return res.status(404).json({ message: "Recruit not found for this activity" });
        }

        // Push new recruit member to recruit_member array
        activityRecruit.recruit_member.push({ member_id, member_status });

        // Save the updated activity
        await activity.save();
        
        res.status(200).json(activity);
    } catch (error) {
        return next(error);
    }
};



// Delete activity
exports.deleteActivity = async(req, res, next)=>{
    try {
        let data = await activitySchema.findByIdAndDelete(req.params.id)
        res.status(200).json({msg: data});
    } catch(error){
        return next(error);
    }
}