import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import MovieCard from './components/MovieCard';
import { getTrending } from './services/api';

function App() {
  const [movies, setMovies] = useState([]); // Box for movies
  const [loading, setLoading] = useState(true); // Box for loading status

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await getTrending();
      setMovies(data);
      setLoading(false);
    };
    fetchMovies();
  }, []); // The empty [] means "run this only once"

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-white mb-8 border-l-4 border-brand pl-4">
          Trending Today
        </h2>
        
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-brand"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {movies.map((movie) => (
              <MovieCard 
                key={movie.id}
                title={movie.title || movie.name}
                rating={movie.vote_average?.toFixed(1)}
                year={(movie.release_date || movie.first_air_date)?.split("-")[0]}
                poster={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;