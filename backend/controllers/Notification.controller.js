// Notification model
let notificationSchema = require("../models/Notification");

// Create notification
exports.createNotification = async (req, res, next) => {
  try {
    let data = await notificationSchema.create(req.body);
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
};

// Get notification for user
exports.getUserNotification = async (req, res) => {
  try {
    // req.params -> noti_receiver: 'user_id'
    let data = await notificationSchema.find(req.params);

    if (data.length === 0) {
      return res
        .status(404)
        .json({ message: "No notifications found for the provided receiver." });
    }
    res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
};

// Update notification
exports.updateNotification = async(req, res, next)=>{
    try {
        const { id } = req.params;
        const updateData = req.body;

        const existingNotification = await notificationSchema.findById(id);
        if (!existingNotification){
            return res.status(404).json({msg: "Notification not found."})
        }
        const updatedNotification = await notificationSchema.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedNotification){
            return res.status(500).json({msg: "Failed to update notification."})
        }
        res.status(200).json(updatedNotification);

    } catch(error){
        return next(error);
    }
}

// Function to get notifications by noti_receiver and noti_status = 'notShown'
exports.getNotificationsByReceiver = async (req, res, next) => {
  try {
      const { noti_receiver } = req.params;

      // Find notifications where noti_receiver matches and noti_status is 'notShown'
      const notifications = await notificationSchema.find({ noti_receiver, noti_status: 'notShown' });

      res.status(200).json(notifications);
  } catch (error) {
      return next(error);
  }
};