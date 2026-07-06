const Review = require('../models/Review');

const addReview = async (req, res) => {
    try {
        const { movieId, username, reviewText, rating } = req.body;
        const newReview = new Review({ movieId, username, reviewText, rating });
        const savedReview = await newReview.save();
        res.status(201).json(savedReview);
    } catch (err) {
        res.status(400).json({ message: "Failed to post review data", error: err.message });
    }
};

const getMovieReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ movieId: req.params.movieId }).sort({ createdAt: -1 });
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: "Failed to load review feeds", error: err.message });
    }
};

module.exports = { addReview, getMovieReviews };