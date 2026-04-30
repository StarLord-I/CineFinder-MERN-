import axios from 'axios';

// Using your TMDb key from the original script
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const getTrending = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
        return response.data.results; // TMDb returns the array in a .results property
    } catch (error) {
        console.error("Error fetching trending movies:", error);
        return [];
    }
};


  export const searchMovies = async (query) => {
    try {
        const response = await axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
        return response.data.results; // TMDb returns the array in a .results property
    } catch (error) {
        console.error("Error searching movies:", error);
        return [];
    }
};