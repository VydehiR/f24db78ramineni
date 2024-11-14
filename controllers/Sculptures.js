// controllers/Sculptures.js
const Sculpture = require('../sculptures');

// List all Sculptures
exports.Sculpture_list = async (req, res) => {
  try {
    const Sculptures = await Sculptures.find();
    res.status(200).json(Sculptures);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch Sculptures' });
  }
};

// Get a specific Sculptures by ID
exports.Sculptures_detail = function(req, res) {
    sculptures.findById(req.params.id, function(err, Sculptures) {
    if (err || !Sculptures) return res.status(404).json({ message: "Sculpture not found" });
    res.status(200).json(Sculptures);
  });
};

// Create a new Sculptures
exports.Sculptures_create_post = async (req, res) => {
  const newSculpture = new Sculptures({
    Sculptures_name: req.body.Sculptures_name,
    price: req.body.price,
    functionality: req.body.functionality
  });
  try {
    await newSculpture.save();
    res.status(201).json({ message: 'Sculpture created successfully', Sculptures: newSculpture });
  } catch (err) {
    res.status(400).json({ message: 'Failed to create Sculpture', error: err.message });
  }
};

// Delete a Sculpture by ID
exports.Sculpture_delete = function(req, res) {
    Sculpture.findByIdAndDelete(req.params.id, function(err) {
    if (err) return res.status(500).json({ message: "Error deleting Sculpture" });
    res.status(204).send();
  });
};

// Update a Sculpture by ID
exports.Sculpture_update_put = function(req, res) {
    Sculpture.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, updatedSculpture) {
    if (err) return res.status(500).json({ message: "Error updating Sculpture" });
    res.status(200).json(updatedSculpture);
  });
};