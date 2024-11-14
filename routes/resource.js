var express = require('express');
var router = express.Router();

var api_controller = require('../controllers/api');
var Sculptures_controller = require('../controllers/Sculptures');

// API Route
router.get('/', api_controller.api);

// Gadget Routes
router.get('/Sculptures', Sculptures_controller.Sculptures_list);  // List all Sculptures
router.post('/Sculptures', Sculptures_controller.Sculptures_create_post); // Create new Sculptures
router.get('/Sculptures/:id', Sculptures_controller.Sculptures_detail); // View single Sculptures
router.put('/Sculptures/:id', Sculptures_controller.Sculptures_update_put); // Update Sculptures
router.delete('/Sculptures/:id', Sculptures_controller.v_delete); // Delete Sculptures

module.exports = router;