// routes/resource.js
const express = require('express');
const router = express.Router();
const api_controller = require('../controllers/api');
const Sculpture_controller = require('../controllers/Sculptures');

router.get('/', api_controller.api);
router.get('/Sculptures', Sculpture_controller.Sculpture_list);
router.post('/Sculptures', Sculpture_controller.Sculpture_create_post);
router.get('/Sculptures/:id', Sculpture_controller.Sculpture_detail);
router.put('/Sculptures/:id', Sculpture_controller.Sculpture_update_put);
router.delete('/Sculptures/:id', Sculpture_controller.Sculpture_delete);
router.get('/', function(req, res, next) {
    res.send('Hello World');
  });

module.exports = router;
