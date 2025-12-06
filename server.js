const app = require('./app');
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;
require('dotenv').config();


//connect to database
connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});