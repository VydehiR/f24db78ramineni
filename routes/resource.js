var express = require('express');
var router = express.Router();

// Require controller modules
var api_controller = require('../controllers/api');
var sculptures_controller = require('../controllers/Sculptures');

// API Route
router.get('/', api_controller.api);
const results = [
    { Sculptures_name: "The Thinker", Sculptures_height: "182", Sculptures_material: "Bronze" },
    { Sculptures_name: "Venus de Milo", Sculptures_height: "203", Sculptures_material: "Marble" },
    { Sculptures_name: "David", Sculptures_height: "517", Sculptures_material: "Marble" }
  ];
// Sculpture Routes
router.get('/sculptures', sculptures_controller.Sculptures_list);  // List all Sculptures
router.post('/sculptures', sculptures_controller.Sculptures_create_post); // Create a Sculpture
router.get('/sculptures/:id', sculptures_controller.Sculptures_detail); // Get a specific Sculpture
router.put('/sculptures/:id', sculptures_controller.Sculptures_update_put); // Update a Sculpture
router.delete('/sculptures/:id', sculptures_controller.Sculptures_delete); // Delete a Sculpture

module.exports = router;
