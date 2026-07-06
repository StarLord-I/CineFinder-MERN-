const axios = require('axios');
const Movie = require('../models/Movie'); 
const TMDB_BASE = "https://api.tmdb.org/3";

const getWatchlist = async (req, res) => {
    try {
        const movies = await Movie.find(); 
        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const addToWatchlist = async (req, res) => {
    try {
        const { title, rating } = req.body;
        const newMovie = new Movie({ title, rating });
        const savedMovie = await newMovie.save();
        res.status(201).json(savedMovie);
    } catch (err) {
        res.status(400).json({ message: "Failed to add movie, Master!", error: err.message });
    }
};

const getTrending = async (req, res) => {
    try {
        const response = await axios.get(`${TMDB_BASE}/trending/movie/week?api_key=${process.env.TMDB_API_KEY}`, { timeout: 5000 });
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ message: "Proxy Error fetching trending movies", error: err.message });
    }
};

const searchMovies = async (req, res) => {
    try {
        const { query } = req.query;
        const response = await axios.get(`${TMDB_BASE}/search/multi?api_key=${process.env.TMDB_API_KEY}&query=${query}`);
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ message: "Proxy Error searching database", error: err.message });
    }
};

const getMovieDetails = async (req, res) => {
    try {
        const response = await axios.get(`${TMDB_BASE}/movie/${req.params.id}?api_key=${process.env.TMDB_API_KEY}&append_to_response=videos,watch/providers`);
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ message: "Proxy Error getting movie details", error: err.message });
    }
};

const getMovieCredits = async (req, res) => {
    try {
        const response = await axios.get(`${TMDB_BASE}/movie/${req.params.id}/credits?api_key=${process.env.TMDB_API_KEY}`);
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ message: "Proxy Error getting movie credits", error: err.message });
    }
};

const getPopularMovies = async (req, res) => {
    try {
        const response = await axios.get(`${TMDB_BASE}/movie/popular?api_key=${process.env.TMDB_API_KEY}`);
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ message: "Proxy Error getting popular movies", error: err.message });
    }
};

const getPopularTV = async (req, res) => {
    try {
        const response = await axios.get(`${TMDB_BASE}/tv/popular?api_key=${process.env.TMDB_API_KEY}`);
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ message: "Proxy Error getting popular TV series", error: err.message });
    }
};

const getTVCredits = async (req, res) => {
    try {
        const response = await axios.get(`${TMDB_BASE}/tv/${req.params.id}/credits?api_key=${process.env.TMDB_API_KEY}`);
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ message: "Proxy Error getting TV credits", error: err.message });
    }
};

const getTVDetails = async (req, res) => {
    try {
        const response = await axios.get(`${TMDB_BASE}/tv/${req.params.id}?api_key=${process.env.TMDB_API_KEY}&append_to_response=videos,watch/providers`);
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ message: "Proxy Error getting TV details", error: err.message });
    }
};

module.exports = {
    getWatchlist, addToWatchlist, getTrending, searchMovies, 
    getMovieDetails, getMovieCredits, getPopularMovies, 
    getPopularTV, getTVCredits, getTVDetails
};