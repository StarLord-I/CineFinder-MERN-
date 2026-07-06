const express = require('express');
const router = express.Router();
const mc = require('../controllers/movieController');

router.get('/', mc.getWatchlist);
router.post('/', mc.addToWatchlist);
router.get('/trending', mc.getTrending);
router.get('/search', mc.searchMovies);
router.get('/details/:id', mc.getMovieDetails);
router.get('/credits/:id', mc.getMovieCredits);
router.get('/popular', mc.getPopularMovies);

module.exports = router;