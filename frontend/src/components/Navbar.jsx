import {Link} from 'react-router-dom';
import { Search, Menu } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-dark/90 backdrop-blur-md border-b border-gray-800 p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <div >
          <Link to="/" className="text-brand text-2xl font-bold tracking-tighter" >
          CineFinder
          </Link>
        </div>

        {/* Navigation Links - Desktop */}
        <ul className="hidden md:flex gap-8 text-gray-300 font-medium">
          <li><Link to="/" className="hover:text-brand cursor-pointer transition">Home</Link></li>

          <li><Link to="/movies" className="hover:text-brand cursor-pointer transition">Movies</Link></li>

          <li><Link to="/tv-series" className="hover:text-brand cursor-pointer transition">TV Series</Link></li>

          <li><Link to="/watchlist" className="hover:text-brand cursor-pointer transition">Watchlist</Link></li>
          
        </ul>

        {/* Search Bar */}
        <div className="relative hidden sm:block">
          <input 
            type="text" 
            placeholder="Search movies..." 
            className="bg-gray-900 text-white pl-10 pr-4 py-2 rounded-full border border-gray-700 focus:border-brand focus:outline-none w-64 transition-all"
          />
          <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden text-white">
          <Menu size={28} />
        </div>

      </div>
    </nav>
  );
};

export default Navbar;