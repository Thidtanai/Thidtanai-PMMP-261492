let express = require('express'),
    router = express.Router();

let imageController = require('../controllers/TestImage.controller');

router.post('/uploads', imageController.uploadImage);
router.get('/', imageController.getImage);

module.exports = router;