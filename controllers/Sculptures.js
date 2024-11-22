const Sculpture = require('../models/sculptures');

// Get all Sculptures
exports.sculpture_list = async function (req, res) {
    try {
        const sculptures = await Sculpture.find();
        res.render('sculptures', { results: sculptures });
    } catch (err) {
        res.status(500).send(`Error: ${err}`);
    }
};

// Create Sculpture
exports.sculpture_create_post = async function (req, res) {
    let document = new Sculpture();
    document.name = req.body.name;
    document.artist = req.body.artist;
    document.year = req.body.year;
    try {
        let result = await document.save();
        res.send(result);
    } catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// Update Sculpture
exports.sculpture_update_put = async function (req, res) {
    console.log(`update on id ${req.params.id} with body ${JSON.stringify(req.body)}`);
    try {
        let toUpdate = await Sculpture.findById(req.params.id);
        // Update properties
        if (req.body.name) toUpdate.name = req.body.name;
        if (req.body.year) toUpdate.year = req.body.year;
        if (req.body.artist) toUpdate.artist = req.body.artist;
        let result = await toUpdate.save();
        console.log("Success " + result);
        res.send(result);
    } catch (err) {
        res.status(500);
        res.send(`{"error": ${err}: Update for id ${req.params.id} failed`);
    }
};

// Delete Sculpture
exports.sculpture_delete = async function (req, res) {
    console.log("delete " + req.params.id);
    try {
        const result = await Sculpture.findByIdAndDelete(req.params.id);
        console.log("Removed " + result);
        res.send(result);
    } catch (err) {
        res.status(500);
        res.send(`{"error": Error deleting ${err}}`);
    }
};

// View one Sculpture
exports.sculpture_view_one_Page = async function (req, res) {
    console.log("single view for id " + req.query.id);
    try {
        result = await Sculpture.findById(req.query.id);
        res.render('sculpturesdetail',
            { title: 'Sculpture Detail', toShow: result });
    } catch (err) {
        res.status(500);
        res.send(`{'error': '${err}'}`);
    }
};

// Create Sculpture Page
exports.sculpture_create_Page = function (req, res) {
    console.log("create view");
    try {
        res.render('sculpturescreate', { title: 'Sculpture Create' });
    } catch (err) {
        res.status(500);
        res.send(`{'error': '${err}'}`);
    }
}

// Update Sculpture Page
exports.sculpture_update_Page = async function (req, res) {
    console.log("update view for item " + req.query.id);
    try {
        let result = await Sculpture.findById(req.query.id);
        res.render('sculpturesupdate', { title: 'Sculpture Update', toShow: result });
    }
    catch (err) {
        res.status(500);
        res.send(`{'error': '${err}'}`);
    }
};

// Delete Sculpture Page
exports.sculpture_delete_Page = async function (req, res) {
    console.log("Delete view for id " + req.query.id);
    try {
        result = await Sculpture.findById(req.query.id);
        res.render('sculpturesdelete', {
            title: 'Sculpture Delete', toShow:
                result
        });
    }
    catch (err) {
        res.status(500);
        res.send(`{'error': '${err}'}`);
    }
};
