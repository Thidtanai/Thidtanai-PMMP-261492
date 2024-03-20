// User model
let userSchema = require('../models/User');
let bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register user
exports.registerUser = async(req, res, next)=>{
    try {
        let data = await userSchema.create(req.body);
        console.log(data);
        return res.status(200).json(data);
    } catch(error){
        if (error.code === 11000 && error.keyPattern && error.keyPattern.user_email) {
            // Email is already in use
            return res.status(400).json({ message: "Email is already in use" });
        } else {
            return next(error);
        }
    }
}

// Login user
exports.loginUser = async (req, res, next) => {
    try {
        const { user_email, user_password } = req.body;

        let foundedUser = await userSchema.findOne({ user_email: user_email });
        console.log(foundedUser);

        if (foundedUser) {
            let match = await bcrypt.compare(user_password, foundedUser.user_password);
            if (match) {
                req.session.userId = foundedUser._id;
                console.log("Login completed");
                const token = jwt.sign({
                    id: foundedUser._id,
                    name: foundedUser.user_description.first_name,
                    group: foundedUser.user_recommendation_group
                }, 'secret123');
                return res.status(200).json({ userTk: token });
            } else {
                // Password was wrong
                return res.status(401).json({ message: "Password was wrong", userTk: false });
            }
        } else {
            // User not found
            return res.status(404).json({ message: "User not found", userTk: false });
        }
    } catch (error) {
        return next(error);
    }
}
// Logout user
exports.logoutUser = (req, res)=>{
    req.session.destroy(()=>{
        res.redirect('/');
        console.log("Logout completed");
        res.status(200).json({ message: "Logout completed" });
    })
}

// Get user data
exports.getUserData = async(req, res)=>{
    try{
        let userData = await userSchema.findById(req.session.userId);
        res.render(userData);
    } catch(error){
        return next(error);
    }
}

// Get all user
exports.getAllUser = async(req, res)=>{
    try {
        let data = await userSchema.find();
        res.status(200).json(data);
    } catch(error){
        return next(error);
    }
}

// Add activity to user
exports.addActivityToUser = async (req, res, next) => {
    try {
        const userId = req.params.id; // Assuming the user ID is provided in the URL params
        const activityData = req.body; // Assuming activity data is provided in the request body

        // Find the user by ID and update the membered_activity array by pushing the new activity data
        const updatedUser = await userSchema.findByIdAndUpdate(
            userId,
            { $push: { membered_activity: activityData } },
            { new: true } // To return the updated document
        );

        res.status(200).json(updatedUser);
    } catch (error) {
        return next(error);
    }
};

// Add data to recruit_registered
exports.addRecruitToUserActivity = async (req, res, next) => {
    try {
        const userId = req.params.id; // Assuming the user ID is provided in the URL params
        const activityId = req.body.activity_id; // Assuming the recruit ID (activity ID) is provided in the request body
        const roleName = req.body.recruit_registered;

        // Find the user by ID
        let user = await userSchema.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update the membered_activity.recruit_registered array by pushing the new recruit ID
        user.membered_activity.forEach((activity) => {
            if (activity.activity_id === activityId) {
                activity.recruit_registered.push(roleName);
            }
        });

        // Save the updated user
        await user.save();

        res.status(200).json(user);
    } catch (error) {
        return next(error);
    }
};


// Update user data
exports.updateUser = async(req, res)=>{
    try {
        let data = await userSchema.findByIdAndUpdate(req.params.id, {$set: req.body});
        res.status(200).json(data);
        console.log('user updated successfully');
    } catch(error){
        console.log(error);
        return next(error);
    }
}

// Add user tag
exports.addUserTag = async (req, res, next) => {
    try {
        const userId = req.params.id; // Assuming the user ID is provided in the URL params
        const { user_tag } = req.body; // Assuming user tags are provided in the request body

        // Find the user by ID and update the user_tag array by pushing the new tag(s)
        const updatedUser = await userSchema.findByIdAndUpdate(
            userId,
            { $addToSet: { user_tag: { $each: user_tag } } }, // Using $addToSet to add unique tags
            { new: true } // To return the updated document
        );

        res.status(200).json(updatedUser);
    } catch (error) {
        return next(error);
    }
};

// Get user by ID
exports.getUserById = async (req, res, next) => {
    try {
        const userId = req.params.id; // Assuming the user ID is provided in the URL params

        // Find the user by ID
        const user = await userSchema.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        return next(error);
    }
};
