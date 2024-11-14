const mongoose = require('mongoose');

// Define the Sculpture Schema
const SculpturesSchema = new mongoose.Schema({
  sculpture_type: { type: String, required: true },
  size: { type: String, required: true },
  cost: { type: Number, required: true }
});
const results = [
    { Sculptures_name: "The Thinker", Sculptures_height: "182", Sculptures_material: "Bronze" },
    { Sculptures_name: "Venus de Milo", Sculptures_height: "203", Sculptures_material: "Marble" },
    { Sculptures_name: "David", Sculptures_height: "517", Sculptures_material: "Marble" }
  ];
// Export the model
module.exports = mongoose.model('sculptures', SculpturesSchema);
