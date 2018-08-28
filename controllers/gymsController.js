const gymService = require('../services/gymService');
const createGymValidation = require('../validation/createGym');

async function all(req, res) {
    try {
        const gyms = await gymService.getGyms();
        res.status(200).json(gyms);
    }
    catch (err) {
        res.status(500).json('failed to get gyms');
    }
}

async function create(req, res) {
    const { errors, isValid } = createGymValidation(req.body);

    // check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    try {
        const result = await gymService.createGym(req);
        res.status(200).json(result);
    } catch (e) {
        res.status(500).json('Error creating new gym');
    }
}

module.exports = {
    all,
    create
};