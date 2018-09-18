const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
