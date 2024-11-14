const mongoose = require('mongoose');

// Define the Sculpture Schema
const SculpturesSchema = new mongoose.Schema({
  sculpture_type: { type: String, required: true },
  size: { type: String, required: true },
  cost: { type: Number, required: true }
});

// Export the model
module.exports = mongoose.model('sculptures', SculpturesSchema);
