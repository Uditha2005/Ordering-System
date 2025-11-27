const express = require('express');
const router = express.Router();
const preorderController = require('../controllers/preorderController');

// Create a new preorder
router.post('/', preorderController.createPreorder);

// Get all preorders
router.get('/', preorderController.getAllPreorders);

// Get preorders by username
router.get('/user/:username', preorderController.getPreordersByUsername);

// Get preorder by ID
router.get('/:id', preorderController.getPreorderById);

// Update preorder
router.put('/:id', preorderController.updatePreorder);

// Delete preorder
router.delete('/:id', preorderController.deletePreorder);

module.exports = router; 