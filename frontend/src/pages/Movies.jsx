import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPopularMovies } from "../services/api";
import MovieCard from "../components/MovieCard";
import MovieCardSkeleton from "../components/MovieCardSkeleton";

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        const fetchMovies = async ()=>{
            try{
                setLoading(true);
                setError(null);

                const data = await getPopularMovies();

                if(!data || data.length === 0){
                    throw new Error("Failed to load popular movies. Please try again later.");
                }

                setMovies(data);
            }
            catch(err){
                console.error("Error fetching popular movies:", err);
                setError("Failed to load popular movies. Please try again later.");
            }
            finally{
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);
    
    return (
        <main className="max-w-7xl mx-auto px-4 py-12">
            <h2>Popular Movies</h2>

            {/* error handling  */}
            {error && (<div className="text-center py-20 text-xl text-red-500">
                    {error}
            </div>
            )}

            {/* MODIFIED: Show skeleton loaders while data is loading  */}
            {loading ?(
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {Array(8).fill(0).map((_, index) => (
                          <MovieCardSkeleton key={index} />
                         ))}
                    </div>
                ) :(
                     // render the actual movie cards once data is loaded
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                         {movies.map((movie) => (
                         <MovieCard 
                            key={movie.id}
                            id={movie.id}
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
export default Movies;