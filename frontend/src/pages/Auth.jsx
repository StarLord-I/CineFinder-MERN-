import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Added Link for Forgot Password path

function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
        
        try {
            const response = await fetch(`http://localhost:5001${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();

            if (!response.ok) throw new Error(data.message || 'Authentication failed');

            // ✅ STRATEGIC UPDATE: Both Login and Signup now receive tokens from the backend!
            if (data.token && data.user) {
                // 1. Save secure session authorization string
                localStorage.setItem('token', data.token);
                
                // 2. FIXED: Save complete user data object as a string so Profile.jsx can parse it cleanly
                localStorage.setItem('user', JSON.stringify(data.user));
                
                // 3. Redirect and force layout state evaluation
                navigate('/profile'); // Send them directly to their brand new profile page!
                window.location.reload(); 
            } else {
                // Fallback state control layout
                setMessage("Account created successfully! Switching to sign in...");
                setIsLogin(true);
            }
        } catch (err) {
            setMessage(err.message);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 bg-dark">
            <div className="max-w-md w-full p-8 bg-gray-900 rounded-2xl text-white border border-gray-800 shadow-2xl">
                <h2 className="text-3xl font-black mb-6 text-brand text-center tracking-tight">
                    {isLogin ? 'Welcome Back' : 'Join CineFinder'}
                </h2>
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {!isLogin && (
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Username</label>
                            <input 
                                type="text" 
                                placeholder="Enter a unique handle" 
                                className="p-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-brand transition"
                                onChange={e => setFormData({...formData, username: e.target.value})} 
                                required 
                            />
                        </div>
                    )}
                    
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
                        <input 
                            type="email" 
                            placeholder="you@example.com" 
                            className="p-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-brand transition"
                            onChange={e => setFormData({...formData, email: e.target.value})} 
                            required 
                        />
                    </div>
                    
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Password</label>
                        <input 
                            type="password" 
                            placeholder="••••••••" 
                            className="p-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-brand transition"
                            onChange={e => setFormData({...formData, password: e.target.value})} 
                            required 
                        />
                    </div>

                    {/* 🔑 FEATURE ADDITION: Dynamic Forgot Password anchor entry link */}
                    {isLogin && (
                        <div className="text-right">
                            <Link to="/forgot-password" className="text-xs text-gray-500 hover:text-brand transition duration-200">
                                Forgot Password?
                            </Link>
                        </div>
                    )}

                    <button type="submit" className="bg-brand text-dark p-3 rounded-xl font-bold hover:bg-yellow-500 transition duration-200 mt-2 shadow-lg">
                        {isLogin ? 'Sign In Master' : 'Create Account'}
                    </button>
                </form>

                <p className="mt-6 text-sm text-gray-400 cursor-pointer text-center hover:text-white transition duration-200" onClick={() => { setIsLogin(!isLogin); setMessage(''); }}>
                    {isLogin ? "New to the platform? Create an account here" : "Already registered? Sign in instead"}
                </p>
                
                {message && (
                    <p className={`mt-4 text-center font-bold text-sm p-3 rounded-xl ${message.includes('successfully') ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}

export default Auth;