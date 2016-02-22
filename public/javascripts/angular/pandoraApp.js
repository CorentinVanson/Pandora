var app = angular.module("pandoraApp", []);

app.config(function ($interpolateProvider) {
    $interpolateProvider.startSymbol('//');
    $interpolateProvider.endSymbol('//');
});

app.factory('chooseAnimal', function() {
    var animal = null;
    var animalService = {};

    animalService.set = function (an) {
        animal = an;
    };

    animalService.get = function () {
        return animal;
    };

    return animalService;
});

app.controller("animalsController", function ($scope, $http, chooseAnimal) {
    var url = "http://localhost:8080/about";
    $scope.animals = [];

    $http.get(url).then(function (response) {
        $scope.animals = response.data;
    });

    $scope.selectAnimal = chooseAnimal.set;
});

app.controller("animalSelected", function ($scope, chooseAnimal) {
    $scope.animal = chooseAnimal.get;
});