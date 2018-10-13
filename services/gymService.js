const Gym = require('../models/Gym');
const User = require('../models/User');
const regexHelper = require('../helpers/regexHelper');

// get gyms by page
async function getGyms (req) {
  let perPage = 12; // gyms per page
  let page = (parseInt(req.query.page) || 1); // curent page

  let gyms;
  let count;

  if (req.query.sort) {
    if (req.query.sort === 'newest') {
      gyms = await Gym.find().sort({ date: 'descending' }).skip((perPage * page) - perPage).limit(perPage);
    } else if (req.query.sort === 'oldest') {
      gyms = await Gym.find().sort({ date: 'ascending' }).skip((perPage * page) - perPage).limit(perPage);
    } else if (req.query.sort === 'likes') {
      gyms = await Gym.find().sort({ likes: 'descending' }).skip((perPage * page) - perPage).limit(perPage);
    }
  } else {
    gyms = await Gym.find().skip((perPage * page) - perPage).limit(perPage);
  }
  count = await Gym.countDocuments();

  return {
    gyms,
    current: page,
    pages: Math.ceil(count / perPage)
  };
};

// get all gyms
async function getAllGyms (req) {
  const gyms = await Gym.find();

  return gyms;
};

// create new gym
async function createGym (req) {
  const name = req.body.name;
  const city = req.body.city;
  const description = req.body.description;
  const website = req.body.website;

  const gym = new Gym({
    name,
    city,
    description,
    website
  });

  return gym.save();
}

// update gym
async function updateGym (req) {
  const gym = await Gym.findById(req.params.id);

  const name = req.body.name;
  const city = req.body.city;
  const description = req.body.description;
  const website = req.body.website;

  gym.name = name;
  gym.city = city;
  gym.description = description;
  gym.website = website;

  return gym.save();
}

// delete gym
async function deleteGym (req) {
  const gym = await Gym.findOneAndDelete({
    _id: req.params.id
  });
  return gym;
};

// find gyms by city
async function searchGyms (req) {
  let perPage = 12; // gyms per page
  let page = (parseInt(req.query.page) || 1); // curent page

  let gyms;
  let count;
  const regex = new RegExp(regexHelper.escapeRegex(req.query.search), 'gi');

  if (req.query.sort) {
    if (req.query.sort === 'newest') {
      gyms = await Gym.find({ city: regex }).sort({ date: 'descending' }).skip((perPage * page) - perPage).limit(perPage);
    } else if (req.query.sort === 'oldest') {
      gyms = await Gym.find({ city: regex }).sort({ date: 'ascending' }).skip((perPage * page) - perPage).limit(perPage);
    } else if (req.query.sort === 'likes') {
      gyms = await Gym.find({ city: regex }).sort({ likes: 'descending' }).skip((perPage * page) - perPage).limit(perPage);
    }
  } else {
    gyms = await Gym.find({ city: regex }).skip((perPage * page) - perPage).limit(perPage);
  }

  count = await Gym.countDocuments({ city: regex });

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

async function deleteReview (req) {
  const gym = await Gym.findById(req.params.id);

  if (gym.reviews.filter(
    review => review._id.toString() === req.params.reviewId).length === 0
  ) {
    return null;
  }
  // ret review index
  const removeIndex = gym.reviews
    .map(item => item._id.toString())
    .indexOf(req.params.reviewId);

  gym.reviews.splice(removeIndex, 1);

  gym.save();

  return gym;
}

// function likeGym (req) {
//   User.findOne({ _id: req.uesr.id })
//     .then(profile => {
//       Gym.findById(req.params.id)
//         .then(gym => {
//           if (gym.likes.filter(
//             like => like.user.toString() === req.user.id
//           ).length > 0) {
//           }
//         })
//     })

//   const findUser = await User.findOne({ _id: req.user.id });
//   const gym = await Gym.findById(req.params.id);
//   console.log(gym);

//   // if (gym.likes.filter(like => like.user === req.user.id).length > 0) {
//   //   console.log('rip');
//   // }

//   const user = {
//     user: req.user.id
//   };

//   await gym.likes.unshift(findUser);
//   await gym.save();
//   return gym;
// }

async function likeGym (req) {
  const findUser = await User.findOne({ _id: req.user.id });
  const gym = await Gym.findById(req.params.id);
  console.log(gym);

  // if (gym.likes.filter(like => like.user === req.user.id).length > 0) {
  //   console.log('rip');
  // }

  await gym.likes.unshift(findUser);
  await gym.save();
  return gym;
}

module.exports = {
  getGyms,
  getAllGyms,
  createGym,
  updateGym,
  findGym,
  searchGyms,
  deleteGym,
  addReview,
  updateReview,
  deleteReview,
  likeGym
};
