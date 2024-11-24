const express = require('express');
const router = express.Router();
const SculptureController = require('../controllers/Sculptures');

// Routes for rendering pages
router.get('/', SculptureController.Sculpture_view_all_Page);
router.get('/detail', SculptureController.Sculpture_view_one_Page);
router.get('/create', SculptureController.Sculpture_create_Page);
router.get('/update', SculptureController.Sculpture_update_Page);
router.get('/delete', SculptureController.Sculpture_delete_Page);

// API endpoints
router.post('/create', SculptureController.Sculpture_create_post);
// Update sculpture
router.put('/:id', SculptureController.Sculpture_update_put);
router.delete('/delete/:id', SculptureController.Sculpture_delete);

module.exports = router;
