// controllers/sculpture.js
const Gadget = require('../models/sculptures');

// List all sculpture
exports.sculpture_list = async (req, res) => {
  try {
    const Sculptures = await sculpture.find();
    res.status(200).json(Sculptures);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch Sculptures'});
  }
};

// Get a specific sculpture by ID
exports.sculpture_detail = function(req, res) {
    sculpture.findById(req.params.id, function(err, Sculptures) {
    if (err || !Sculptures) return res.status(404).json({ message: "Sculpture not found"});
    res.status(200).json(Sculptures);
  });
};

// Create a new sculpture
exports.Sculptures_create_post = async (req, res) => {
  const newSculpture = new Sculptures({
    Sculptures_name: req.body.Sculptures_name,
    price: req.body.price,
    functionality: req.body.functionality
  });
  try {
    await newsculpture.save();
    res.status(201).json({ message: 'Sculpture created successfully', Sculptures: newsculpture });
  } catch (err) {
    res.status(400).json({ message: 'Failed to create Sculpture', error: err.message });
  }
};

// Delete a sculpture by ID
exports.sculpture_delete = function(req, res) {
    sculpture.findByIdAndDelete(req.params.id, function(err) {
    if (err) return res.status(500).json({ message: "Error deleting Sculpture" });
    res.status(204).send();
  });
};

// Update a sculpture by ID
exports.sculpture_update_put = function(req, res) {
    sculpture.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, updatedsculpture) {
    if (err) return res.status(500).json({ message: "Error updating Sculpture" });
    res.status(200).json(updatesculpture);
  });
};