const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const authMiddleware = require('./middlewares/authMiddleware');
const routes = require('./routes/index');
const sequelize = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(cors({
    origin: '*', // Allow only your frontend
    credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(authMiddleware);


// Routes
app.use('/api', routes);

// Error handling middleware
app.use(errorHandler);

// Database synchronization
sequelize.sync()
    .then(() => {
        console.log('Database synchronized successfully.');
    })
    .catch(err => {
        console.error('Error synchronizing the database:', err);
    });

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
