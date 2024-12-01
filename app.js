// Load environment variables
require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const createError = require('http-errors');

// Import models
const Sculpture = require('./models/Sculptures');

// Import routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const gridRouter = require('./routes/grid');
const sculpturesRouter = require('./routes/Sculptures');
const pickRouter = require('./routes/pick');
const resourceRouter = require('./routes/resource');

// Initialize Express app
const app = express();

// MongoDB connection setup
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://vydehi:Vydehi123@cluster0.f2j9o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose
  .connect(mongoURI, {
    serverSelectionTimeoutMS: 10000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => {
    console.error('❌ Database connection error:', err.message);
    process.exit(1);
  });

// Middleware setup
app.use(logger('dev')); // HTTP request logger
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method')); // For supporting PUT and DELETE methods

// Set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Log HTTP method and URL
app.use((req, res, next) => {
  console.log(`📥 Incoming Request: ${req.method} ${req.url}`);
  next();
});

// Mount routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/grid', gridRouter);
app.use('/Sculptures', sculpturesRouter);
app.use('/pick', pickRouter);
app.use('/resource', resourceRouter);

// Handle 404 errors
app.use((req, res, next) => {
  next(createError(404, `Route not found: ${req.method} ${req.url}`));
});

// Centralized error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.error(`❌ Error: ${err.message}`);
  res.status(status).render('error', { title: 'Error', error: err });
});

// Database seeding in development mode (optional)
if (process.env.RESEED_DB === 'true') {
  (async () => {
    try {
      await Sculpture.deleteMany();
      const sculptures = [
        { sculpture_name: "The Winged Victory of Samothrace", sculpture_height: 245, sculpture_material: "Marble" },
        { sculpture_name: "David", sculpture_height: 517, sculpture_material: "Marble" },
        { sculpture_name: "Bust of Nefertiti", sculpture_height: 48, sculpture_material: "Limestone" },
      ];
      await Sculpture.insertMany(sculptures);
      console.log('🌱 Database seeded successfully');
    } catch (err) {
      console.error('❌ Error during database seeding:', err.message);
    }
  })();
}

// Graceful shutdown handlers
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('🛑 MongoDB connection closed due to app termination (SIGINT)');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  mongoose.connection.close(() => {
    console.log('🛑 MongoDB connection closed due to app termination (SIGTERM)');
    process.exit(0);
  });
});

// Export the app instance
module.exports = app;
