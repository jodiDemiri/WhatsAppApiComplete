const express = require('express');
const router = express.Router();
const {findAll, save} = require('../controllers/index');

// Homepage route
router.get('/', findAll);

// Create new student
router.post('/contacts', save);

// Update student
//router.put('/:id', ContactController.update);

// Delete student
//router.delete('/:id', ContactController.deleteById);

module.exports = router;