var express = require('express');
var router = express.Router();

var formatResults = function (res) {
  var formatter = function (entry) {
    return entry.split('/').pop().replace(/_/g, " ");
  };
  var animals = [];
  var ids = [];
  var animal;
  var ts = new Date().getTime();

  if (res.length === 1) {
    animal = {};
    animal.name = res[0].name.value;
    animal.url_img = res[0].image.value;
    animal.class = formatter(res[0].class.value);
    animal.family = formatter(res[0].family.value);
    animal.order = formatter(res[0].order.value);
    animal.species = formatter(res[0].species.value);
    animal.lastUpdate = ts;
    if (res[0].id) {
      animal.wikiPageId = res[0].id.value;
    }

    return animal;
  }

  for (var i =0; i < res.length; i++) {
    if (ids.indexOf(res[i].id.value) === -1) {
      ids.push(res[i].id.value);
      animal = {};
      animal.name = res[i].name.value;
      animal.url_img = res[i].image.value;
      animal.class = formatter(res[i].class.value);
      animal.family = formatter(res[i].family.value);
      animal.order = formatter(res[i].order.value);
      animal.species = formatter(res[i].species.value);
      animal.wikiPageId = res[i].id.value;
      animal.lastUpdate = ts;

      animals.push(animal);
    }
  }

  return animals;
};

var updateAnimalInDB = function (an, col) {
  col.findOne({wikiPageId : an.wikiPageId}, function(err, doc){
    var currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() - 1);
    var monthAgoTS = currentDate.getTime();
    if (!(doc && doc.lastUpdate && monthAgoTS < doc.lastUpdate)) {
      col.remove({wikiPageId: an.wikiPageId}, function(err, doc){
        col.insert(an, function (err, doc) {
          console.log("Animal '" + an.name + "' updated in DB.");
        })
      });
    } else if (doc.lastUpdate && monthAgoTS < doc.lastUpdate) {
      console.log("No need to refresh data ");
    }
  });

};

router.get('/init', function(req, res) {
  console.log("toto");
  var client = new req.sparqler.Client();
  var q = new req.sparqler.Query({"limit": 2000});
  var animal = {
    "type": "dbo:Animal",
    "dbp:name": "?name",
    "dbo:class": "?class",
    "dbo:order": "?order",
    "dbo:family": "?family",
    "dbo:species": "?species",
    "dbo:thumbnail": "?image",
    "dbo:wikiPageID": "?id"
  };

  var col = req.db.get('animal');
  col.remove({});

  q.registerVariable("animal", animal);
  //console.log(q.sparqlQuery);

  client.send(q, function(error, data) {
    var result = data.results.bindings;
    //console.log(result);
    var r = formatResults(result);
    for (var i =0; i < r.length; i++){
      updateAnimalInDB(r[i], col);
    }
    res.send("Database is reset.");
  });
});

router.get('/', function(req, res) {
  var collection = req.db.get('animal');
  collection.find({}, function(err, doc){
    res.send(doc);
  });
});

router.get('/:id', function (req, res) {
  var animalId = req.params.id;
  var collection = req.db.get('animal');

  var currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() - 1);
  var monthAgoTS = currentDate.getTime();

  collection.findOne({wikiPageId: animalId}, function (err, doc) {
    if (doc && doc.lastUpdate && doc.lastUpdate > monthAgoTS) {
      res.send(doc);
    } else {
      var client = new req.sparqler.Client();
      var q = new req.sparqler.Query({"limit": 1});
      var animal = {
        "type": "dbo:Animal",
        "dbp:name": "?name",
        "dbo:class": "?class",
        "dbo:order": "?order",
        "dbo:family": "?family",
        "dbo:species": "?species",
        "dbo:thumbnail": "?image",
        "dbo:wikiPageID": animalId
      };
      q.registerVariable("animal", animal);

      client.send(q, function (error, data) {
        var result = data.results.bindings;
        var r = formatResults(result);
        r.wikiPageId = animalId;

        collection.remove({wikiPageId: animalId}, function (err, doc) {
          collection.insert(r, function (err, doc) {
            console.log("Animal '" + r.name + "' updated in DB.");
          })
        });
      });
    }

  });

});

module.exports = router;
