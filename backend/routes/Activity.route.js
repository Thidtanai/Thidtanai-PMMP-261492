let express = require('express'),
    router = express.Router();

// Activity controller
let activityController = require('../controllers/Activity.controller');

// Create activity
router.post('/create-activity', activityController.createActivity);

// Read activity
router.get('/', activityController.getAllActivity);

// Get single activity
router.get('/info-activity/:id', activityController.getActivity);

// Update activity
router.put('/update-activity/:id', activityController.updateActivity);

// Add member activity
router.post('/activities/:id/add-member', activityController.addMemberToActivity);

// Add user to recruit activity
router.post('/activities/:id/add-recruit', activityController.addRecruitMemberToActivity)

// Delete activity
router.delete('/delete-activity/:id', activityController.deleteActivity);

module.exports = router;