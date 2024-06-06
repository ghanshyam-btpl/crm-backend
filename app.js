const express = require('express');
const connectDB = require('./config/db');
const config = require('./config/config');
const userRoutes = require('./routes/userRoutes');
const logger = require('./utils/logger');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use(logger);

// Routes
app.use('/api', userRoutes);

// Error handling middleware (optional)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error' });
});

// Start server
const PORT = config.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
