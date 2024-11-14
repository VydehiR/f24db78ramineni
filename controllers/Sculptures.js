var Sculpture = require('../models/sculptures');

// List of all Sculptures
exports.Sculptures_list = async function(req, res) {
  try {
    // Fetch all sculptures from the database
    const sculptures = await Sculpture.find();  // .find() retrieves all documents in the sculptures collection
    res.json(sculptures);  // Send the list of sculptures as a JSON response
  } catch (err) {
    res.status(500).json({ error: err.message });  // Handle any errors
  }
};

// For a specific Sculpture
exports.Sculptures_detail = async function(req, res) {
  try {
    const sculpture = await Sculpture.findById(req.params.id); // Find a sculpture by its ID
    if (!sculpture) {
      return res.status(404).json({ message: 'Sculpture not found' });  // If sculpture is not found
    }
    res.json(sculpture);  // Send the sculpture data as JSON
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Handle Sculpture create on POST
exports.Sculptures_create_post = async function(req, res) {
  try {
    const sculpture = new Sculpture({
      sculpture_type: req.body.sculpture_type,
      size: req.body.size,
      cost: req.body.cost
    });

    const newSculpture = await sculpture.save();  // Save the sculpture to the database
    res.status(201).json(newSculpture);  // Return the created sculpture with a status code of 201
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Handle Sculpture delete on DELETE
exports.Sculptures_delete = async function(req, res) {
  try {
    const sculpture = await Sculpture.findByIdAndDelete(req.params.id);  // Delete the sculpture by its ID
    if (!sculpture) {
      return res.status(404).json({ message: 'Sculpture not found' });
    }
    res.status(200).json({ message: 'Sculpture deleted successfully' });  // Return success message
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Handle Sculpture update on PUT
exports.Sculptures_update_put = async function(req, res) {
  try {
    const sculpture = await Sculpture.findByIdAndUpdate(
      req.params.id,
      {
        sculpture_type: req.body.sculpture_type,
        size: req.body.size,
        cost: req.body.cost
      },
      { new: true } // Return the updated sculpture
    );

    if (!sculpture) {
      return res.status(404).json({ message: 'Sculpture not found' });
    }
    res.json(sculpture);  // Return the updated sculpture as JSON
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
