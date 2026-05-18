import { useState, useEffect } from 'react';
import axios from 'axios';
// 1. IMPORT LINK: Crucial for moving to the /auth screen without refreshing
import { Link } from 'react-router-dom'; 

function MovieReviews({ movieId }) {
    const [reviews, setReviews] = useState([]);
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(10);
    
    const username = localStorage.getItem('username') || 'Guest Moviegoer';
    // Dynamic Boolean to check if a token exists in the browser
    const isLoggedIn = !!localStorage.getItem('token'); 

    useEffect(() => {
        axios.get(`http://localhost:5001/api/reviews/${movieId}`)
            .then(res => setReviews(res.data))
            .catch(err => console.error("Error pulling review feeds:", err));
    }, [movieId]);

    const handlePostReview = async (e) => {
        e.preventDefault();
        if (!reviewText.trim()) return;

        try {
            const response = await axios.post('http://localhost:5001/api/reviews', {
                movieId,
                username,
                reviewText,
                rating
            });
            
            setReviews([response.data, ...reviews]);
            setReviewText('');
        } catch (err) {
            console.error("Failed to post user review:", err);
        }
    };

    return (
        <div className="mt-10 p-6 bg-slate-900 rounded-xl border border-slate-800 text-white max-w-4xl mx-auto shadow-2xl">
            <h3 className="text-xl font-bold text-brand mb-6 border-b border-slate-800 pb-3">
                Audience Reviews
            </h3>

            {/* 2. AUTH GATEWAY: Enforce account validation for typing dynamic reviews */}
            {isLoggedIn ? (
                /* Unlocked Form for Authorized Users */
                <form onSubmit={handlePostReview} className="mb-8 flex flex-col gap-4">
                    <textarea 
                        value={reviewText} 
                        onChange={e => setReviewText(e.target.value)}
                        placeholder="Share your thoughts on this movie, Master..." 
                        className="p-3 rounded-lg bg-slate-800 border border-slate-700 w-full text-white focus:outline-none focus:border-brand h-24 resize-none" 
                        required 
                    />
                    <div className="flex items-center gap-4 justify-between">
                        <div className="flex items-center gap-2">
                            <label className="text-slate-400 text-sm">Your Rating:</label>
                            <input 
                                type="number" 
                                min="1" 
                                max="10" 
                                value={rating} 
                                onChange={e => setRating(Number(e.target.value))} 
                                className="p-1 rounded bg-slate-800 border border-slate-700 text-amber-400 w-16 text-center font-bold focus:outline-none" 
                                required
                            />
                            <span className="text-slate-500 text-sm">/ 10</span>
                        </div>
                        <button type="submit" className="bg-brand text-slate-950 px-5 py-2 rounded-lg font-bold hover:bg-opacity-90 transition">
                            Submit Review
                        </button>
                    </div>
                </form>
            ) : (
                /* Locked Prompt for Unauthenticated Visitors */
                <div className="mb-8 p-5 bg-slate-800/40 border border-dashed border-slate-700 rounded-xl text-center backdrop-blur-xs">
                    <p className="text-slate-400 mb-3 text-sm">
                        Join the CineFinder community! You must have an account to leave reviews or ratings.
                    </p>
                    <Link to="/auth" className="inline-block bg-brand text-slate-950 px-6 py-2 rounded-lg font-bold text-sm hover:bg-opacity-90 transition">
                        🔒 Log In / Create Account &rarr;
                    </Link>
                </div>
            )}

            {/* Active Feed Display (Always readable by everyone) */}
            <div className="flex flex-col gap-4 max-h-96 overflow-y-auto pr-2">
                {reviews.length === 0 ? (
                    <p className="text-slate-500 italic text-center py-4">No reviews posted yet. Be the first to drop one!</p>
                ) : (
                    reviews.map((rev) => (
                        <div key={rev._id} className="p-4 bg-slate-800 rounded-lg border border-slate-700 transition hover:border-slate-600">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-semibold text-brand text-sm">@{rev.username}</span>
                                <span className="text-amber-400 font-bold text-sm">⭐ {rev.rating}/10</span>
                            </div>
                            <p className="text-slate-300 text-sm leading-relaxed">{rev.reviewText}</p>
                            <span className="text-[10px] text-slate-500 block mt-2 text-right">
                                {new Date(rev.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default MovieReviews;