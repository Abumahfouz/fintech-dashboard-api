const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Registration controller
// @route   POST /api/auth/register
// @desc    Register a new user and return JWT token
const register = async (req, res) => {
    const {email, username, password, role} = req.body;
    try {
    if (!email || !username || !password) {
        return res.status(400).json({message: 'Please provide all required fields'});
    }
    const existingUser = await User.findOne({email});
    if (existingUser) {
        return res.status(400).json({message: 'User with this email already exists'});
    }
    const user = new User({email, username, password, role});

    await user.save();
    //generate token
    const token = jwt.sign(
        {userId: user._id, role: user.role},
        process.env.JWT_SECRET,
        {expiresIn: '1h'}
    );

    // store token in cookies for best security practice
    res.cookie('token', token, {httpOnly: true, secure: true});

    // Successful registration
    res.status(201).json({message: 'User registered successfully'});

    } 
    catch (error) {
        res.status(500).json({message: 'Server error', error: error.message});
    }
}

// login controller
// @route   POST /api/auth/login
// @desc    Login user and return JWT token
const login = async (req, res) => {
    const {email, password} = req.body;
    const role = req.body.role || 'user';
    const acceptedRoles = User.schema.path('role').enumValues;
    try {
    if (!email || !password) {
        return res.status(400).json({message: 'Please provide email and password'});
    }
    const user = await User.findOne({email, role});
    if (!user) {
        return res.status(400).json({message: 'Invalid email or password'});
    }
    if (!acceptedRoles.includes(role)) {
        return res.status(400).json({message: 'Invalid role specified'});
    }
    const isMatch = await user.passwordMatch(password);
    if (!isMatch) {
        return res.status(400).json({message: 'Invalid email or password'});
    }
    //generate token
    const token = jwt.sign(
        {userId: user._id, role: user.role},
        process.env.JWT_SECRET,
        {expiresIn: '1h'}
    );
    // store token in cookies for best security practice
    res.cookie('token', token, {httpOnly: true, secure: true});

    // Successful login
    res.status(200).json({message: 'Login successful'});

    }
    catch (error) {
        res.status(500).json({message: 'Server error', error: error.message});
    }
}

module.exports = {register, login};

