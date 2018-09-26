const Gym = require('../models/Gym');
const regexHelper = require('../helpers/regexHelper');

// get all gyms
async function getGyms (req) {
  let perPage = 12; // gyms per page
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

// update gym
async function updateGym (req) {
  const gym = await Gym.findById(req.params.id);

  const name = req.body.name;
  const city = req.body.city;

  gym.name = name;
  gym.city = city;

  return gym.save();
}

// delete gym
async function deleteGym (req) {
  const gym = await Gym.findById(req.params.id);

  if (gym.reviews.filter(
    review => review._id.toString() === req.params.reviewId).length !== 0
  ) {
    // ret review index
    const removeIndex = gym.reviews
      .map(item => item._id.toString())
      .indexOf(req.params.reviewId);

    gym.reviews.splice(removeIndex, 1);

    gym.save();
    return gym;
  }
};

// find gyms by city
async function searchGyms (req) {
  let perPage = 12; // gyms per page
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

async function addReview (req) {
  const gym = await Gym.findById(req.params.id);

  const newReview = {
    username: req.body.username,
    text: req.body.text,
    user: req.user.id
  };

  await gym.reviews.unshift(newReview);
  await gym.save();

  return gym;
}

// update gym review
async function updateReview (req) {
  const gym = await Gym.findById(req.params.id);

  const reviewIndex = gym.reviews
    .map(item => item._id.toString())
    .indexOf(req.params.reviewId);

  const text = req.body.text;

  gym.reviews[reviewIndex].text = text;

  gym.save();

  return gym;
}

module.exports = {
  getGyms,
  createGym,
  updateGym,
  findGym,
  searchGyms,
  deleteGym,
  addReview,
  updateReview
};
