const express = require('express');
const router = express.Router();
const uuid = require('uuid');
//const contacts = require('../../contacts');
const ContactController = require('../../controllers/contact');

// Get all contacts
router.get('/', ContactController.findAll);

// Get single contact
// router.get('/:id', ContactController.findById);
router.get('/:phone', ContactController.findByPhone);

// Create new contact
router.post('/', ContactController.save);

// Update contact
router.put('/:id', ContactController.update);

// Delete contact
// router.delete('/:id', ContactController.deleteById);
router.delete('/:phone', ContactController.deleteByPhone);

module.exports = router;