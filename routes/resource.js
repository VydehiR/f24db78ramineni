var express = require('express');
var router = express.Router();

// Import controllers
var api_controller = require('../controllers/api');
var Sculptures_controller = require('../controllers/Sculptures');

// API Route
router.get('/', api_controller.api);

// Placeholder route for '/path'
router.get('/path', (req, res) => {
    res.send('This is the /path route');
});

// Sculpture Routes
router.get('/Sculptures', Sculptures_controller.Sculptures_list);  // List all Sculptures
router.post('/Sculptures', Sculptures_controller.Sculptures_create_post); // Create new Sculptures
router.get('/Sculptures/:id', Sculptures_controller.Sculptures_detail); // View single Sculpture
router.put('/Sculptures/:id', Sculptures_controller.Sculptures_update_put); // Update Sculpture
router.delete('/Sculptures/:id', Sculptures_controller.v_delete); // Delete Sculpture

module.exports = router;
