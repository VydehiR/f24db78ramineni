var express = require('express');
var router = express.Router();
var sculpture_controller = require('../controllers/sculptures');

// List all sculptures
router.get('/', sculpture_controller.sculpture_list);
router.post('/create', sculpture_controller.sculpture_create_post);

router.get('/:id', sculpture_controller.sculpture_detail);
router.put('/:id', sculpture_controller.sculpture_update_put);
router.delete('/:id', sculpture_controller.sculpture_delete);

router.get('/create', sculpture_controller.sculpture_create_Page);
router.get('/update', sculpture_controller.sculpture_update_Page);
router.get('/delete', sculpture_controller.sculpture_delete_Page);
router.get('/view/page', sculpture_controller.sculpture_view_all_Page);
router.get('/view/:id', sculpture_controller.sculpture_view_one_Page);


module.exports = router;
