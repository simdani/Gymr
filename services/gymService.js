const Gym = require('../models/Gym');
const regexHelper = require('../helpers/regexHelper');

// get all gyms
async function getGyms (req) {
  let perPage = 10; // gyms per page
  let page = (parseInt(req.query.page) || 1); // curent page

  const gyms = await Gym.find().skip((perPage * page) - perPage).limit(perPage);
  const count = await Gym.countDocuments();

  return {
    gyms,
    current: page,
    pages: Math.ceil(count / perPage)
  };
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
  let perPage = 10; // gyms per page
  let page = (parseInt(req.query.page) || 1); // curent page

  const regex = new RegExp(regexHelper.escapeRegex(req.query.search), 'gi');

  const gyms = await Gym.find({ city: regex }).skip((perPage * page) - perPage).limit(perPage);
  const count = await Gym.countDocuments({city: regex});

  return {
    gyms,
    current: page,
    pages: Math.ceil(count / perPage)
  };
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
