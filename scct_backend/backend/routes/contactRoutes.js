const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
router.post('/', contactController.submitContact);
router.get('/', contactController.getAllContacts);
router.put('/:id', contactController.updateContact);
router.delete('/:id', contactController.deleteContact);

module.exports = router;