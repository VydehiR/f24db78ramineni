var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config(); // Load environment variables from .env file

// Routes imports
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var gridRouter = require('./routes/grid');
var sculpturesRouter = require('./routes/Sculptures'); // Fixed naming convention
var pickRouter = require('./routes/pick');
var resourceRouter = require('./routes/resource');

// MongoDB imports
const mongoose = require('mongoose');
const Sculpture = require('./models/Sculptures');

// MongoDB connection setup
mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://vydehi:Vydehi123@cluster0.f2j9o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  serverSelectionTimeoutMS: 10000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => {
    console.error('Database connection error:', err);
    process.exit(1); // Exit process if DB connection fails
  });

// Initialize Express app
var app = express();

// Middleware setup
app.use(logger('dev'));
app.use(express.json()); // Add body parser middleware to handle JSON payload
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// View engine setup (pug)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware to log HTTP method and URL
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Method-override for handling HTTP verbs in forms
var methodOverride = require('method-override');
app.use(methodOverride('_method'));

// Routes setup
app.use('/', indexRouter); // Home route
app.use('/users', usersRouter); // User route
app.use('/grid', gridRouter); // Route for /grid
app.use('/Sculptures', sculpturesRouter); // Route for /sculptures
app.use('/pick', pickRouter); // Route for /pick
app.use('/resource', resourceRouter); // API for resource routes

// Error handler for 404
app.use(function (req, res, next) {
  next(createError(404));
});

// General error handler
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Database reseeding logic (only for development)
if (process.env.RESEED_DB === 'true') { // Use environment variable to control reseeding
  async function recreateDB() {
    try {
      // Clear existing data
      await Sculpture.deleteMany();

      // Sample data for sculptures
      const sculptures = [
        { sculpture_name: "The Winged Victory of Samothrace", sculpture_height: 245, sculpture_material: "Marble" },
        { sculpture_name: "David", sculpture_height: 517, sculpture_material: "Marble" },
        { sculpture_name: "Bust of Nefertiti", sculpture_height: 48, sculpture_material: "Limestone" },
      ];

      // Insert sample sculptures into the database
      await Sculpture.insertMany(sculptures);
      console.log("Database seeded with sculptures!");
    } catch (err) {
      console.error(`Error during database seeding: ${err.message}`);
    }
  }
  recreateDB();
}

// MongoDB connection event handlers
mongoose.connection.on('connected', () => {
  console.log('MongoDB connection established successfully');
});

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

// Handle app shutdown gracefully
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose connection closed due to app termination');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose connection closed due to app termination');
    process.exit(0);
  });
});

module.exports = app;
