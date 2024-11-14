const mongoose = require('mongoose');
const SculpturesSchema = mongoose.Schema({
  sculpture_type: String,
  size: String,
  cost: Number
});

module.exports = mongoose.model('sculptures', SculpturesSchema);
