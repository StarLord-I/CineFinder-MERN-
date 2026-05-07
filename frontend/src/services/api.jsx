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
        const response = await axios.get(`${BASE_URL}/search/multi?api_key=${API_KEY}&query=${query}`);
        return response.data.results; // TMDb returns the array in a .results property
    } catch (error) {
        console.error("Error searching movies and TV shows:", error);
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

//   MODIFIED: Function to fetch popular TV series

export const getPopularTV = async () => {
     try{
        const response = await axios.get(`${BASE_URL}/tv/popular?api_key=${API_KEY}`);
        return response.data.results; // TMDb returns the array in a .results property          
    }
     catch(err){
        console.error("Error fetching popular TV series:", err);
        return [];
     }
     
};

export const getTVCredits = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/tv/${id}/credits?api_key=${API_KEY}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching TV credits:", error);
        return { cast: [], crew: [] };
    }
};

export const getTVDetails = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/tv/${id}?api_key=${API_KEY}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching TV details:", error);
        return null;
    }
};


// // NOTE: Our existing searchMovies function already uses the /search/multi endpoint, 
// which is perfect for our new multi-logic. So we don't need to change it. It will return both movies and TV shows based on the query, and we can handle the results in our components as needed.
