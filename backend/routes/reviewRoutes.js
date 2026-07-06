const express = require('express');
const router = express.Router();
const { addReview, getMovieReviews } = require('../controllers/reviewController');

router.post('/', addReview);
router.get('/:movieId', getMovieReviews);

module.exports = router;