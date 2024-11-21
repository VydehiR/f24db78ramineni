/*var express = require('express');
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
 
 
module.exports = router;*/
 
 
var express = require('express');
var sculptures_controlers = require('../controllers/Sculptures');
var router = express.Router();
 
/* GET sculptures page. */
router.get('/', sculptures_controlers.Sculptures_view_all_Page);
 
//router.get('/sculptures/:id', sculptures_controlers.sculptures_detail);
router.get('/sculptures/:id', sculptures_controlers.Sculptures_detail);
 
 
// POST route for creating a new sculptures
router.post('/', sculptures_controlers.Sculptures_create_post);
router.put('/:id', sculptures_controlers.Sculptures_update_put);
 
router.delete('/:id', sculptures_controlers.Sculptures_delete);
 
 
/* GET detail costume page */
//router.get('/detail', sculptures_controlers.Sculpture_view_one_Page);
router.get('/detail', sculptures_controlers.Sculpture_view_one_Page); 
 
//router.get('/create', sculptures_controlers.Sculpture_create_Page);
 
/* GET update costume page */
//router.get('/update', sculptures_controlers.Sculpture_update_Page);
 
/* GET delete costume page */
//router.get('/delete', sculptures_controlers.sculpture_delete_Page);
 
 
module.exports = router;
 
 
 