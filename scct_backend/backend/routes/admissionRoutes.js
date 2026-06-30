const express = require('express');
const router = express.Router();
const admissionController = require('../controllers/admissionController');
router.post('/', admissionController.submitAdmission);
router.get('/', admissionController.getAllAdmissions);
router.get('/:id', admissionController.getAdmissionById);
router.put('/:id', admissionController.updateAdmission);
router.delete('/:id', admissionController.deleteAdmission);

module.exports = router;