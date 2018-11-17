const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userRoles = require('../helpers/userRoles');

// create User schema
const UserSchema = new Schema({
  username: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  role: {
    type: String,
    default: userRoles.USER,
    required: true
  },
  google: {
    id: {
      type: String
    },
    email: {
      type: String,
      lowercase: true
    }
  }
});

module.exports = mongoose.model('users', UserSchema, 'users');
