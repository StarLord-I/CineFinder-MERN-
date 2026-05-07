import { useEffect, useState } from "react";
import { getPopularTV } from "../services/api";
import MovieCard from "../components/MovieCard";
import MovieCardSkeleton from "../components/MovieCardSkeleton";

const TVseries = () => {
    const [tvSeries, setSeries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTv = async () => {
            try {
                setLoading(true);
                const data = await getPopularTV();
                setSeries(data || []);
            } catch (err) {
                setError("Failed to fetch TV series. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchTv();
    }, []);

    return (
        // FIXED: Changed min-w-7xl to max-w-7xl to match Movies page and fix responsive scaling
        <main className="max-w-7xl mx-auto px-4 py-12">
            
            {/* FIXED: Title styling to match the clean, bold Movies page header */}
            <h2 className="text-2xl font-black mb-8 text-brand border-l-4 border-brand pl-4">
                Popular TV Series
            </h2>

            {/* ERROR HANDLING */}
            {error && (
                <div className="text-center py-20 text-xl text-red-500">{error}</div>
            )}

            {loading ? (
                // FIXED: Skeleton grid layout
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {Array(8).fill(0).map((_, i) => (
                        <MovieCardSkeleton key={i} />
                    ))}
                </div>
            ) : (
                // FIXED: Content grid layout with standard gap and responsive columns
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {tvSeries.map((item) => (
                        <MovieCard
                            key={item.id}
                            id={item.id}
                            mediaType="tv" // Ensures the detail link goes to /tv/:id
                            title={item.name} // TV specific field
                            rating={item.vote_average?.toFixed(1) || "N/A"}
                            year={item.first_air_date?.split("-")[0] || "N/A"}
                            poster={item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : null}
                        />
                    ))}
                </div>
            )}
        </main>
    );
};

export default TVseries;