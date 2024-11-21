var express = require('express');
var router = express.Router();

// Require controller modules
var sculptures_controller = require('../controllers/Sculptures');

// Sculpture Routes for API
router.get('/sculptures', sculptures_controller.Sculptures_list);          // List all Sculptures (API)
router.post('/sculptures', sculptures_controller.Sculptures_create_post);   // Create a Sculpture (API)
router.get('/sculptures/:id', sculptures_controller.Sculptures_detail);     // Get a specific Sculpture (API)
router.put('/sculptures/:id', sculptures_controller.Sculptures_update_put); // Update a Sculpture (API)
router.delete('/sculptures/:id', sculptures_controller.Sculptures_delete);  // Delete a Sculpture (API)

module.exports = router;
