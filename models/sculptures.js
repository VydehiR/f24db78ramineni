
// models/sculptures.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sculptureSchema = new Schema({
  sculpture_name: { 
    type: String, 
    required: true, 
    minlength: [3, 'Site name must be at least 3 characters long'], 
    maxlength: [100, 'Site name cannot exceed 100 characters']
  },
  sculpture_material: { 
    type: String, 
    required: [true, 'Origin is required'],
    minlength: [3, 'Origin must be at least 3 characters long'],
    maxlength: [50, 'Origin cannot exceed 50 characters'],
    trim: true, // Optional: Removes extra spaces
  },
  sculpture_height: { 
    type: Number, 
    required: true,
    min: [100, 'Minimum age must be 100 years']
  },
});


const sculpture = mongoose.model('sculpture', sculptureSchema);
module.exports = sculpture;