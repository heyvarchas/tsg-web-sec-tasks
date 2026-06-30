// This is like a routing layer for authentication
// Importing express and creating a router instance
const express = require('express');
const router = express.Router();
// Importing everything from auth.controller into this
const authController = require('./auth.controller');

// Creating two POST endpoints
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;