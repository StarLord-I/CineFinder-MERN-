// backend/models/Movie.js
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
   
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    },
    id: { 
        type: String, 
        required: true 
    }, // The raw TMDB Movie ID
    title: { 
        type: String, 
        required: true,
        trim: true
    },
    rating: { 
        type: Number, 
        default: 0 
    },
    poster_path: { 
        type: String 
    },
    release_date: { 
        type: String 
    }
}, { 
    
    timestamps: true 
});

module.exports = mongoose.model('Movie', movieSchema);