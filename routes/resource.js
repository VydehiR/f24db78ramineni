const express = require('express');
const router = express.Router();
const SculptureController = require('../controllers/Sculptures');

// API Routes
router.get('/Sculptures', SculptureController.Sculpture_list); // List all sculptures
router.post('/Sculptures', SculptureController.Sculpture_create_post); // Create new sculpture
router.get('/Sculptures/:id', SculptureController.Sculpture_view_one_Page); // View one sculpture
router.put('/Sculptures/:id', SculptureController.Sculpture_update_put); // Update sculpture
router.delete('/Sculptures/:id', SculptureController.Sculpture_delete); // Delete sculpture

module.exports = router;
