var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var sculpturesRouter = require('./routes/sculptures'); // Import the Sculptures router
var gridRouter = require('./routes/grid');
var pickRouter = require('./routes/pick');
const resourceRouter = require('./routes/resource'); // Import the resource router for API endpoints

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/sculptures', sculpturesRouter); // Add route for Sculptures
app.use('/grid', gridRouter);
app.use('/pick', pickRouter);
app.use('/resource', resourceRouter); // Add route for the /resource API endpoints

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

// Setup MongoDB connection using the connection string from the environment variables
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

module.exports = app;
