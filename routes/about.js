var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  var collection = req.db.get('animal');
  //var p = collection.find({}, function(err, doc){});
  var p = collection.find({}, {name: 1, class: 0});

  p.on('complete', function (err, doc) {
    res.send(doc);
  });

});

module.exports = router;
