import { useState, useEffect, createContext, useContext } from "react";

const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
    // FIX: Use a function inside useState to load data instantly on startup
    const [watchlist, setWatchlist] = useState(() => {
        const saved = localStorage.getItem("cinefinder_watchlist");
        return saved ? JSON.parse(saved) : [];
    });

    // Save to localStorage whenever watchlist changes
    useEffect(() => {
        localStorage.setItem("cinefinder_watchlist", JSON.stringify(watchlist));
    }, [watchlist]);

    const addToWatchlist = (item) => {
        if (!watchlist.find(i => i.id === item.id)) {
            setWatchlist([...watchlist, item]);
        }
    };

    const removeFromWatchlist = (id) => {
        setWatchlist(watchlist.filter(i => i.id !== id));
    };

    const isQueued = (id) => watchlist.some(item => item.id === id);

    return (
        <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist, isQueued }}>
            {children}
        </WatchlistContext.Provider>
    );
};

export const useWatchlist = () => useContext(WatchlistContext);