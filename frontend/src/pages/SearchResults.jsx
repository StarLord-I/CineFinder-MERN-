import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../services/api";
import MovieCard from "../components/MovieCard";

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResults = async () => {
            if (!query || query.trim() === "") {
                setMovies([]);
                setLoading(false); // Fix: Turn off loading so the empty state displays correctly
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
                setError("Something went wrong while searching for movies. Please try again later.");
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

            {/* loading indicator */}
            {loading && (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-brand"></div>
                </div>
            )}

            {/* error message */}
            {error && (
                <div className="text-center py-20 text-red-400 text-xl">
                    {error}
                </div>
            )}

            {!loading && !error && (!query || query?.trim() === "") && (
                <div className="text-center py-20 text-gray-400 text-xl">
                    Please enter something to search.
                </div>
            )}

            {!loading && !error && query && movies.length === 0 && (
                <div className="text-center py-20 text-gray-400 text-xl">
                    No movies found for "{query}". Try something else!
                </div>
            )}

            {!loading && !error && movies.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {movies.map((movie) => (
                        <MovieCard 
                            key={movie.id}
                            title={movie.title || movie.name}
                            rating={movie.vote_average?.toFixed(1) || "N/A"}
                            year={(movie.release_date || movie.first_air_date)?.split("-")[0] || "N/A"}
                            poster={
                                movie.poster_path
                                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                : null
                            }
                        />
                    ))}
                </div>
            )}
        </main>
    );
};

export default SearchResults;