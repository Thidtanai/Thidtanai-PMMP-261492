let express = require('express'),
    router = express.Router();

// Notification controller
let notificationController = require('../controllers/Notification.controller');

// Create Notification
router.post('/create-noti', notificationController.createNotification);

// Get user notification
router.get('/user-noti/:noti_receiver', notificationController.getUserNotification);

// Update notification
router.put('/update-noti/:id', notificationController.updateNotification);

// Route for fetching notifications by noti_receiver
router.get('/notifications/:noti_receiver', notificationController.getNotificationsByReceiver);


module.exports = router;