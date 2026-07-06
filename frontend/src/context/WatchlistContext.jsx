import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
    const [watchlist, setWatchlist] = useState([]);

    // 1. Fetch the user's secure watchlist from your modular backend
    const fetchWatchlist = async () => {
        const token = localStorage.getItem('token');
        
        // Safety Guard: If no user token exists, wipe the state clean instantly and abort
        if (!token) {
            setWatchlist([]);
            return;
        }

        try {
            const res = await axios.get("http://localhost:5001/api/movies", {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            });
            setWatchlist(res.data);
        } catch (err) {
            console.error("Failed to load watchlist from database:", err);
            setWatchlist([]);
        }
    };

    // Trigger data fetch on initial application mount bootup
    useEffect(() => {
        fetchWatchlist();
    }, []);

    // 2. Add item to user's private database watchlist
    const addToWatchlist = async (item) => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            // FIXED: We now pass the exact TMDb property keys matching your frontend expectations
            const payload = {
                id: item.id, // 👈 CRITICAL: Keep the TMDB media ID intact!
                title: item.title || item.name,
                rating: item.vote_average || 0,
                poster_path: item.poster_path,
                release_date: item.release_date || item.first_air_date
            };

            const res = await axios.post("http://localhost:5001/api/movies", payload, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Update your local UI array state instantly with the structured object
            setWatchlist((prev) => [...prev, { ...payload, _id: res.data._id }]);
        } catch (err) {
            console.error("Error writing movie to database collection:", err);
        }
    };

    // 3. Helper utility function to check if a card is already saved
    const isQueued = (id) => {
        // Explicitly coerces both fields to strings/numbers to avoid type matching issues
        return watchlist.some(item => String(item.id) === String(id));
    };

    // 4. Temporary local removal tracker (We'll build the true database DELETE on Thursday)
    const removeFromWatchlist = (id) => {
        setWatchlist((prev) => prev.filter(item => String(item.id) !== String(id)));
    };

    return (
        <WatchlistContext.Provider value={{ watchlist, setWatchlist, addToWatchlist, removeFromWatchlist, isQueued, fetchWatchlist }}>
            {children}
        </WatchlistContext.Provider>
    );
};

export const useWatchlist = () => useContext(WatchlistContext);