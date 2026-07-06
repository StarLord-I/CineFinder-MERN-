
const express = require('express');
const cors = require('cors');
require('dotenv').config(); 
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5001;


connectDB();


app.use(cors()); 
app.use(express.json()); 


app.use('/api/movies', require('./routes/movieRoutes'));
app.use('/api/tv', require('./routes/tvRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));


app.get('/', (req, res) => {
    res.send('Hello Master! The CineFinder Modular Backend is officially alive.');
});

app.listen(PORT, () => {
    console.log(`Server is running beautifully on http://localhost:${PORT}`);
});