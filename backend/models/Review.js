const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    movieId: { 
        type: String, 
        required: true // Links directly to the unique movie string identifier from TMDB API [cite: 31]
    }, 
    username: { 
        type: String, 
        required: true 
    },
    reviewText: { 
        type: String, 
        required: true 
    },
    rating: { 
        type: Number, 
        required: true, 
        min: 1, 
        max: 10 
    }
}, { 
    timestamps: true // Automatically stamps exactly when a community user leaves a review [cite: 31]
});

module.exports = mongoose.model('Review', reviewSchema);