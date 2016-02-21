var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var data = {};
  data.title = "A propos des animaux de Pandora";

  var collection = req.db.get('animal');
  var p = collection.find({}, function(err, doc){
    //console.log(doc);

  });

  p.on('complete', function (err, doc) {
    data.animals = doc;
    console.log(data);
    res.render('about', data);
  });


});

module.exports = router;
