
// routes/sculptures.js
var express = require('express');
var router = express.Router();
const secured = (req, res, next) => {
    if (req.user) {
        return next();
    }
    res.redirect("/login");
}
// const sculpture_controlers= require('../controllers/sculptures');
const sculpturesController = require('../controllers/Sculptures');
router.get('/', sculpturesController.sculpture_view_all_Page);
// GET request for one sculpture.
router.get('/sculptures/:id', sculpturesController.sculpture_detail);
// Import the sculpture controller (make sure the file path is correct)
const sculpture_controller = require('../controllers/Sculptures');
/* GET detail costume page */
router.get('/detail', sculpturesController.sculpture_view_one_Page);
// DELETE request to delete an sculpture by ID
router.delete('/sculptures/:id', sculpture_controller.sculpture_delete);
/* GET create costume page */
router.get('/create', secured, sculpture_controller.sculpture_create_Page);
/* GET update costume page */
router.get('/update', secured, sculpture_controller.sculpture_update_Page);
/* GET create update page */
//router.get('/update', sculpture_controller.sculpture_update_Page);
/* GET delete costume page */
router.get('/delete', secured, sculpture_controller.sculpture_delete_Page)
module.exports = router;
