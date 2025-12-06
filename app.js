const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middleware/authMiddleware');

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Helmet middleware for security
app.use(helmet());

// cors middleware
app.use(cors());

//rate limiter middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

//protect routes and authorizeRoles middleware example
app.get('/api/test/admin-only', authMiddleware.protect, authMiddleware.authorizeRoles('admin'), (req, res) => {
    res.json({message: 'This is a protected route', user: req.user});
});

//mount routes
app.use('/api/auth', authRoutes);

module.exports = app;