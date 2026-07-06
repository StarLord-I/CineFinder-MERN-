const express = require('express');
const router = express.Router();
const mc = require('../controllers/movieController'); // Shared controller file

router.get('/popular', mc.getPopularTV);
router.get('/credits/:id', mc.getTVCredits);
router.get('/details/:id', mc.getTVDetails);

module.exports = router;