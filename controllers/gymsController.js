const gymService = require('../services/gymService');
const createGymValidation = require('../validation/createGym');

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
    res.status(501).json('Error deleting gym');
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

module.exports = {
  all,
  create,
  GetOne,
  deleteGym
};
