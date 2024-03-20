const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    noti_type: {
        type: String,
        enum: ['join_req', 'denied_req', 'accept_req', 'system'],
        required: true
    },
    noti_receiver: {
        type: String,
        required: true,
    },
    noti_status: {
        type: String,
        enum: ['shown', 'notShown'],
        default: 'notShown'
    },
    join_req_type: {
        req_user: {
            type: String,
            required: true
        },
        activity_id: String,
        role: String,
        description: String,
        contact: String
    },
    create_at: {
        type: Date,
        default: Date.now
    }
}, {
    collection: "notification"
});

module.exports = mongoose.model('Notification', notificationSchema);