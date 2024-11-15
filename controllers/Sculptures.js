const Sculpture = require('../models/sculptures');

// List of all Sculptures
exports.Sculptures_list = async function(req, res) {
  try {
    console.log("Fetching all sculptures...");
    const sculptures = await Sculpture.find();
    console.log("Fetched sculptures:", sculptures);
    res.json(sculptures);
  } catch (err) {
    console.error("Error fetching sculptures:", err);
    res.status(500).json({ error: err.message });
  }
};

// Render a view with a list of all sculptures
exports.Sculptures_list_view = async function(req, res) {
  try {
    const sculptures = await Sculpture.find();
    res.render('sculptures', { title: 'Sculptures Search Results', results: sculptures });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Get a specific Sculpture by ID
exports.Sculptures_detail = async function(req, res) {
  try {
    console.log("Fetching sculpture with ID:", req.params.id);
    const sculpture = await Sculpture.findById(req.params.id);
    if (!sculpture) {
      console.log("Sculpture not found with ID:", req.params.id);
      return res.status(404).json({ message: 'Sculpture not found' });
    }
    console.log("Fetched sculpture:", sculpture);
    res.json(sculpture);
  } catch (err) {
    console.error("Error fetching sculpture:", err);
    res.status(500).json({ error: err.message });
  }
};

// Create a new Sculpture
exports.Sculptures_create_post = async function(req, res) {
  try {
    console.log("Creating a new sculpture with data:", req.body);
    const sculpture = new Sculpture({
      sculpture_type: req.body.sculpture_type,
      size: req.body.size,
      cost: req.body.cost
    });

    const newSculpture = await sculpture.save();
    console.log("Created new sculpture:", newSculpture);
    res.status(201).json(newSculpture);
  } catch (err) {
    console.error("Error creating sculpture:", err);
    res.status(500).json({ error: err.message });
  }
};

// Delete a Sculpture by ID
exports.Sculptures_delete = async function(req, res) {
  try {
    console.log("Deleting sculpture with ID:", req.params.id);
    const sculpture = await Sculpture.findByIdAndDelete(req.params.id);
    if (!sculpture) {
      console.log("Sculpture not found with ID:", req.params.id);
      return res.status(404).json({ message: 'Sculpture not found' });
    }
    console.log("Deleted sculpture:", sculpture);
    res.status(200).json({ message: 'Sculpture deleted successfully' });
  } catch (err) {
    console.error("Error deleting sculpture:", err);
    res.status(500).json({ error: err.message });
  }
};

// Update a Sculpture by ID
exports.Sculptures_update_put = async function(req, res) {
  try {
    console.log("Updating sculpture with ID:", req.params.id);
    const sculpture = await Sculpture.findByIdAndUpdate(
      req.params.id,
      {
        sculpture_type: req.body.sculpture_type,
        size: req.body.size,
        cost: req.body.cost
      },
      { new: true }
    );

    if (!sculpture) {
      console.log("Sculpture not found with ID:", req.params.id);
      return res.status(404).json({ message: 'Sculpture not found' });
    }
    console.log("Updated sculpture:", sculpture);
    res.json(sculpture);
  } catch (err) {
    console.error("Error updating sculpture:", err);
    res.status(500).json({ error: err.message });
  }
};




