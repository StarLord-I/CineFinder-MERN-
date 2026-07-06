const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    rating: { type: Number, required: true }
});

// This will look for a collection named "movies" in your database
module.exports = mongoose.model('Movie', movieSchema);