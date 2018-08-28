const express = require('express');
const router = express.Router();

const gymsController = require('../controllers/gymsController');

// get all gyms
router.get('/', gymsController.all);

module.exports = router;