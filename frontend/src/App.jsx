import { Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import SearchResults from "./pages/SearchResults";
import MovieDetails from "./pages/MovieDetails";
import Movies from "./pages/Movies";
import TVseries from "./pages/TVseries";

function App() {

    return(
       <div>
         <Navbar />
         <Routes>
           <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/tv-series" element={<TVseries />} />          
            <Route path="/movies" element={<Movies />} />
            <Route path="/tv/:id" element={<MovieDetails />} /> 
             
          </Routes>
       </div>
       
    );
}

export default App; 