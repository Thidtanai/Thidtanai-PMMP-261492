let express = require('express'),
    router = express.Router();

// Middleware
const redirectIfAuth = require('../middleware/redirectIfAuth');

// User controller
let userController = require('../controllers/User.controller');

// Create user
router.post('/register', redirectIfAuth, userController.registerUser);

// Login user
router.post('/login', redirectIfAuth, userController.loginUser);

// Logout user
router.get('/logout', userController.logoutUser);

// Read user
router.get('/', userController.getAllUser);

// Update user
router.post('/update/:id', userController.updateUser);

// Post add activity to user
router.post('/users/:id/add-activity', userController.addActivityToUser);

// Post add recruit activity to user
router.post('/users/:id/add-recruit', userController.addRecruitToUserActivity);

// Post add tag to user
router.post('/users/:id/add-tag', userController.addUserTag);

router.get('/:id', userController.getUserById);

module.exports = router;