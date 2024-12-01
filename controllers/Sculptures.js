const Sculpture = require('../models/Sculptures');

// List all sculptures
exports.Sculpture_list = async (req, res) => {
  try {
    const sculptures = await Sculpture.find();
    res.json(sculptures);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// View one sculpture by ID
exports.Sculpture_view_one_Page = async function (req, res) {
  const sculptureId = req.query.id; // Retrieve ID from query parameters
  console.log(`Fetching details for sculpture with ID: ${sculptureId}`);
  try {
    if (!sculptureId) {
      return res.status(400).send({ error: 'ID is required to fetch sculpture details' });
    }
    const result = await Sculpture.findById(sculptureId);
    if (!result) {
      console.error(`Sculpture not found for ID: ${sculptureId}`);
      return res.status(404).send({ error: 'Sculpture not found' });
    }
    res.render('Sculpturedetail', { title: 'Sculpture Detail', toShow: result });
  } catch (err) {
    console.error(`Error fetching sculpture: ${err.message}`);
    res.status(500).send({ error: 'Error fetching sculpture', details: err.message });
  }
};


// Create new sculpture
exports.Sculpture_create_post = async (req, res) => {
  try {
    const { sculpture_name, sculpture_material, sculpture_height } = req.body;
    if (!sculpture_name || !sculpture_material || !sculpture_height) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const sculpture = new Sculpture({ sculpture_name, sculpture_material, sculpture_height });
    const result = await sculpture.save();
    res.status(201).json({ message: 'Sculpture created successfully', data: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update sculpture
exports.Sculpture_update_put = async (req, res) => {
  try {
    const updatedSculpture = await Sculpture.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedSculpture) return res.status(404).json({ error: 'Sculpture not found' });
    res.status(200).json({ message: 'Sculpture updated successfully', data: updatedSculpture });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete sculpture
exports.Sculpture_delete = async (req, res) => {
  try {
    const result = await Sculpture.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).send('Sculpture not found');
    // Render the list view with a success message
    const sculptures = await Sculpture.find();
    res.render('Sculptures', {
      title: 'Sculpture Search Results',
      results: sculptures,
      success: 'Sculpture deleted successfully!',
    });
  } catch (err) {
    res.status(500).send('Error deleting sculpture');
  }
};


// Render view pages
exports.Sculpture_view_all_Page = async (req, res) => {
  try {
    const sculptures = await Sculpture.find();
    res.render('Sculptures', { title: 'Sculpture Search Results', results: sculptures });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

exports.Sculpture_create_Page = (req, res) => {
  res.render('Sculpturecreate', { title: 'Create Sculpture' });
};

exports.Sculpture_update_Page = async (req, res) => {
  try {
    const result = await Sculpture.findById(req.query.id);
    if (!result) throw new Error('Sculpture not found');
    res.render('Sculptureupdate', { title: 'Update Sculpture', toShow: result });
  } catch (err) {
    res.status(404).send({ error: err.message });
  }
};

exports.Sculpture_delete_Page = async (req, res) => {
  try {
    const result = await Sculpture.findById(req.query.id);
    if (!result) throw new Error('Sculpture not found');
    res.render('Sculpturedelete', { title: 'Delete Sculpture', toShow: result });
  } catch (err) {
    res.status(404).send({ error: err.message });
  }
};
