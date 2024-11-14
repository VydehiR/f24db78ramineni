var express = require('express');
var router = express.Router();

// Require controller modules
var sculptures_controller = require('../controllers/sculptures');

// Sculpture Routes
router.get('/sculptures', sculptures_controller.Sculptures_list);          // List all Sculptures
router.post('/sculptures', sculptures_controller.Sculptures_create_post);   // Create a Sculpture
router.get('/sculptures/:id', sculptures_controller.Sculptures_detail);     // Get a specific Sculpture
router.put('/sculptures/:id', sculptures_controller.Sculptures_update_put); // Update a Sculpture
router.delete('/sculptures/:id', sculptures_controller.Sculptures_delete);  // Delete a Sculpture

module.exports = router;
