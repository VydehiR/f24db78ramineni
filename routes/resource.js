// routes/resource.js
const express = require('express');
const router = express.Router();
const api_controller = require('../controllers/api');
const sculpture_controller = require('../controllers/Sculptures');

router.get('/', api_controller.api);
router.get('/sculptures', sculpture_controller.sculpture_list);
router.post('/sculptures', sculpture_controller.sculpture_create_post);
router.get('/sculptures/:id', sculpture_controller.sculpture_detail);
router.put('/sculptures/:id', sculpture_controller.sculpture_update_put);
router.delete('/sculptures/:id', sculpture_controller.sculpture_delete);

module.exports = router;