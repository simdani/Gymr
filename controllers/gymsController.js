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

async function create(req, res) {
    const name = req.body.name;

    const gym = new Gym({
        name
    });

    try {
        const result = await gym.save();
        res.status(200).json(result);
    } catch (e) {
        res.status(400).json('Error create new gym');
    }
}

module.exports = {
    all,
    create
};