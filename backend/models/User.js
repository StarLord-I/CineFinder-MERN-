const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true, 
        trim: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        lowercase: true, 
        trim: true 
    },
    password: { 
        type: String, 
        required: true 
    }
}, { 
    timestamps: true // Automatically tracks 'createdAt' and 'updatedAt' dates for accounts
});

module.exports = mongoose.model('User', userSchema);