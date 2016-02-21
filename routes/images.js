var express = require('express');
var path = require('path');
var router = express.Router();

/* GET users listing. */
router.get('/:dir/:file', function(req, res) {
    var filePath = path.join(__dirname, '..', '/public/images/', req.params.dir, req.params.file);
    res.sendFile(filePath);
});

module.exports = router;
