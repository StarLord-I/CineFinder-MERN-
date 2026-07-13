const express = require('express');
const cors = require('cors');
require('dotenv').config(); 

const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const watchlistRoutes = require('./routes/watchlistRoutes');
const discoveryRoutes = require('./routes/discoveryRoutes');
const tvRoutes = require('./routes/tvRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

connectDB();

app.use(cors());          
app.use(express.json());  

app.use('/api/auth', authRoutes);           // Security authentication workspace
app.use('/api/watchlist', watchlistRoutes); // Isolated User private database storage
app.use('/api/discovery', discoveryRoutes); // Public TMDB movie proxy feed layer
app.use('/api/tv', tvRoutes);               // TV Series proxy discovery layer
app.use('/api/reviews', reviewRoutes);       // Public user reviews interactions


app.get('/', (req, res) => {
    res.status(200).send('Hello Master! The CineFinder Modular Backend is officially alive and decoupled.');
});

// Activate the network socket listener
app.listen(PORT, () => {
    console.log(`Server is running beautifully on http://localhost:${PORT}`);
});