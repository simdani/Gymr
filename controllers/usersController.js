const userService = require('../services/userService');

const jwt = require('jsonwebtoken');
const config = require('config');

// load register validation
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

const signToken = payload => {
  return jwt.sign(
    payload,
    config.PASS_SECRET,
    { expiresIn: 3600 }
  );
};

async function googleOAuth (req, res) {
  const payload = {
    id: req.user.id,
    username: req.user.username,
    email: req.user.email
  };

  const token = signToken(payload);
  const success = {
    success: true,
    token: 'Bearer ' + token
  };
  res.status(200).json(success);
}

async function register (req, res) {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const result = await userService.register(req);
    if (result.errors) {
      res.status(400).json(result.errors);
    } else {
      res.status(201).json(result);
    }
  } catch (e) {
    res.status(501).json('Error when registering.');
  }
}

async function login (req, res) {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(40).json(errors);
  }

  try {
    const result = await userService.login(req);
    if (result.errors) {
      res.status(400).json(result.errors);
    } else {
      res.status(201).json(result);
    }
  } catch (e) {
    res.status(501).json({errors: 'Error when loggin in'});
  }
}

module.exports = {
  register,
  login,
  googleOAuth
};
