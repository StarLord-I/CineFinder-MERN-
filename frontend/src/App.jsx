import { Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import SearchResults from "./pages/SearchResults";

function App() {

    return(
       <div>
         <Navbar />
         <Routes>
           <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchResults />} />
         </Routes>
       </div>
       
    );
}

export default App; 