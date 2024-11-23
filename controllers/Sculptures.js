const Sculpture = require('../models/Sculptures');
// List of all Sculptures
exports.Sculpture_list = async function (req, res) {
  try {
    theSculptures = await Sculpture.find();
    res.send(theSculptures);
  }
  catch (err) {
    res.status(500);
    res.send(`{"error": ${err}}`);
  }
};

// VIEWS
// Handle a show all view
exports.Sculpture_view_all_Page = async function (req, res) {
  try {
    theSculptures = await Sculpture.find();
    res.render('Sculptures', { title: 'Sculpture Search Results', results: theSculptures });
  }
  catch (err) {
    res.status(500);
    res.send(`{"error": ${err}}`);
  }
};

// Handle Sculpture create on POST.
exports.Sculpture_create_post = async function (req, res) {
  console.log(req.body)
  let document = new Sculpture();
  // We are looking for a body, since POST does not have query parameters.
  // Even though bodies can be in many different formats, we will be picky
  // and require that it be a json object
  // {"Sculpture_type":"goat", "cost":12, "size":"large"}
  document.Sculpture_type = req.body.Sculpture_type;
  document.origin = req.body.origin;
  document.age = req.body.age;
  try {
    let result = await document.save();
    res.send(result);
  }
  catch (err) {
    res.status(500);
    res.send(`{"error": ${err}}`);
  }
};
// for a specific Sculpture.
exports.Sculpture_detail = async function (req, res) {
  console.log("detail" + req.params.id)
  try {
    result = await Sculpture.findById(req.params.id)
    res.send(result)
  } catch (error) {
    res.status(500)
    res.send(`{"error": document for id ${req.params.id} not found`);
  }
};

//Handle Sculpture update form on PUT.
exports.Sculpture_update_put = async function (req, res) {
  console.log(`update on id ${req.params.id} with body ${JSON.stringify(req.body)}`);
  try {
    let toUpdate = await Sculpture.findById(req.params.id);
    if (!toUpdate) {
      return res.status(404).send({ error: `Sculpture with id ${req.params.id} not found` });
    }
    // Update properties
    if (req.body.Sculpture_type) toUpdate.Sculpture_type = req.body.Sculpture_type;
    if (req.body.origin) toUpdate.origin = req.body.origin;
    if (req.body.age) toUpdate.age = req.body.age;

    let result = await toUpdate.save();
    console.log("Success " + result);
    res.status(200).json(result); // Send a JSON response on success
  } catch (err) {
    res.status(500).send({ error: `${err.message}: Update for id ${req.params.id} failed` });
  }
};


// Delete an Sculpture by ID
exports.Sculpture_delete = async function (req, res) {
  try {
    const deletedSculpture = await Sculpture.findByIdAndDelete(req.params.id);
    if (!deletedSculpture) {
      return res.status(404).json({ message: "Sculpture not found" });
    }
    res.status(200).json({ message: "Sculpture deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: `Error: ${err.message}` });
  }
};

// Handle a show one view with id specified by query
exports.Sculpture_view_one_Page = async function (req, res) {
  console.log("single view for id " + req.query.id)
  try {
    result = await Sculpture.findById(req.query.id)
    res.render('Sculpturedetail',
      { title: 'Sculpture Detail', toShow: result });
  }
  catch (err) {
    res.status(500)
    res.send(`{'error': '${err}'}`);
  }
};

// Handle building the view for creating a costume.
// No body, no in path parameter, no query.
// Does not need to be async
exports.Sculpture_create_Page = function (req, res) {
  console.log("create view")
  try {
    res.render('Sculpturecreate', { title: 'Sculpture Create' });
  }
  catch (err) {
    res.status(500)
    res.send(`{'error': '${err}'}`);
  }
};

// Handle building the view for updating a costume.
// query provides the id
exports.Sculpture_update_Page = async function (req, res) {
  console.log("update view for item " + req.query.id)
  try {
    let result = await Sculpture.findById(req.query.id)
    res.render('Sculptureupdate', { title: 'Sculpture Update', toShow: result });
  }
  catch (err) {
    res.status(500)
    res.send(`{'error': '${err}'}`);
  }
};

// Handle a delete one view with id from query
exports.Sculpture_delete_Page = async function (req, res) {
  console.log("Delete view for id " + req.query.id)
  try {
    result = await Sculpture.findById(req.query.id)
    res.render('Sculpturedelete', { title: 'Sculpture Delete', toShow: result });
  }
  catch (err) {
    res.status(500)
    res.send(`{'error': '${err}'}`);
  }
};