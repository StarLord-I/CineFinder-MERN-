const express = require('express');
const router = express.Router();
const mc = require('../controllers/movieController');

router.get('/trending', mc.getTrending);
router.get('/popular', mc.getPopularMovies);
router.get('/search', mc.searchMovies);


router.get('/details/:id', mc.getMovieDetails);
router.get('/credits/:id', mc.getMovieCredits);

module.exports = router;