const express = require('express');
const router = express.Router();
const SculptureController = require('../controllers/Sculptures');  // Ensure the correct import

// Routes for rendering pages
router.get('/', SculptureController.Sculpture_view_all_Page); // List all sculptures
router.get('/detail', SculptureController.Sculpture_view_one_Page); // View one sculpture
router.get('/create', SculptureController.Sculpture_create_Page); // Create page
router.get('/update', SculptureController.Sculpture_update_Page); // Update page
router.get('/delete', SculptureController.Sculpture_delete_Page); // Delete page

// API endpoints for CRUD operations
router.post('/create', SculptureController.Sculpture_create_post); // Post to create
router.put('/:id', SculptureController.Sculpture_update_put); // Put to update
router.delete('/delete/:id', SculptureController.Sculpture_delete); // Delete a sculpture

module.exports = router;
