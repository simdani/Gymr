const express = require('express');
const router = express.Router();
const passport = require('passport');

const gymsController = require('../../controllers/gymsController');

// get all gyms
router.get('/', gymsController.all);
// create new gym
router.post('/', passport.authenticate('jwt', { session: false }), gymsController.create);
// get one gym by if
router.get('/:id', gymsController.GetOne);

router.put('/:id', passport.authenticate('jwt', { session: false }), gymsController.updateGym);

router.delete('/:id', passport.authenticate('jwt', { session: false }), gymsController.deleteGym);

module.exports = router;
