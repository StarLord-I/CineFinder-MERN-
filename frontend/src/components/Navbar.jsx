import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { searchMovies } from '../services/api';
import { Search, Menu } from 'lucide-react';

const Navbar = () => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();
    const searchRef = useRef(null); // Matches the 'ref' in your JSX below

    // EFFECT 1: Handle Live Search Suggestions (Debounced)
    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            // Logic Fix: Use > 2 so it works as you keep typing
            if (query.trim().length > 2) { 
                const results = await searchMovies(query);
                setSuggestions(results.slice(0, 5)); 
                setShowDropdown(true);
            } else {
                setSuggestions([]);
                setShowDropdown(false);
            }
        }, 300); 

        return () => clearTimeout(timeoutId);
    }, [query]);

    // EFFECT 2: Close dropdown when clicking outside
    useEffect(() => {
        const closeSearch = (e) => {
            // check if we clicked outside the search container
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", closeSearch);
        return () => document.removeEventListener("mousedown", closeSearch);
    }, []);

   const handleSelect = (movie) => {
        setShowDropdown(false);
        setQuery(""); 
        
        // FIXED: Changed 'q' to 'query' to match SearchResults logic
        // encodeURIComponent ensures special characters like "&" don't break the URL
        const searchTerm = movie.title || movie.name;
        navigate(`/search?query=${encodeURIComponent(searchTerm)}`); 
    };

    return (
        <nav className="bg-dark/90 backdrop-blur-md border-b border-gray-800 p-4 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div>
                    <Link to="/" className="text-brand text-2xl font-bold tracking-tighter">
                        CineFinder
                    </Link>
                </div>

                <ul className="hidden md:flex gap-8 text-gray-300 font-medium">
                    <li><Link to="/" className="hover:text-brand transition">Home</Link></li>
                    <li><Link to="/movies" className="hover:text-brand transition">Movies</Link></li>
                    <li><Link to="/tv-series" className="hover:text-brand transition">TV Series</Link></li>
                    <li><Link to="/watchlist" className="hover:text-brand transition">Watchlist</Link></li>
                </ul>

                {/* Search Bar - Note the ref={searchRef} here */}
                <div className="relative hidden sm:block" ref={searchRef}>
                    <div className='relative'>
                        <input 
                            type="text" 
                            placeholder="Search movies & TV shows..." 
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSelect({title: query})}
                            className="bg-gray-900 text-white pl-10 pr-4 py-2 rounded-full border border-gray-700 focus:border-brand focus:outline-none w-64 transition-all"
                        />
                        <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
                    </div>

                    {showDropdown && suggestions.length > 0 && (
                        <div className="absolute top-12 left-0 w-full bg-gray-900 border border-gray-700 rounded-xl shadow-2xl overflow-hidden z-50">
                            {suggestions.map((item) => (
                                <div 
                                    key={item.id}
                                    onClick={() => handleSelect(item)}
                                    className="px-4 py-3 hover:bg-gray-800 cursor-pointer flex items-center gap-3 transition border-b border-gray-800 last:border-none"
                                >
                                    <img 
                                        src={item.poster_path ? `https://image.tmdb.org/t/p/w92${item.poster_path}` : 'https://via.placeholder.com/92x138'} 
                                        className="w-8 h-12 object-cover rounded"
                                        alt=""
                                    />
                                    <div className="truncate text-left">
                                        <p className="text-white text-sm font-medium truncate">{item.title || item.name}</p>
                                        <p className="text-gray-500 text-xs">{(item.release_date || item.first_air_date)?.split("-")[0]}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="md:hidden text-white">
                    <Menu size={28} />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;