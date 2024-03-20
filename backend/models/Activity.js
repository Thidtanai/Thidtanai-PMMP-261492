const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = new Schema({
    activity_owner: String,
    activity_name: {
        type: String,
        required: true
    },
    activity_description: {
        description: String,
        tag: [String],
        start_date: {
            type: Date,
            required: true
        },
        end_date: {
            type: Date,
            required: true
        },
        location: String,
        department: [String]
    },
    activity_image: [String],
    activity_contact: {
        email: String,
        other: String
    },
    membered_user: [String],
    activity_recruit: [{
        recruit_role: {
            type: String,
            required: true
        },
        recruit_count: {
            type: Number,
            required: true
        },
        recruit_description: String,
        recruit_member: [{
            member_id: String,
            member_status: String
        }]
    }],
    created_at: {
        type: Date,
        default: Date.now
    }
}, {
    collection: "activities"
});

module.exports = mongoose.model('Activity', activitySchema);
