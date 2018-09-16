const userService = require('../services/userService');

// load register validation
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

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
      res.status(200).json(result);
    }
  } catch (e) {
    res.status(500).json('Error when registering.');
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
    res.status(500).json({errors: 'Error when loggin in'});
  }
}

module.exports = {
  register,
  login
};
