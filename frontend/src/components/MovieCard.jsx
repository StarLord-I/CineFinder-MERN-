const MovieCard = ({ title, rating, year, poster }) => {
  return (
    <div className="group bg-gray-900 rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 shadow-lg border border-gray-800 max-w-xs">
      <div className="relative">
        <img 
          src={poster || 'https://via.placeholder.com/500x750?text=No+Image'} 
          alt={title}
          className="w-full h-84 object-cover"
        />
        {/* Rating Badge */}
        <div className="absolute bottom-3 left-3 bg-black/80 text-brand px-2 py-1 rounded-md text-sm font-bold border border-brand/30">
          {rating}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-white font-semibold truncate group-hover:text-brand transition">{title}</h3>
        <p className="text-gray-400 text-sm mt-1">{year}</p>
      </div>
    </div>
  );
};

export default MovieCard;