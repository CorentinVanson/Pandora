var app = angular.module("pandoraApp", []);

app.config(function ($interpolateProvider) {
    $interpolateProvider.startSymbol('//');
    $interpolateProvider.endSymbol('//');
});

app.filter('getById', function() {
    return function(input, id) {
        var i=0, len=input.length;
        for (; i<len; i++) {
            if (+input[i].id == +id) {
                return input[i];
            }
        }
        return null;
    }
});

app.factory('chooseAnimal', function($timeout) {
    var animal = null;
    var animalService = {};
    var scopeAct = null;

    animalService.set = function (an) {
        console.log("ok");
        $timeout(function(){
            animal = an;
            scopeAct(an);
        },0);
    };

    animalService.get = function () {
        return animal;
    };

    animalService.init = function(s){
        scopeAct = s;
    }

    return animalService;
});

app.factory('animals', function($filter) {
    var animals = null;
    var animalService = {};

    animalService.set = function (an) {
        animals = an;
    };

    animalService.get = function () {
        return animals;
    };

    animalService.getAnimalById = function(id){
        return $filter('getById')(animals,id);
    }

    return animalService;
});

app.controller("animalsController", function ($scope, $http, $filter, chooseAnimal, animals) {


});

app.controller("animalSelected", function ($scope, chooseAnimal) {
    $scope.animal = chooseAnimal.get();
    $scope.act = function(an){
        $scope.animal = an;
        $scope.$apply();
    }
    chooseAnimal.init($scope.act);
});

app.controller("game",function($scope, $http, chooseAnimal, animals){

    $scope.setAnimalById = function(id){
        chooseAnimal.set(animals.getAnimalById(id));
    }

    var url = "http://127.0.0.1:8080/about";

    $scope.animals = animals.get;

    $scope.selectAnimals = animals.set;
    $scope.selectAnimal = chooseAnimal.set;

    $http.get(url).then(function (resp) {
        $scope.selectAnimals(resp.data);

        var url = "http://127.0.0.1:8080";
        //var url = "http://beta-pandorazoo.rhcloud.com";

        var size = 40;

        $http.get(url+"/map/getRandomMap?size="+size.toString()).then(function(response){

            data = response.data;

            var game = new Phaser.Game(800, 400, Phaser.AUTO, 'game', null, true, false);

            var BasicGame = function (game) { };

            BasicGame.Boot = function (game) { };

            var isoGroup, cursorPos, cursor, worldScale, render;

            BasicGame.Boot.prototype =
            {
                preload: function () {

                    var gameLoader = new GameLoader(game);
                    gameLoader.load(data,resp.data);

                },
                create: function () {

                    var gameCreate = new GameCreate(game);
                    gameCreate.create(data,resp.data);

                },
                update: function () {

                    var gameUpdate = new GameUpdate(game);
                    gameUpdate.update();

                },
                render: function () {

                    var gameRender = new GameRender(game);
                    gameRender.render();

                }
            };

            game.state.add('Boot', BasicGame.Boot);
            game.state.start('Boot');
        });
    });
});