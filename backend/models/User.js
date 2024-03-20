const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    user_email: {
        type: String,
        required: true,
        unique: true
    },
    user_password: {
        type: String,
        required: true
    },
    user_description: {
        first_name: String,
        last_name: String,
        department: String,
        gender: String
    },
    user_image: String,
    user_tag: [String],
    user_type: {
        type: String,
        enum: ['student', 'teacher', 'staff'],
        required: true
    },
    user_type_student: {
        student_id: String,
        education_level: String,
        study_plan: String,
        year: Number
    },
    user_recommendation_group: String,
    membered_activity: [{
        activity_id: {
            type: String,
            required: true
        },
        recruit_registered: [String]
    }],
    created_at: {
        type: Date,
        default: Date.now
    }
}, {
    collection: "users"
});

// Hash password function
userSchema.pre('save', async function(next){
    try{
        const user = this;
        const hashed = await bcrypt.hash(user.user_password, 10);
        user.user_password = hashed;
        next();
    } catch(error){
        console.error(error);
    }
})

module.exports = mongoose.model('User', userSchema);
