const express = require('express');
const router = express.Router();

const gymsController = require('../../controllers/gymsController');

// get all gyms
router.get('/', gymsController.all);
// create new gym
router.post('/', gymsController.create);

module.exports = router;