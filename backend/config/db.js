const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Successfully connected to CinefinderDB on Atlas!');
    } catch (error) {
        console.error('Error connecting to CinefinderDB:', error);
        process.exit(1);
    }
} ;

module.exports = connectDB;