var express = require('express');
var router = express.Router();
var sculptures_controller = require('../controllers/Sculptures');

// Routes for Sculptures

// GET all sculptures (list)
router.get('/', sculptures_controller.Sculptures_list);

// POST a new sculpture (create)
router.post('/', sculptures_controller.Sculptures_create_post);

// GET a specific sculpture by ID (detail)
router.get('/detail', sculptures_controller.Sculpture_view_one_Page);  // Updated route for sculpture detail

// PUT (update) a sculpture by ID
router.put('/:id', sculptures_controller.Sculptures_update_put);

// DELETE a sculpture by ID
router.delete('/:id', sculptures_controller.Sculptures_delete);


module.exports = router;
