var Sculpture = require('../models/sculptures');

// List of all Sculptures
exports.Sculptures_list = async function(req, res) {
  try {
    // Fetch all sculptures from the database
    console.log("Fetching all sculptures...");
    const sculptures = await Sculpture.find();  // .find() retrieves all documents in the sculptures collection
    console.log("Fetched sculptures:", sculptures);
    res.json(sculptures);  // Send the list of sculptures as a JSON response
  } catch (err) {
    console.error("Error fetching sculptures:", err);
    res.status(500).json({ error: err.message });  // Handle any errors
  }
};

// For a specific Sculpture
exports.Sculptures_detail = async function(req, res) {
  try {
    console.log("Fetching sculpture with ID:", req.params.id);
    const sculpture = await Sculpture.findById(req.params.id); // Find a sculpture by its ID
    if (!sculpture) {
      console.log("Sculpture not found with ID:", req.params.id);
      return res.status(404).json({ message: 'Sculpture not found' });  // If sculpture is not found
    }
    console.log("Fetched sculpture:", sculpture);
    res.json(sculpture);  // Send the sculpture data as JSON
  } catch (err) {
    console.error("Error fetching sculpture:", err);
    res.status(500).json({ error: err.message });
  }
};

// Handle Sculpture create on POST
exports.Sculptures_create_post = async function(req, res) {
  try {
    console.log("Creating a new sculpture with data:", req.body);
    const sculpture = new Sculpture({
      sculpture_type: req.body.sculpture_type,
      size: req.body.size,
      cost: req.body.cost
    });

    const newSculpture = await sculpture.save();  // Save the sculpture to the database
    console.log("Created new sculpture:", newSculpture);
    res.status(201).json(newSculpture);  // Return the created sculpture with a status code of 201
  } catch (err) {
    console.error("Error creating sculpture:", err);
    res.status(500).json({ error: err.message });
  }
};

// Handle Sculpture delete on DELETE
exports.Sculptures_delete = async function(req, res) {
  try {
    console.log("Deleting sculpture with ID:", req.params.id);
    const sculpture = await Sculpture.findByIdAndDelete(req.params.id);  // Delete the sculpture by its ID
    if (!sculpture) {
      console.log("Sculpture not found with ID:", req.params.id);
      return res.status(404).json({ message: 'Sculpture not found' });
    }
    console.log("Deleted sculpture:", sculpture);
    res.status(200).json({ message: 'Sculpture deleted successfully' });  // Return success message
  } catch (err) {
    console.error("Error deleting sculpture:", err);
    res.status(500).json({ error: err.message });
  }
};

// Handle Sculpture update on PUT
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
      { new: true } // Return the updated sculpture
    );

    if (!sculpture) {
      console.log("Sculpture not found with ID:", req.params.id);
      return res.status(404).json({ message: 'Sculpture not found' });
    }
    console.log("Updated sculpture:", sculpture);
    res.json(sculpture);  // Return the updated sculpture as JSON
  } catch (err) {
    console.error("Error updating sculpture:", err);
    res.status(500).json({ error: err.message });
  }
};
