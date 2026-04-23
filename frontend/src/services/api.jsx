import axios from 'axios';

// Using your TMDb key from the original script
const API_KEY = "ff8d981804cc7910589448deccf1fa6a"; 
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