var express = require('express');
var router = express.Router();

// Require controller modules
var sculptures_controller = require('../controllers/Sculptures');

// Sculpture Routes
router.get('/', sculptures_controller.Sculptures_list);  // List all Sculptures (renders the webpage)
router.post('/', sculptures_controller.Sculptures_create_post); // Create a Sculpture (API)
router.get('/:id', sculptures_controller.Sculptures_detail); // Get a specific Sculpture (API)
router.put('/:id', sculptures_controller.Sculptures_update_put); // Update a Sculpture (API)
router.delete('/:id', sculptures_controller.Sculptures_delete); // Delete a Sculpture (API)

module.exports = router;
