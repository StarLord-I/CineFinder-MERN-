import axios, { Axios } from 'axios';

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

// function to search movies by query

  export const searchMovies = async (query) => {
    try {
        const response = await axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
        return response.data.results; // TMDb returns the array in a .results property
    } catch (error) {
        console.error("Error searching movies:", error);
        return [];
    }
};

// function to get movie details by ID

  export const getMovieDetails = async (id) => {
     try {
        const response = await axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
        return response.data; // TMDb returns the movie details as an object
     } catch(error){
        console.error("Error fetching movie details:", error);
        return null;
      }
     
  };

  export const getMovieCredits = async (id) =>{
     try {
        const response = await axios.get(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`);
        return response.data; // TMDb returns the movie details as an object
     }
      catch(error){
        console.error("Error fetching movie credits:", error);
        return {cast:[], crew:[]};
      }
  };

//   Add: function to fetch popular movies

  export const getPopularMovies = async () => {
    try{
        const response = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
        return response.data.results; // TMDb returns the array in a .results property          
    }
    catch(err){
        console.error("Error fetching popular movies:", err);
        return [];
    }

  };