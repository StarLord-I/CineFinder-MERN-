import { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom"; 

import { 
    getMovieDetails, getMovieCredits, 
    getTVDetails, getTVCredits 
} from "../services/api";  

import { useWatchlist } from "../context/WatchlistContext";
import MovieReviews from "../components/MovieReviews";

const MovieDetails = () => {
    const { id } = useParams();
    const location = useLocation(); 
    const isTV = location.pathname.includes("/tv/");

    const { addToWatchlist, removeFromWatchlist, isQueued } = useWatchlist();

    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
    const inWatchlist = movie ? isQueued(movie.id) : false;

    const [director, setDirector] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Dynamic state to check if user has an active session token saved locally
    const isLoggedIn = !!localStorage.getItem('token');

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                setLoading(true);
                setError(null);

                const [details, creditsData] = await Promise.all([
                    isTV ? getTVDetails(id) : getMovieDetails(id),
                    isTV ? getTVCredits(id) : getMovieCredits(id)
                ]);
                
                if (!details) {
                    throw new Error(`${isTV ? "TV Show" : "Movie"} details could not be found.`);
                }
                
                setMovie(details);

                const directorObj = creditsData?.crew?.find(
                    (member) => member.job === (isTV ? "Executive Producer" : "Director")
                ) || details.created_by?.[0]; 

                setDirector(directorObj ? directorObj.name : "N/A");
                setCast(creditsData?.cast?.slice(0, 7) || []); 
            } catch (err) {
                console.error("Fetch error:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [id, isTV]); 
 
    if (loading) {
        return (
            <div className="min-h-screen flex bg-dark items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-brand"></div>
            </div>
        );
    }
    
    if (error || !movie) {
        return (
            <div className="min-h-screen bg-dark flex flex-col items-center justify-center text-center text-white px-4">
                <h2 className="text-3xl font-bold text-red-500 mb-4">Oops! Error Occurred</h2>
                <p className="text-gray-400 mb-8">{error}</p>
                <Link to="/" className="bg-brand text-dark px-6 py-2 rounded-full font-bold hover:bg-yellow-500 transition">Back to Home Page</Link>
            </div>
        );
    }

    const POSTER_URL = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
    : 'https://placehold.co/500x750?text=No+Poster';

    return (
        <div className="min-h-screen bg-dark text-white pb-20">
            {/* Backdrop hero section */}
            <div className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden">
                {movie.backdrop_path && (
                    <div 
                        className="absolute inset-0 bg-cover bg-center opacity-20"
                        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}
                    />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-dark to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 max-w-7xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-black mb-4">{movie.title || movie.name}</h1>
                    <div className="flex flex-wrap gap-4 items-center text-sm md:text-base text-gray-300">
                        <span className="bg-brand text-black px-2 py-1 rounded font-bold">★ {movie.vote_average?.toFixed(1) || '0.0'} / 10</span>
                        <span>{(movie.release_date || movie.first_air_date)?.split("-")[0]}</span>
                        <span>{isTV ? `${movie.number_of_seasons} Seasons` : `${movie.runtime} min`}</span>
                        <span>{movie.genres?.map((g) => g.name).join(', ') || 'N/A'}</span>
                    </div>

                    {/* Watchlist button features an internal authorization guard wrapper */}
                    {isLoggedIn ? (
                        <button 
                            onClick={() => inWatchlist ? removeFromWatchlist(movie.id) : addToWatchlist(movie)}
                            className={`mt-6 px-8 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg flex items-center gap-2 ${
                                inWatchlist 
                                ? "bg-red-500/20 text-red-500 border border-red-500/50 hover:bg-red-500 hover:text-white" 
                                : "bg-brand text-dark hover:bg-yellow-500 hover:scale-105"
                            }`}
                        >
                            {inWatchlist ? "✓ In Watchlist" : "+ Add to Watchlist"}
                        </button>
                    ) : (
                        <div className="mt-6 p-4 bg-gray-900/80 border border-dashed border-gray-700 rounded-xl max-w-sm backdrop-blur-xs">
                            <p className="text-xs text-gray-400 mb-2">Want to curate your personal movie library?</p>
                            <Link to="/auth" className="text-brand hover:underline font-bold text-xs flex items-center gap-1">
                                🔒 Sign up or Login to unlock your watchlist &rarr;
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-12 mt-8">
                <div className="md:col-span-1">
                    <img 
                        src={POSTER_URL} 
                        alt={movie.title || movie.name} 
                        className="w-full rounded-2xl shadow-2xl border border-gray-800"
                    />
                </div>
                
                <div className="md:col-span-2 flex flex-col gap-6">
                    <div>
                        <h2 className="text-2xl font-bold text-brand mb-4">Premise</h2>
                        <p className="text-gray-300 text-lg leading-relaxed mb-8">{movie.overview || 'No overview available.'}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 border-t border-b border-gray-800 py-6">
                        <div>
                            <span className="block text-gray-500 text-xs font-bold tracking-wider uppercase mb-1">{isTV ? "Creator" : "Director"}</span>
                            <span className="text-white text-lg font-semibold">{director}</span>
                        </div>
                        <div>
                            <span className="block text-gray-500 text-xs font-bold tracking-wider uppercase mb-1">Status</span>
                            <span className="text-white text-lg font-semibold">{movie.status}</span>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-brand mb-4">Top Cast</h2>
                        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-700">
                            {cast.length === 0 ? (
                                <p className="text-gray-400">No cast information available.</p>
                            ) : (
                                cast.map((actor, index) => (
                                    <div key={`${actor.id}-${index}`} className="bg-gray-900 rounded-lg p-3 w-32 shrink-0 text-center">
                                        <img
                                            src={actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : "https://via.placeholder.com/150"}
                                            alt={actor.name}
                                            className="w-16 h-16 rounded-full object-cover mx-auto mb-2 border border-gray-700"
                                        />
                                        <p className="text-xs font-bold text-white truncate">{actor.name}</p>
                                        <p className="text-[10px] text-gray-400 truncate">{actor.character}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>      

                   
                    {movie?.videos?.results && (
                        <div className="mt-4">
                            <h2 className="text-2xl font-bold text-brand mb-4 border-l-4 border-brand pl-3">Official Trailer</h2>
                            {(() => {
                                const trailer = movie.videos.results.find(
                                    (vid) => vid.type === "Trailer" && vid.site === "YouTube"
                                );
                                
                                if (trailer) {
                                    return (
                                        <div className="w-full rounded-2xl overflow-hidden shadow-2xl bg-black border border-gray-800">
                                            <iframe
                                                src={`https://www.youtube.com/embed/${trailer.key}`}
                                                title="Official Trailer"
                                                className="w-full h-[240px] sm:h-[360px] md:h-[400px]"
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                    );
                                }
                                return <p className="text-gray-400 italic">No official video trailer available at this time.</p>;
                            })()}
                        </div>
                    )}

                    
                    <div className="mt-4 bg-gray-900/40 p-6 rounded-2xl border border-gray-800">
                        <h2 className="text-xl font-bold text-white mb-3">Where to Watch</h2>
                        {(() => {
                            const providers = movie?.["watch/providers"]?.results?.IN;
                            const releaseStatus = movie?.status;

                            if (releaseStatus && releaseStatus !== "Released" && releaseStatus !== "Returning Series" && releaseStatus !== "Ended") {
                                return (
                                    <div className="text-amber-500 font-semibold flex items-center gap-2 text-sm">
                                        ⏳ Status: Not Yet Released (In Production / Planned)
                                    </div>
                                );
                            }

                            if (providers && (providers.flatrate || providers.rent || providers.buy)) {
                                const streamingPlatforms = providers.flatrate || providers.rent || [];
                                return (
                                    <div>
                                        <p className="text-green-400 font-medium text-sm mb-3">🟢 Available now on Streaming/OTT Platforms:</p>
                                        <div className="flex flex-wrap gap-3 items-center">
                                            {streamingPlatforms.map((platform) => (
                                                <div key={platform.provider_id} className="flex items-center gap-2 bg-gray-900 border border-gray-800 px-3 py-1.5 rounded-xl text-xs text-gray-200 shadow-sm">
                                                    <img 
                                                        src={`https://image.tmdb.org/t/p/w92${platform.logo_path}`} 
                                                        alt={platform.provider_name} 
                                                        className="w-5 h-5 rounded-md"
                                                    />
                                                    <span>{platform.provider_name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            }

                            return (
                                <div className="text-brand font-semibold flex items-center gap-2 text-sm">
                                    🎬 Currently Playing Exclusively in Theatres / Cinemas
                                </div>
                            );
                        })()}
                    </div>
                    {/* ======================================================================= */}

                </div>
            </div>
           
            {/* Audience evaluation feed wrapper boundary */}
            <div className="max-w-7xl mx-auto px-4 mt-8">
                <MovieReviews movieId={id} />
            </div>
        </div>
    );
};

export default MovieDetails;