const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../../controllers/usersController');

// register new user
router.post('/register', usersController.register);
// login
router.post('/login', usersController.login);

router.post('/oauth/google', passport.authenticate('googleToken', { session: false }), usersController.googleOAuth);

module.exports = router;
