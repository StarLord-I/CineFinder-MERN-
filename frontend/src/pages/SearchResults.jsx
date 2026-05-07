import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../services/api";
import MovieCard from "../components/MovieCard";
import MovieCardSkeleton from "../components/MovieCardSkeleton"; // HIGHLIGHT: Re-added for consistency

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    // FIXED: Changed "q" to "query" to match most common search bar implementations
    const query = searchParams.get("query") || searchParams.get("q"); 

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResults = async () => {
           if (!query || query.trim() === "" || query === "null") {
                setMovies([]);
                return;
            }

            try {
                setLoading(true);
                setError(null);

                const results = await searchMovies(query);

                if (!results || !Array.isArray(results)) {
                    throw new Error("Invalid response from API");
                }

                setMovies(results);
            } catch (err) {
                console.error("search error", err);
                setError("Something went wrong while searching. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchResults();
    }, [query]);

    return (
        <main className="max-w-7xl mx-auto px-4 py-12">
            <h2 className="text-2xl font-bold text-white mb-8 border-l-4 border-brand pl-4">
                Search Results for: <span className="text-brand italic">"{query || '...'}"</span>
            </h2>

            {/* ERROR HANDLING */}
            {error && <div className="text-center py-20 text-red-400 text-xl">{error}</div>}

            {/* LOADING STATE: Using Skeletons instead of a simple spinner */}
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {Array(8).fill(0).map((_, index) => (
                        <MovieCardSkeleton key={index} />
                    ))}
                </div>
            ) : (
                <>
                    {/* EMPTY STATES */}
                    {!error && query && movies.length === 0 && (
                        <div className="text-center py-20 text-gray-400 text-xl">
                            No results found for "{query}". Try something else!
                        </div>
                    )}

                    {/* SUCCESS STATE */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {movies.map((movie) => {
                            // FIXED: Logic inside map must be wrapped in { } with a return
                            // FIXED: Use 'movie' (the parameter name) instead of 'item'
                            const isTV = movie.media_type === "tv" || (!movie.title && movie.name);
                            const type = isTV ? "tv" : "movie";

                            return (
                                <MovieCard 
                                    key={movie.id}
                                    id={movie.id}
                                    mediaType={type} // HIGHLIGHT: Passing the type for correct dynamic routing
                                    title={movie.title || movie.name}
                                    rating={movie.vote_average?.toFixed(1) || "N/A"}
                                    year={(movie.release_date || movie.first_air_date)?.split("-")[0] || "N/A"}
                                    poster={
                                        movie.poster_path
                                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                        : null
                                    }
                                />
                            );
                        })}
                    </div>
                </>
            )}
        </main>
    );
};

export default SearchResults;