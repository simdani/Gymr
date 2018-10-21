const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GymSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxLength: 50
  },
  city: {
    type: String,
    required: true,
    minlength: 1,
    maxLength: 60
  },
  description: {
    type: String,
    required: true,
    minlength: 1
  },
  website: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  reviews: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      username: {
        type: String
      },
      text: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('gyms', GymSchema, 'gyms');
