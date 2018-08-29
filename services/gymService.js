const Gym = require('../models/Gym');
const regexHelper = require('../helpers/regexHelper');

// get all gyms
async function getGyms () {
  return Gym.find();
};

// create new gym
async function createGym (req) {
  const name = req.body.name;
  const city = req.body.city;

  const gym = new Gym({
    name,
    city
  });

  return gym.save();
}

// find gyms by city
async function searchGyms (req) {
  const regex = new RegExp(regexHelper.escapeRegex(req.query.search), 'gi');
  return Gym.find({
    city: regex
  });
}

// find gym by id
async function findGym (req) {
  return Gym.findById({
    _id: req.params.id
  });
}

module.exports = {
  getGyms,
  createGym,
  findGym,
  searchGyms
};
