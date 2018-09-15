const express = require('express');
const router = express.Router();

const usersController = require('../../controllers/usersController');

// register new user
router.post('/register', usersController.register);
// login
// router.post('/login', usersController.login);

module.exports = router;
