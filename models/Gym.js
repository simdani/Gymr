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
    }
});

module.exports = mongoose.model('gyms', GymSchema, 'gyms');