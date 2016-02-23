var express = require('express');
var url = require('url');
var querystring = require('querystring');

var Map = require('./../motor/Map');
var Building = require('./../motor/Building');
var Tile = require('./../motor/Tile');
var Road = require('./../motor/Road');
var Fence = require('./../motor/Fence');
var Animal = require('./../motor/Animal');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var page = url.parse(req.url).pathname;
  var params = querystring.parse(url.parse(req.url).query);
  if ('player' in params) {
    var result = { success:false, error:'fonctionality not implemented'};
    res.send(JSON.stringify(result));
  }
  else {
    if ('size' in params) {
      var size = params['size'];
      var map = new Map(size,res);
      map.initiateRandomMap(true);
      var matrix = {mapTile : map.getMatrixTile(),
        mapBuilding : map.getMatrixBuilding(),
        mapRoad : map.getMatrixRoad(),
        mapFence : map.getMatrixFence(),
        animal : map.getAnimals(),
        numberTile : Tile.getNumberType(),
        numberRoad : Road.getNumberType(),
        numberBuilding : Building.getNumberType(),
        numberAnimal : Animal.getNumberType(),
        numberFence : Fence.getNumberType()};
      res.send(JSON.stringify(matrix));
    }else{
      var result = { success:false, error:'no size specified'};
      res.send(JSON.stringify(result));
    }
  }
});

module.exports = router;
