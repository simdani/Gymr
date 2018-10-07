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

// post gym review
router.post('/:id/reviews', passport.authenticate('jwt', { session: false }), gymsController.addReview);

// delete gym review
router.delete('/:id/reviews/:reviewId', passport.authenticate('jwt', { session: false }), gymsController.deleteReview);

// update gym review
router.put('/:id/reviews/:reviewId', passport.authenticate('jwt', { session: false }), gymsController.updateReview);

// gym like
router.post('/:id/like', passport.authenticate('jwt', { session: false }), gymsController.likeGym);
router.post('/:id/unlike', passport.authenticate('jwt', { session: false }), gymsController.unlikeGym);

module.exports = router;
