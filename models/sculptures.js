const mongoose = require('mongoose');

// Define the Sculpture Schema
const SculpturesSchema = new mongoose.Schema({
  sculpture_name: { type: String, required: true },
  Sculptures_height: { type: String, required: true },
  Sculptures_material: { type: String, required: true }
});

// Export the model
module.exports = mongoose.model('sculptures', SculpturesSchema);
