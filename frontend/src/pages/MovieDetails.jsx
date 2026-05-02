import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieDetails, getMovieCredits } from "../services/api";

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
    const [director, setDirector] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                setLoading(true);
                setError(null);

                // Fetch movie details and credits in parallel
                const [details, creditsData] = await Promise.all([
                    getMovieDetails(id),
                    getMovieCredits(id)
                ]);
                
                if (!details) {
                    throw new Error("Movie details could not be found. Please try again later.");
                }
                
                setMovie(details);

                // Find director
                const directorobj = creditsData?.crew?.find((member) => member.job === "Director");  

                setDirector(directorobj ? directorobj.name : "Unknown");
                setCast(creditsData?.cast?.slice(0, 7) || []); // Get top 7 cast members
            } catch (err) {
                console.error("Error fetching movie details or credits:", err);
                setError(err.message || "An error occurred while fetching movie details. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [id]);
 
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
                <p className="text-gray-400 mb-8">{error || "Movie details could not be found."}</p>
                <Link to="/" className="bg-brand text-dark px-6 py-2 rounded-full font-bold hover:bg-yellow-500 transition">Back to Home Page</Link>
            </div>
        );
    }

    const POSTER_URL = movie.poster_path 
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
        : 'https://via.placeholder.com/500x750?text=No+Image';

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
                        <span className="bg-brand text-black px-2 py-1 rounded font-bold">★ {movie.vote_average?.toFixed(1) || 'N/A'} / 10</span>
                        <span>{movie.release_date?.split("-")[0] || 'N/A'}</span>
                        <span>{movie.runtime ? `${movie.runtime} min` : "N/A"}</span>
                        <span>{movie.genres?.map((g) => g.name).join(', ') || 'N/A'}</span>
                    </div>
                </div>
            </div>

            {/* Main Content Layout (Moved completely outside the hero container) */}
            <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-12 mt-8">
                {/* Poster column */}
                <div className="md:col-span-1">
                    <img 
                        src={POSTER_URL} 
                        alt={movie.title} 
                        className="w-full rounded-2xl shadow-2xl border border-gray-800"
                    />
                </div>
                
                {/* Info column */}
                <div className="md:col-span-2 flex flex-col gap-6">
                    <div>
                        <h2 className="text-2xl font-bold text-brand mb-4">Premise</h2>
                        <p className="text-gray-300 text-lg leading-relaxed mb-8">{movie.overview || 'No overview available.'}</p>
                    </div>
                    
                    {/* Sub-info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 border-t border-b border-gray-800 py-6">
                        <div>
                            <span className="block text-gray-500 text-xs font-bold tracking-wider uppercase mb-1">Director</span>
                            <span className="text-white text-lg font-semibold">{director}</span>
                        </div>
                        <div>
                            <span className="block text-gray-500 text-xs font-bold tracking-wider uppercase mb-1">Status</span>
                            <span className="text-white text-lg font-semibold">{movie.status}</span>
                        </div>
                    </div>

                    {/* Cast column */}
                    <div>
                        <h2 className="text-2xl font-bold text-brand mb-4">Top Cast</h2>
                        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-700">
                            {cast.length === 0 ? (
                                <p className="text-gray-400">No cast information available.</p>
                            ) : (
                                cast.map((actor) => (
                                    <div
                                        key={actor.id}
                                        className="bg-gray-900 rounded-lg p-3 w-32 shrink-0 text-center"
                                    >
                                        <img
                                            src={
                                                actor.profile_path
                                                ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                                                : "https://via.placeholder.com/150"
                                            }
                                            alt={actor.name}
                                            className="w-16 h-16 rounded-full object-cover mx-auto mb-2 border border-gray-700"
                                        />
                                        <p className="text-xs font-bold text-white truncate">
                                            {actor.name}
                                        </p>
                                        <p className="text-[10px] text-gray-400 truncate">
                                            {actor.character}
                                        </p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>      
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;