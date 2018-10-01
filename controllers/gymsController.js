const gymService = require('../services/gymService');
const updateGymReviewValidation = require('../validation/updateGymReview');
const createGymValidation = require('../validation/createGym');

async function all (req, res) {
  try {
    if (req.query.search) {
      const result = await gymService.searchGyms(req);
      res.set('total-pages', result.pages);
      res.set('Access-Control-Expose-Headers', 'total-pages');
      res.status(200).json(result.gyms);
    } else if (req.query.page) {
      const result = await gymService.getGyms(req);
      res.set('total-pages', result.pages);
      res.set('Access-Control-Expose-Headers', 'total-pages');
      res.status(200).json(result.gyms);
    } else {
      const result = await gymService.getAllGyms(req);
      res.status(200).json(result);
    }
  } catch (err) {
    res.status(400).json('failed to get gyms');
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
    res.status(404).json({ errors: 'Gym does not exists' });
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

// delete gym
async function deleteGym (req, res) {
  try {
    const gym = await gymService.deleteGym(req);

    if (!gym) {
      res.status(404).json({
        errors: 'Gym not found'
      });
    } else {
      res.status(200).json({
        success: true
      });
    }
  } catch (e) {
    res.status(404).json({ errors: 'Gym does not exist' });
  }
}

async function GetOne (req, res) {
  try {
    const result = await gymService.findGym(req);
    res.status(200).json(result);
  } catch (e) {
    res.status(404).json({ errors: 'Gym does not exist' });
  }
}

//  reviews
async function addReview (req, res) {
  const { errors, isValid } = updateGymReviewValidation(req.body);

  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const result = await gymService.addReview(req);
    res.status(201).json(result);
  } catch (e) {
    res.status(501).json({ errors: 'Error when creating a new review' });
  }
}

// delete review
async function deleteReview (req, res) {
  try {
    const result = await gymService.deleteReview(req);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ errors: 'Comment does not exists' });
    }
  } catch (e) {
    res.status(404).json({ errors: 'Gym review does not exist' });
  }
}

// update gym review
async function updateReview (req, res) {
  const { errors, isValid } = updateGymReviewValidation(req.body);

  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const result = await gymService.updateReview(req);
    res.status(201).json(result);
  } catch (e) {
    res.status(404).json({ errors: 'Gym or review does not exist' });
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
