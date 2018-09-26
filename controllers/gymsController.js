const gymService = require('../services/gymService');
const createGymValidation = require('../validation/createGym');
const Gym = require('../models/Gym');

async function all (req, res) {
  try {
    if (req.query.search) {
      const result = await gymService.searchGyms(req);
      res.status(200).json(result);
    } else {
      const result = await gymService.getGyms(req);
      res.status(200).json(result);
    }
  } catch (err) {
    res.status(501).json('failed to get gyms');
  }
}

async function updateGym (req, res) {
  const { errors, isValid } = createGymValidation(req.body);

  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const result = await gymService.updateGym(req);
    res.status(201).json(result);
  } catch (e) {
    res.status(404).json({errors: 'Gym does not exists'});
  }
}

async function create (req, res) {
  const { errors, isValid } = createGymValidation(req.body);

  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const result = await gymService.createGym(req);
    res.status(201).json(result);
  } catch (e) {
    res.status(501).json('Error creating new gym');
  }
}

// fix deleting
async function deleteGym (req, res) {
  try {
    await gymService.deleteGym(req);
    res.status(200).json({
      success: true
    });
  } catch (e) {
    res.status(404).json({errors: 'Gym does not exist'});
  }
}

async function GetOne (req, res) {
  try {
    const result = await gymService.findGym(req);
    res.status(200).json(result);
  } catch (e) {
    res.status(501).json('Error getting gym');
  }
}

//  reviews
async function addReview (req, res) {
  try {
    const result = await gymService.addReview(req);
    res.status(201).json(result);
  } catch (e) {
    res.status(404).json({errors: 'Gym does not exist'});
  }
}

// delete review
async function deleteReview (req, res) {
  try {
    // const result = await gymService.deleteReview(req);
    const gym = await Gym.findById(req.params.id);

    if (gym.reviews.filter(
      review => review._id.toString() === req.params.reviewId).length === 0
    ) {
      return res.status(405)
        .json({ commentNotExists: 'Comment does not exist' });
    }
    // ret review index
    const removeIndex = gym.reviews
      .map(item => item._id.toString())
      .indexOf(req.params.reviewId);

    gym.reviews.splice(removeIndex, 1);

    gym.save();
    res.status(200).json(gym);
  } catch (e) {
    res.status(404).json({errors: 'Gym review does not exist'});
  }
}

async function updateReview (req, res) {
  // TODO: add text validation
  // const { errors, isValid } = createGymValidation(req.body);

  // check validation
  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }

  try {
    const result = await gymService.updateReview(req);
    res.status(201).json(result);
  } catch (e) {
    res.status(404).json({errors: 'Gym or review does not exist'});
  }
}

module.exports = {
  all,
  create,
  GetOne,
  updateGym,
  deleteGym,
  addReview,
  deleteReview,
  updateReview
};
