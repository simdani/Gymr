const userService = require('../services/userService');

// load register validation
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

async function googleOAuth (req, res) {
  try {
    const result = await userService.loginGoogle(req);
    res.status(200).json(result);
  } catch (e) {
    res.status(501).json('Error when loggin in with google');
  }
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
    res.status(501).json({errors: 'Error when registering...'});
  }
}

async function login (req, res) {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const result = await userService.login(req);
    if (result.errors) {
      res.status(400).json(result.errors);
    } else {
      res.status(200).json(result);
    }
  } catch (e) {
    res.status(501).json({errors: 'Error when logging in'});
  }
}

module.exports = {
  register,
  login,
  googleOAuth
};
