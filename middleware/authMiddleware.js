const jwt = require('jsonwebtoken');
require('dotenv').config();
const protect = async (req, res, next) => {
    const token = await req.headers.cookie || '';
    const tokenParts = token.split('token=');
    const tokenValue = tokenParts.length > 1 ? tokenParts[1].split(';')[0] : null;
    if (!tokenValue) {
        return res.status(401).json({message: 'No token, authorization denied'});
    }
    try {
        const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({message: 'Token is not valid'});
    }
};

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({message: 'Access denied: insufficient permissions'});
        }
        next();
    };
};
module.exports = {protect, authorizeRoles};