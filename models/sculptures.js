const mongoose = require('mongoose');

const SculpturesSchema = new mongoose.Schema({
  sculpture_name: { type: String, required: true },
  sculpture_material: { type: String, required: true },
  sculpture_height: { type: Number, required: true, min: 1 },
});

module.exports = mongoose.model('Sculpture', SculpturesSchema);
