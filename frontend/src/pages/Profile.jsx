// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
    const [user, setUser] = useState(null);
    const [watchlist, setWatchlist] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 1. FIXED: Read the EXACT key names your browser is actually saving!
        const savedUsername = localStorage.getItem("username");
        const token = localStorage.getItem("token");

        if (savedUsername && token) {
            // Reconstruct the user object from the available strings
            setUser({
                username: savedUsername,
                email: localStorage.getItem("email") || "member@cinefinder.com" // fallback if email isn't written
            });
            
            // 2. Fetch the protected backend watchlist passing the security token header
            axios.get("http://localhost:5001/api/movies", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                setWatchlist(res.data);
            })
            .catch(err => {
                console.error("Backend validation failed for watchlist retrieval:", err);
            })
            .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    if (loading) return <div className="text-white text-center mt-20">Loading profile portfolio...</div>;

    if (!user) {
        return (
            <div className="text-center py-20 text-white max-w-md mx-auto">
                <h2 className="text-2xl font-bold text-red-500 mb-4">Access Restricted</h2>
                <p className="text-gray-400">Please log in or register an account to view your personal member profile workspace.</p>
            </div>
        );
    }

    return (
        <main className="max-w-7xl mx-auto px-4 py-12 text-white">
            {/* User Metadata Overview Header Card */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-8 rounded-2xl border border-slate-800 mb-12 flex items-center gap-6">
                <div className="w-20 h-20 bg-brand text-slate-950 font-bold rounded-full text-3xl flex items-center justify-center shadow-xl uppercase">
                    {user.username ? user.username.charAt(0) : "U"}
                </div>
                <div>
                    <h1 className="text-3xl font-extrabold text-white">{user.username}</h1>
                    <p className="text-gray-400 text-sm mt-1">📧 Account Email: {user.email}</p>
                    <span className="inline-block bg-brand/10 text-brand border border-brand/20 rounded-full px-3 py-0.5 text-xs font-semibold mt-3">
                        Active Verified Member
                    </span>
                </div>
            </div>

            {/* User Specific Saved Movie Watchlist Library Layout */}
            <h2 className="text-xl font-bold text-brand mb-6 border-l-4 border-brand pl-3">My Saved Film Watchlist ({watchlist.length})</h2>
            {watchlist.length === 0 ? (
                <p className="text-gray-500 italic bg-slate-900/40 p-6 text-center rounded-xl border border-slate-900">Your collection library is completely empty. Explore movie titles to start compiling tracking data!</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {watchlist.map((movie) => (
                        <div key={movie._id || movie.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-md flex justify-between items-center">
                            <div>
                                <h3 className="font-semibold text-white text-md truncate max-w-[180px]">{movie.title}</h3>
                                <p className="text-xs text-brand mt-1">⭐ User Score: {movie.rating || movie.vote_average}/10</p>
                            </div>
                            <span className="text-xs text-gray-500 bg-slate-800 px-2 py-1 rounded">Saved</span>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}

export default Profile;