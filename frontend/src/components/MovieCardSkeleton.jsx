const MovieCardSkeleton = () =>{
     return(
         <div className="group bg-gray-900 rounded-lg overflow-hidden shadow-lg border max-w-xs animate-pulse border-gray-800">
            {/* image placeholder  */}
            <div className="relative w-full h-80 bg-gray-800 ">
                <div className="absolute bottom-3 left-3 bg-gray-600 h-7 w-14 rounded-md"></div>
            </div>
            {/* text placeholder */}
            <div className="p-4 space-y-3">
                <div className="h-5 bg-gray-800 rounded w-3/4 "></div>
                <div className="h-5 bg-gray-800 rounded w-1/2"></div>
            </div>
         </div>
     )
};
export default MovieCardSkeleton;