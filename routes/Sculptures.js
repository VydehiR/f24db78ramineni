var express = require('express');
var router = express.Router();
var sculpture_controller = require('../controllers/sculptures');

router.get('/', sculpture_controller.sculpture_list);

router.post('/', sculpture_controller.sculpture_create_post);

router.put('/sculptures:id', sculpture_controller.sculpture_update_put);

router.delete('/sculptures:id', sculpture_controller.sculpture_delete);

router.get('/sculptures:id', sculpture_controller.sculpture_detail);

router.get('/detail', sculpture_controller.sculpture_view_one_Page);

router.get('/create', sculpture_controller.sculpture_create_Page);

router.get('/update', sculpture_controller.sculpture_update_Page);

router.get('/delete', sculpture_controller.sculpture_delete_Page);

module.exports = router;
