// This is to create something like a traffic controller for the backend
// Importing express library
const express = require('express');
// Create an express router
const router = express.Router();
// Some other important modules to be imported
const userController = require('./user.controller');
const { protect } = require('../../middleware/auth');
const { adminOnly } = require('../../middleware/rbac');

// Need to apply middleware to every route below
// If protect rejects it, doesn't get processed at all
router.use(protect);
// Same idea with a second middleware
router.use(adminOnly);

// Defining GET endpoints
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
// This is a PUT endpoint (updating)
router.put('/:id', userController.updateUser);
// DELETE endpoint (user deleting)
router.delete('/:id', userController.deleteUser);

module.exports = router;