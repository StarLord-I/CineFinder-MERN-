import { useState ,useEffect} from "react";
import { getTrending } from "../services/api";
import MovieCard from "../components/MovieCard";
import MovieCardSkeleton from "../components/MovieCardSkeleton";

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
       const fetchTrendingMovies = async () => { 
         try{
            setLoading(true);
            setError(null);
            // api call is secured and optimized 
           const data = await getTrending();

            if (!data || data.length ===0){
              throw new Error("fail to fetch trending movies");
            }
            setMovies(data);
          } catch (err){
            console.error("Error fetching trending movies:", err);
            setError("Failed to load trending movies. Please try again later.");
          }
           finally{
            setLoading(false);
           }
       
      
       };
        fetchTrendingMovies ();
      } ,[]);


    
  
    return (
        <main className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold text-brand mb-8 border-l-4 border-brand pl-4">
        Trending This Week
      </h2>

       {/* ERROR HANDLING: Display error message if API fails */}
       {error && (
           <div className="text-center py-20 text-xl text-red-500">{error}</div>
       )}

       {/* MODIFIED: Show skeleton loaders while data is loading */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {/* Generates 8 placeholders smoothly for better user experience */}
            {Array(8).fill(0).map((_, index) =>{
              return <MovieCardSkeleton key={index}/>
            })}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {movies.map((movie) => (
            <MovieCard 
              key={movie.id}
              id={movie.id}
              title={movie.title || movie.name}
              rating={movie.vote_average?.toFixed(1)}
              year={(movie.release_date || movie.first_air_date)?.split("-")[0]}
              poster={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null}
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default Home;

