const mongoose = require('mongoose');
const Gym = require('../models/Gym');

async function all(req, res) {
    try {
        const gyms = await Gym.find();
        res.status(200).json(gyms);
    }
    catch (err) {
        res.status(400).json('failed to get gyms');
    }
}

module.exports = {
    all
};