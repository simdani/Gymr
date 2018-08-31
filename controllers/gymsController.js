const gymService = require('../services/gymService');
const createGymValidation = require('../validation/createGym');

const Gym = require('../models/Gym');
const regexHelper = require('../helpers/regexHelper');

async function all (req, res) {
  try {
    if (req.query.search) {
      // const result = await gymService.searchGyms(req);
      // res.status(200).json(result);
      let perPage = 10; // gyms per page
      let page = (parseInt(req.query.page) || 1); // curent page

      const regex = new RegExp(regexHelper.escapeRegex(req.query.search), 'gi');

      Gym.find({
        city: regex
      })
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .then(gyms => {
          Gym.countDocuments({city: regex})
            .then(count => {
              res.status(200).json({
                gyms: gyms,
                current: page,
                pages: Math.ceil(count / perPage)
              });
            });
        }
        );
    } else {
      // temporally
      let perPage = 10; // gyms per page
      let page = (parseInt(req.query.page) || 1); // curent page

      Gym.find()
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .then(gyms => {
          Gym.countDocuments()
            .then(count => {
              res.status(200).json({
                gyms: gyms,
                current: page,
                pages: Math.ceil(count / perPage)
              });
            });
        }
        );
    }
  } catch (err) {
    res.status(500).json('failed to get gyms');
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
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json('Error creating new gym');
  }
}

async function GetOne (req, res) {
  try {
    const result = await gymService.findGym(req);
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json('Error getting gym');
  }
}

module.exports = {
  all,
  create,
  GetOne
};
