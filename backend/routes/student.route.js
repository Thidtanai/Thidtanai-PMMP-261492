let express = require('express'),
    router = express.Router();

// Student controller
let studentController = require('../controllers/Student.controller')

// Create Student
router.post('/create-student',studentController.createStudent);

// Read students
router.get('/', studentController.getAllStudent);

// Get single student
router.get('/edit-student/:id', studentController.getStudent);

// Update student
router.put('/update-student/:id', studentController.updateStudent);

// Delete student
router.delete('/delete-student/:id', studentController.deleteStudent);


module.exports = router;