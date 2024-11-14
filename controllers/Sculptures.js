var Sculpture = require('../models/sculptures');

// List of all Sculptures
exports.Sculptures_list = async function(req, res) {
    try {
        const sculptures = await Sculpture.find();
        res.send(sculptures);
    } catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// For a specific Sculpture
exports.Sculptures_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Sculpture detail: ' + req.params.id);
};

// Handle Sculpture create on POST
exports.Sculptures_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Sculpture create POST');
};

// Handle Sculpture delete on DELETE
exports.Sculptures_delete = function(req, res) {
    res.send('NOT IMPLEMENTED: Sculpture delete DELETE ' + req.params.id);
};

// Handle Sculpture update on PUT
exports.Sculptures_update_put = function(req, res) {
    res.send('NOT IMPLEMENTED: Sculpture update PUT ' + req.params.id);
};
