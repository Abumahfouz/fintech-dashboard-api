const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes.js');
const {protect, authorizeRoles} = require('./middleware/authMiddleware');
const transactionRoutes = require('./routes/transactionRoutes');
const {errorHandler} = require('./middleware/errorHandler').default;
const profileRoutes = require('./routes/profileRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

//error handler middleware
app.use(errorHandler);

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Helmet middleware for security
app.use(helmet());


//configure cors middleware
app.use(cors({
    origin: '*', // client URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

//rate limiter middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

//serve static files
app.use(express.static('public'))

//protect routes and authorizeRoles middleware example
app.get('/api/test/admin-only', protect, authorizeRoles('admin'), (req, res) => {
    res.json({message: 'This is a protected route', user: req.user});
});

//mount routes
app.use('/api/auth', authRoutes);
app.use('/api/v1/transactions', protect, transactionRoutes);
app.use('/api/dashboard', protect, dashboardRoutes);
app.use('/api/profile/upload-profile', profileRoutes); // mount profile routes
app.use('/api/profile', uploadRoutes); // mount upload routes for image and video
app.use('/api/upload', express.static('uploads')); // serve uploaded files statically


module.exports = app;