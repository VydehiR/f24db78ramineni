const mongoose = require("mongoose");

const sculptureSchema = mongoose.Schema({
  name: String,
  year: Number,
  artist: String
});

module.exports = mongoose.model("Sculpture", sculptureSchema);
