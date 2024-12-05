const sculpture = require('../models/sculptures');
// List of all sculptures
exports.sculpture_list = async function (req, res) {
  try {
    thesculptures = await sculpture.find();
    res.send(thesculptures);
  }
  catch (err) {
    res.status(500);
    res.send(`{"error": ${err}}`);
  }
};

// VIEWS
// Handle a show all view
exports.sculpture_view_all_Page = async function (req, res) {
  try {
    thesculptures = await sculpture.find();
    res.render('sculptures', { title: 'sculpture Search Results', results: thesculptures });
  }
  catch (err) {
    res.status(500);
    res.send(`{"error": ${err}}`);
  }
};

// Handle sculpture create on POST.
exports.sculpture_create_post = async function (req, res) {
  console.log(req.body)
  let document = new sculpture();
  // We are looking for a body, since POST does not have query parameters.
  // Even though bodies can be in many different formats, we will be picky
  // and require that it be a json object
  // {"sculpture_type":"goat", "cost":12, "size":"large"}
  document.sculpture_type = req.body.sculpture_type;
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
// for a specific sculpture.
exports.sculpture_detail = async function (req, res) {
  console.log("detail" + req.params.id)
  try {
    result = await sculpture.findById(req.params.id)
    res.send(result)
  } catch (error) {
    res.status(500)
    res.send(`{"error": document for id ${req.params.id} not found`);
  }
};

//Handle sculpture update form on PUT.
exports.sculpture_update_put = async function (req, res) {
  console.log(`update on id ${req.params.id} with body ${JSON.stringify(req.body)}`);
  try {
    let toUpdate = await sculpture.findById(req.params.id);
    if (!toUpdate) {
      return res.status(404).send({ error: `sculpture with id ${req.params.id} not found` });
    }
    // Update properties
    if (req.body.sculpture_type) toUpdate.sculpture_type = req.body.sculpture_type;
    if (req.body.origin) toUpdate.origin = req.body.origin;
    if (req.body.age) toUpdate.age = req.body.age;

    let result = await toUpdate.save();
    console.log("Success " + result);
    res.status(200).json(result); // Send a JSON response on success
  } catch (err) {
    res.status(500).send({ error: `${err.message}: Update for id ${req.params.id} failed` });
  }
};


// Delete an sculpture by ID
exports.sculpture_delete = async function (req, res) {
  try {
    const deletedsculpture = await sculpture.findByIdAndDelete(req.params.id);
    if (!deletedsculpture) {
      return res.status(404).json({ message: "sculpture not found" });
    }
    res.status(200).json({ message: "sculpture deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: `Error: ${err.message}` });
  }
};

// Handle a show one view with id specified by query
exports.sculpture_view_one_Page = async function (req, res) {
  console.log("single view for id " + req.query.id)
  try {
    result = await sculpture.findById(req.query.id)
    res.render('sculpturedetail',
      { title: 'sculpture Detail', toShow: result });
  }
  catch (err) {
    res.status(500)
    res.send(`{'error': '${err}'}`);
  }
};

// Handle building the view for creating a costume.
// No body, no in path parameter, no query.
// Does not need to be async
exports.sculpture_create_Page = function (req, res) {
  console.log("create view")
  try {
    res.render('sculpturecreate', { title: 'sculpture Create' });
  }
  catch (err) {
    res.status(500)
    res.send(`{'error': '${err}'}`);
  }
};

// Handle building the view for updating a costume.
// query provides the id
exports.sculpture_update_Page = async function(req, res) {
  console.log("Update view for sculpture with ID " + req.query.id);
  try {
      let result = await sculpture.findById(req.query.id);
      res.render('sculptureupdate', { title: 'sculpture Update', toShow: result });
  } catch (err) {
      if (err.name === 'ValidationError') {
          // If it's a validation error, render the page with the error message
          res.render('sculptureupdate', {
              title: 'sculpture Update',
              message: `Error: ${err.message}`,
              toShow: req.body // Preserve any previously entered data in the form
          });
      } else {
          // Handle other types of errors
          res.status(500).send(`{"error": "${err}"}`);
      }
  }
};

// Handle a delete one view with id from query
exports.sculpture_delete_Page = async function (req, res) {
  console.log("Delete view for id " + req.query.id)
  try {
    result = await sculpture.findById(req.query.id)
    res.render('sculpturedelete', { title: 'sculpture Delete', toShow: result });
  }
  catch (err) {
    res.status(500)
    res.send(`{'error': '${err}'}`);
  }
};

exports.sculpture_update_post = async function(req, res) {
  try {
      // Try updating the sculpture
      const updatedSite = await sculpture.findByIdAndUpdate(req.body.id, req.body, { new: true, runValidators: true });

      if (!updatedSite) {
          return res.status(404).json({ error: 'sculpture not found' });
      }

      // Return a success message if the update is successful
      res.status(200).json({ message: 'Update succeeded', updatedSite });
  } catch (err) {
      // Check if the error is a validation error
      if (err.name === 'ValidationError') {
          // Send back the validation error details to the client
          return res.status(400).json({ error: `Validation failed: ${err.message}` });
      }

      // Handle other types of errors
      res.status(500).json({ error: `Internal server error: ${err.message}` });
  }
};