var Sculpture = require('../models/sculptures');
 
// List of all Sculptures
exports.Sculptures_list = async function (req, res) {
  try {
    console.log("Fetching all sculptures...");
    const sculptures = await Sculpture.find();
    res.setHeader('Content-Type', 'application/json');
    res.json(sculptures);
  } catch (err) {
    console.error("Error fetching sculptures:", err);
    res.status(500).json({ error: err.message });
  }
};
 
exports.Sculptures_detail = async function(req, res) {
  console.log("detail" + req.params.id); // Log the ID to verify
  try {
      // Use findById to fetch the sculptures by ID from the database
      let result = await Sculpture.findById(req.params.id);
      res.send(result); // Send the sculptures details as JSON
  } catch (error) {
      res.status(500); // Send an error status if not found
      res.send(`{"error": "Document for id ${req.params.id} not found"}`);
  }
};
 
 
exports.Sculptures_view_all_Page = async function(req, res) {
  try {
      const thesculpturess = await Sculpture.find();
      res.render('sculptures', { title: 'sculptures Search Results', results: thesculpturess });
  } catch (err) {
      res.status(500);
      res.send(`{"error": ${err}}`);
  }
};
 
// Get a specific Sculpture by ID
// exports.Sculpture_view_one_Page = async function (req, res) {
//   try {
//     const sculpture = await Sculpture.findById(req.params.id);  // Use req.params.id to get the sculpture by ID
//     if (!sculpture) {
//       return res.status(404).json({ message: `Sculpture with ID ${req.params.id} not found` });
//     }
//     // Render the view and pass the sculpture details
//     res.render('sculpturedetail', { title: 'Sculpture Detail', sculpture: sculpture });
//   } catch (err) {
//     res.status(500).json({ error: `Error fetching sculpture: ${err.message}` });
//   }
// };
 
 
// Get a specific Sculpture by ID
exports.Sculpture_view_one_Page = async function (req, res) {
  try {
    const sculpture = await Sculpture.findById(req.params.id);  // Use req.params.id to get the sculpture by ID
    if (!sculpture) {
      return res.status(404).json({ message: `Sculpture with ID ${req.params.id} not found` });
    }
    // Render the view and pass the sculpture details
    res.render('sculpturedetail', { title: 'Sculpture Detail', toShow: sculpture });
  } catch (err) {
    res.status(500).json({ error: `Error fetching sculpture: ${err.message}` });
  }
};
 
// exports.Sculpture_view_one_Page = async function (req, res) {
//   const sculptureId = req.query.id; // Fetch the ID from query parameters
//   if (!sculptureId) {
//     return res.status(400).json({ message: "ID is required" });
//   }
//   try {
//     const sculpture = await Sculpture.findById(sculptureId);
//     if (!sculpture) {
//       return res.status(404).json({ message: `Sculpture with ID ${sculptureId} not found` });
//     }
//     // Render the view and pass the sculpture details
//     res.render('sculpturedetail', { title: 'Sculpture Detail', sculpture: sculpture });
//   } catch (err) {
//     res.status(500).json({ error: `Error fetching sculpture: ${err.message}` });
//   }
// };
 
 
// Create a new Sculpture
exports.Sculptures_create_post = async function (req, res) {
  try {
    const { sculpture_name, Sculptures_height, Sculptures_material } = req.body;
    if (!sculpture_name || !Sculptures_height || !Sculptures_material) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const sculpture = new Sculpture({
      sculpture_name,
      Sculptures_height,
      Sculptures_material,
    });
    const newSculpture = await sculpture.save();
    res.status(201).json(newSculpture);
  } catch (err) {
    res.status(500).json({ error: `Error creating sculpture: ${err.message}` });
  }
};
 
// Update a Sculpture
exports.Sculptures_update_put = async function (req, res) {
  try {
    let sculpture = await Sculpture.findById(req.params.id);
    if (!sculpture) {
      return res.status(404).json({ message: `Sculpture with ID ${req.params.id} not found` });
    }
 
    if (req.body.sculpture_name) sculpture.sculpture_name = req.body.sculpture_name;
    if (req.body.Sculptures_height) sculpture.Sculptures_height = req.body.Sculptures_height;
    if (req.body.Sculptures_material) sculpture.Sculptures_material = req.body.Sculptures_material;
 
    const updatedSculpture = await sculpture.save();
    res.json(updatedSculpture);
  } catch (err) {
    res.status(500).json({ error: `Error updating sculpture: ${err.message}` });
  }
};
 
// Delete a Sculpture
exports.Sculptures_delete = async function (req, res) {
  try {
    const sculpture = await Sculpture.findByIdAndDelete(req.params.id);
    if (!sculpture) {
      return res.status(404).send({ message: `Sculpture with ID ${req.params.id} not found` });
    }
    res.json(sculpture);
  } catch (err) {
    res.status(500).send({ error: `Error deleting sculpture: ${err.message}` });
  }
};
 
 // Handle a show-one view with ID specified by query
exports.Sculpture_view_one_Page = async function (req, res) {
  console.log("Single view for ID: " + req.query.id);
  try {
    const result = await Sculpture.findById(req.query.id);
    if (!result) {
      return res.status(404).send(`{'error': 'Sculpture with ID ${req.query.id} not found'}`);
    }
    res.render('srr11rrculpturedetail', {
      title: 'Sculpture Detail',
      toShow: result,
    });
  } catch (err) {
    res.status(500);
    res.send(`{'error': '${err}'}`);
  }
};
