const User = require('../models/User');
const bcrypt = require('bcryptjs');

// register user
async function register (req) {
  const findUser = await User.findOne({ email: req.body.email });

  let errors = {};

  if (findUser !== null) {
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
    throw e;
  }
}

module.exports = {
  register
};
