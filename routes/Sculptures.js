// routes/Sculptures.js
var express = require('express');
var router = express.Router();
// const Sculpture_controlers= require('../controllers/Sculptures');
const SculpturesController = require('../controllers/Sculptures');
router.get('/', SculpturesController.Sculpture_view_all_Page );
// GET request for one Sculpture.
router.get('/Sculptures/:id', SculpturesController.Sculpture_detail);
// Import the Sculpture controller (make sure the file path is correct)
const Sculpture_controller = require('../controllers/Sculptures');
/* GET detail costume page */
router.get('/detail', SculpturesController.Sculpture_view_one_Page);
// DELETE request to delete an Sculpture by ID
router.delete('/Sculptures/:id', Sculpturescontroller.Sculpture_delete);
/* GET create costume page */
router.get('/create', Sculpturescontroller.Sculpture_create_Page);
/* GET create update page */
router.get('/update', Sculpturescontroller.Sculpture_update_Page);
/* GET delete costume page */
router.get('/delete', Sculpturescontroller.Sculpture_delete_Page)
module.exports = router;
