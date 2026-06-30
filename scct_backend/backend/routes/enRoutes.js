const express = require('express');
const router = express.Router();
const enrollController = require('../controllers/enrollController');

router.get('/', enrollController.getallenroll);
router.get('/:id', enrollController.getenrollById);
router.post('/', enrollController.createEnroll);
router.delete('/:id', enrollController.deleteEnroll);

module.exports = router;