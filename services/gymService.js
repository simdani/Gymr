const Gym = require('../models/Gym');

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

module.exports = {
  getGyms,
  createGym
};
