var express = require('express');
var router = express.Router();
var sculptures_controller = require('../controllers/Sculptures');

// Sculpture Routes
router.get('/', sculptures_controller.Sculptures_list);
router.post('/', sculptures_controller.Sculptures_create_post);
router.get('/:id', sculptures_controller.Sculptures_detail);
router.put('/:id', sculptures_controller.Sculptures_update_put);
router.delete('/:id', sculptures_controller.Sculptures_delete);

module.exports = router;
