var Sculpture = require('../models/sculptures');

// List of all Sculptures (for webpage rendering)
exports.Sculptures_list = async function(req, res) {
  try {
    console.log("Fetching all sculptures...");
    const sculptures = await Sculpture.find();  // .find() retrieves all documents in the sculptures collection
    console.log("Fetched sculptures:", sculptures);

    // Explicitly set the Content-Type header to JSON
    res.setHeader('Content-Type', 'application/json');
    res.json(sculptures);  // Return the list of sculptures as JSON
  } catch (err) {
    console.error("Error fetching sculptures:", err);
    res.status(500).json({ error: err.message });
  }
};

// For a specific Sculpture (GET one sculpture by ID)
exports.Sculptures_detail = async function(req, res) {
  try {
    const sculptureId = req.params.id; // Access the ID from params
    console.log("Fetching sculpture with ID:", sculptureId);

    // Fetch the sculpture by its ID
    const sculpture = await Sculpture.findById(sculptureId); 
    
    if (!sculpture) {
      console.log(`Sculpture not found with ID: ${sculptureId}`);
      return res.status(404).json({ message: `Sculpture with ID ${sculptureId} not found` });
    }

    console.log("Fetched sculpture:", sculpture);
    
    // Explicitly set the Content-Type header to JSON
    res.setHeader('Content-Type', 'application/json');
    res.json(sculpture);  // Send the sculpture data as JSON (API response)
  } catch (err) {
    console.error("Error fetching sculpture:", err);
    res.status(500).json({ error: `Error fetching sculpture with ID ${req.params.id}: ${err.message}` });
  }
};

// Handle Sculpture create on POST (for API)
exports.Sculptures_create_post = async function(req, res) {
  try {
    console.log("Creating a new sculpture with data:", req.body);

    // Check if all required fields are provided
    const { sculpture_name, Sculptures_height, Sculptures_material } = req.body;
    if (!sculpture_name || !Sculptures_height || !Sculptures_material) {
      return res.status(400).json({ message: "All fields are required: sculpture_name, Sculptures_height, Sculptures_material." });
    }

    // Create a new sculpture instance
    const sculpture = new Sculpture({
      sculpture_name,
      Sculptures_height,
      Sculptures_material
    });

    // Save the sculpture to the database
    const newSculpture = await sculpture.save();
    console.log("Created new sculpture:", newSculpture);

    // Return the created sculpture as a JSON response with HTTP 201 status
    res.status(201).json(newSculpture);
  } catch (err) {
    console.error("Error creating sculpture:", err);
    res.status(500).json({ error: err.message });
  }
};

// Handle Sculpture delete on DELETE (for API)
exports.Sculptures_delete = async function(req, res) {
  try {
    const sculptureId = req.params.id;
    console.log("Deleting sculpture with ID:", sculptureId);
    
    // Delete the sculpture by its ID
    const sculpture = await Sculpture.findByIdAndDelete(sculptureId);  
    
    if (!sculpture) {
      console.log(`Sculpture with ID ${sculptureId} not found`);
      return res.status(404).json({ message: `Sculpture with ID ${sculptureId} not found` });
    }

    console.log("Deleted sculpture:", sculpture);
    
    // Explicitly set the Content-Type header to JSON
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ message: 'Sculpture deleted successfully' });
  } catch (err) {
    console.error("Error deleting sculpture:", err);
    res.status(500).json({ error: `Error deleting sculpture: ${err.message}` });
  }
};

// Handle Sculpture update on PUT (for API)
exports.Sculptures_update_put = async function(req, res) {
  try {
    const sculptureId = req.params.id;
    console.log("Updating sculpture with ID:", sculptureId);

    // Update the sculpture with new data
    const sculpture = await Sculpture.findByIdAndUpdate(
      sculptureId,
      {
        sculpture_name: req.body.sculpture_name,
        Sculptures_height: req.body.Sculptures_height,
        Sculptures_material: req.body.Sculptures_material
      },
      { new: true }
    );

    if (!sculpture) {
      console.log(`Sculpture with ID ${sculptureId} not found`);
      return res.status(404).json({ message: `Sculpture with ID ${sculptureId} not found` });
    }

    console.log("Updated sculpture:", sculpture);
    
    // Explicitly set the Content-Type header to JSON
    res.setHeader('Content-Type', 'application/json');
    res.json(sculpture);  // Return the updated sculpture
  } catch (err) {
    console.error("Error updating sculpture:", err);
    res.status(500).json({ error: `Error updating sculpture: ${err.message}` });
  }
};
