const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// register user
async function register (req) {
  const user = await findUser(req.body.email);

  let errors = {};

  if (user) {
    errors.email = 'Email already exits.';
    return { errors };
  }

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newUser.password, salt);
    newUser.password = hash;
    const createUser = await newUser.save();
    return {
      user: createUser
    };
  } catch (e) {
    return { errors: e };
  }
}

// login user
async function login (req) {
  const email = req.body.email;
  const password = req.body.password;
  let errors = {};

  const user = await findUser(email);
  if (!user) {
    errors.email = 'User not found';
    return { errors };
  }

  try {
    const checkPassword = await bcrypt.compare(password, user.password);
    if (checkPassword) {
      const payload = {
        id: user.id,
        username: user.username
      };

      const token = await jwt.sign(
        payload,
        config.PASS_SECRET,
        { expiresIn: 3600 }
      );

      return {
        success: true,
        token: 'Bearer ' + token
      };
    }
  } catch (e) {
    return { errors: e };
  }
}

async function findUser (email) {
  return User.findOne({ email });
}

module.exports = {
  register,
  login
};
