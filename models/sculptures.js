
// models/Sculptures.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SculpturesSchema = new mongoose.Schema({
  sculpture_name: { type: String, required: true },
  Sculptures_material: { type: String, required: true },
  Sculptures_height: { type: String, required: true }
});

const Sculpture = mongoose.model('Sculpture', SculptureSchema);
module.exports = Sculpture;
