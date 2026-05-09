import { useWatchlist } from "../context/WatchlistContext";
import MovieCard from "../components/MovieCard";

const Watchlist = () => {
    const { watchlist } = useWatchlist();

    return (
        <main className="max-w-7xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-black mb-8 text-brand border-l-4 border-brand pl-4">
                My Watchlist
            </h2>

            {watchlist.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-gray-400 text-xl">Your watchlist is empty. Start adding some favorites!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {watchlist.map((item) => (
                        <MovieCard 
                            key={item.id}
                            id={item.id}
                             // FIXED: Explicitly map the TMDb data to your MovieCard props
                            title={item.title || item.name}
                            rating={item.vote_average?.toFixed(1) || "N/A"}
                            year={(item.release_date || item.first_air_date)?.split("-")[0] || "N/A"}
                            poster={item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : null}
                            mediaType={item.first_air_date || !item.title ? "tv" : "movie"}
                        />
                    ))}
                </div>
            )}
        </main>
    );
};

export default Watchlist;