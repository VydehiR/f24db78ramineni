const Sculpture = require('../models/Sculptures');

// List all sculptures
exports.Sculpture_list = async function (req, res) {
  try {
    const sculptures = await Sculpture.find();
    res.send(sculptures);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// View all sculptures page
exports.Sculpture_view_all_Page = async function (req, res) {
  try {
    const sculptures = await Sculpture.find();
    res.render('Sculptures', { title: 'Sculpture Search Results', results: sculptures });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// Handle sculpture creation
exports.Sculpture_create_post = async function (req, res) {
  try {
    const { sculpture_name, sculpture_material, sculpture_height } = req.body;
    if (!sculpture_name || !sculpture_material || !sculpture_height) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const sculpture = new Sculpture({ sculpture_name, sculpture_material, sculpture_height });
    const result = await sculpture.save();
    res.status(201).json({ message: 'Sculpture created successfully', data: result });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create sculpture', details: err.message });
  }
};

// View one sculpture
exports.Sculpture_view_one_Page = async function (req, res) {
  try {
    const result = await Sculpture.findById(req.query.id);
    if (!result) throw new Error('Sculpture not found');
    res.render('Sculpturedetail', { title: 'Sculpture Detail', toShow: result });
  } catch (err) {
    res.status(404).send({ error: err.message });
  }
};

// Update sculpture
// Update sculpture
exports.Sculpture_update_put = async function (req, res) {
    try {
      const { id } = req.params; // Retrieve sculpture ID from URL
      if (!id) {
        return res.status(400).json({ error: 'Sculpture ID is missing' });
      }
  
      // Find the sculpture and update it
      const updatedSculpture = await Sculpture.findByIdAndUpdate(
        id,
        req.body, // Update with the body data
        { new: true, runValidators: true }
      );
  
      if (!updatedSculpture) {
        return res.status(404).json({ error: 'Sculpture not found' });
      }
  
      res.status(200).json({
        message: 'Sculpture updated successfully',
        data: updatedSculpture
      });
    } catch (err) {
      res.status(500).json({ error: 'Failed to update sculpture', details: err.message });
    }
  };
  
// Delete sculpture
exports.Sculpture_delete = async function (req, res) {
  try {
    const result = await Sculpture.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).send({ error: 'Sculpture not found' });
    res.status(200).send({ message: 'Sculpture deleted successfully' });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// Render create page
exports.Sculpture_create_Page = function (req, res) {
  res.render('Sculpturecreate', { title: 'Sculpture Create' });
};

// Render update page
exports.Sculpture_update_Page = async function (req, res) {
  try {
    const result = await Sculpture.findById(req.query.id);
    if (!result) throw new Error('Sculpture not found');
    res.render('Sculptureupdate', { title: 'Sculpture Update', toShow: result });
  } catch (err) {
    res.status(404).send({ error: err.message });
  }
};

// Render delete page
exports.Sculpture_delete_Page = async function (req, res) {
  try {
    const result = await Sculpture.findById(req.query.id);
    if (!result) throw new Error('Sculpture not found');
    res.render('Sculpturedelete', { title: 'Sculpture Delete', toShow: result });
  } catch (err) {
    res.status(404).send({ error: err.message });
  }
};
