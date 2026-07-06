const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Helper Utility: Generates a signed JWT access card token string
const generateToken = (userId) => {
    return jwt.sign(
        { id: userId }, 
        process.env.JWT_SECRET || 'fallback_secret', 
        { expiresIn: '24h' }
    );
};

// @desc    Register a new user & auto-login
// @route   POST /api/auth/signup
const signupUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // 1. Check if user already exists in the system cluster
        const userExists = await User.findOne({ $or: [{ email }, { username }] });
        if (userExists) {
            return res.status(400).json({ message: "Username or Email already registered." });
        }

        // 2. Encrypt/Hash the incoming raw password string safely
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Instantiate and persist the user inside MongoDB Atlas tables
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        // 4. NEW: Issue a JWT token immediately so they don't have to log in manually!
        const token = generateToken(newUser._id);

        // Return token AND data structure so localStorage populates immediately
        res.status(201).json({ 
            message: "User account generated successfully!",
            token,
            user: { 
                id: newUser._id, 
                username: newUser.username, 
                email: newUser.email 
            } 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// @desc    Authenticate user & retrieve session token
// @route   POST /api/auth/login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // 1. Locate user document by email index
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid system credentials." });
        }

        // 2. Verify encrypted string match
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid system credentials." });
        }

        // 3. Issue signed JWT cryptographic identity card token
        const token = generateToken(user._id);

        // Match payload keys perfectly with frontend localStorage requirements
        res.json({ 
            token, 
            user: { 
                id: user._id, 
                username: user.username, 
                email: user.email 
            } 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { signupUser, loginUser };