import axios from 'axios';

const BACKEND_BASE_URL = "http://localhost:5001/api";

export const getTrending = async () => {
    try {
        const response = await axios.get(`${BACKEND_BASE_URL}/discovery/trending`);
        // FIXED: Extract the .results array from your server's payload object
        return response.data.results; 
    } catch (error) {
        console.error("Error fetching trending movies:", error);
        return [];
    }
};

export const searchMovies = async (query) => {
    try {
        const response = await axios.get(`${BACKEND_BASE_URL}/discovery/search?query=${query}`);
        // FIXED: Extract the .results array from your server's payload object
        return response.data.results; 
    } catch (error) {
        console.error("Error searching movies:", error);
        return [];
    }
};

export const getPopularMovies = async () => {
    try{
        const response = await axios.get(`${BACKEND_BASE_URL}/discovery/popular`);
        // FIXED: Extract the .results array from your server's payload object
        return response.data.results;           
    } catch(err){
        console.error("Error fetching popular movies:", err);
        return [];
    }
};

export const getPopularTV = async () => {
     try{
        const response = await axios.get(`${BACKEND_BASE_URL}/tv/popular`);
        // FIXED: Extract the .results array from your server's payload object
        return response.data.results;           
    } catch(err){
        console.error("Error fetching popular TV series:", err);
        return [];
     }
};


export const getMovieDetails = async (id) => {
     try {
        const response = await axios.get(`${BACKEND_BASE_URL}/discovery/details/${id}`);
        return response.data; 
     } catch(error){
        console.error("Error fetching movie details:", error);
        return null;
      }
};

export const getMovieCredits = async (id) =>{
     try {
        const response = await axios.get(`${BACKEND_BASE_URL}/discovery/credits/${id}`);
        return response.data; 
     } catch(error){
        console.error("Error fetching movie credits:", error);
        return {cast:[], crew:[]};
      }
};

export const getTVCredits = async (id) => {
    try {
        const response = await axios.get(`${BACKEND_BASE_URL}/tv/credits/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching TV credits:", error);
        return { cast: [], crew: [] };
    }
};

export const getTVDetails = async (id) => {
    try {
        const response = await axios.get(`${BACKEND_BASE_URL}/tv/details/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching TV details:", error);
        return null;
    }
};