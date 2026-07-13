const express = require('express');
const router = express.Router();
const mc = require('../controllers/movieController');

const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.route('/')
    .get(mc.getWatchlist)    // Private CRUD: Read authenticated user records
    .post(mc.addToWatchlist); // Private CRUD: Create new user movie row

module.exports = router;