const gymService = require('../services/gymService');
const updateGymReviewValidation = require('../validation/updateGymReview');
const createGymValidation = require('../validation/createGym');

const { parser } = require('../helpers/gymUpload');

const Gym = require('../models/Gym');

async function all (req, res) {
  try {
    if (req.query.search) {
      const result = await gymService.searchGyms(req);
      exposeHeaders(res, result);
      res.status(200).json(result.gyms);
    } else if (req.query.page) {
      const result = await gymService.getGyms(req);
      exposeHeaders(res, result);
      res.status(200).json(result.gyms);
    } else {
      const result = await gymService.getAllGyms(req);
      res.status(200).json(result);
    }
  } catch (err) {
    res.status(400).json({ errors: 'failed to get gyms' });
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
    res.status(501).json({ errors: 'Error when creating a gym' });
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

// like gym
async function likeGym (req, res) {
  try {
    const gym = await Gym.findById(req.params.id);
    if (gym.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
      res.status(400).json({ errors: 'error liking' });
    } else {
      await gym.likes.unshift({ user: req.user.id });
      await gym.save();
      res.status(201).json(gym);
    }
  } catch (e) {
    res.status(404).json(e);
  }
}

// unlike gy
async function unlikeGym (req, res) {
  try {
    const gym = await Gym.findById(req.params.id);
    if (gym.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
      res.status(400).json({ errors: 'You have already liked' });
    } else {
      const removeIndex = gym.likes.map(item => item.user.toString()).indexOf(req.user.id);
      await gym.likes.splice(removeIndex, 1);
      await gym.save();
      res.status(201).json(gym);
    }
  } catch (e) {
    res.status(404).json(e);
  }
}

async function fileUploadMiddleware (req, res) {
  const errors = {};
  const upload = parser.single('image');
  upload(req, res, err => {
    if (err) {
      errors.image = 'Error when uploading file';
      res.status(501).json(errors);
    } else {
      res.status(200).json(req.file.secure_url);
    }
  });
}

const exposeHeaders = (res, result) => {
  res.set('total-pages', result.pages);
  res.set('Access-Control-Expose-Headers', 'total-pages');
};

module.exports = {
  all,
  create,
  GetOne,
  updateGym,
  deleteGym,
  addReview,
  deleteReview,
  updateReview,
  likeGym,
  unlikeGym,
  fileUploadMiddleware
};
