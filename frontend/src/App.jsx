import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import SearchResults from "./pages/SearchResults";
import MovieDetails from "./pages/MovieDetails";
import Movies from "./pages/Movies";
import TVseries from "./pages/TVseries";
import Watchlist from "./pages/Watchlist";
// 1. IMPORT YOUR NEW AUTHENTICATION PAGE
import Auth from "./pages/Auth";

function App() {

    return(
       <div className="min-h-screen bg-dark">
         <Navbar />
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/tv-series" element={<TVseries />} />          
            <Route path="/movies" element={<Movies />} />
            <Route path="/tv/:id" element={<MovieDetails />} /> 
            <Route path="/watchlist" element={<Watchlist />} />
            
            {/* 2. REGISTER THE SECURE AUTHENTICATION PATHWAY LINK */}
            <Route path="/auth" element={<Auth />} /> 
          </Routes>
       </div>
    );
}

export default App;