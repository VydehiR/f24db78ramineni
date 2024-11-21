var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Importing routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var sculpturesRouter = require('./routes/Sculptures'); // Import the Sculptures router for web pages
var gridRouter = require('./routes/grid');
var pickRouter = require('./routes/pick');
const resourceRouter = require('./routes/resource'); // Import the resource router for API endpoints
const Sculpture = require('./models/sculptures'); // Import the Sculpture model for seeding

var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.use('/', indexRouter); // Homepage route
app.use('/users', usersRouter); // Users route (API or page)
app.use('/sculptures', sculpturesRouter); // Sculptures route for web pages (List, Detail)
app.use('/grid', gridRouter); // Grid route for displaying items in a grid view
app.use('/pick', pickRouter); // Pick route (might be for selecting items)
app.use('/resource', resourceRouter); // API route for sculptures (CRUD API)

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404)); // Forward 404 errors to the error handler
});

// Error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // Show detailed error in development mode

  res.status(err.status || 500);
  res.render('error'); // Render error page
});

// MongoDB Connection Setup
require('dotenv').config();
const mongoose = require('mongoose');
const connectionString = process.env.MONGO_CON; // Mongo connection string from .env file

// Connect to MongoDB
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

// MongoDB connection event listeners
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connection to DB succeeded');
});

// Seed database if 'reseed' is true
let reseed = true;
if (reseed) {
  async function recreateDB() {
    // Clear the collection before seeding
    await Sculpture.deleteMany();

    // Create new sculpture documents with the correct fields
    const instance1 = new Sculpture({
      sculpture_name: "The Thinker",
      Sculptures_height: "182",
      Sculptures_material: "Bronze"
    });
    const instance2 = new Sculpture({
      sculpture_name: "Venus de Milo",
      Sculptures_height: "203",
      Sculptures_material: "Marble"
    });
    const instance3 = new Sculpture({
      sculpture_name: "David",
      Sculptures_height: "517",
      Sculptures_material: "Marble"
    });

    // Save the instances to the database
    await instance1.save();
    await instance2.save();
    await instance3.save();

    console.log("Database seeded with sculptures");
  }

  // Run the seed function
  recreateDB();
}

// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
