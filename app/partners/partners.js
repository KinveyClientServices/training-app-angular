'use strict';

angular.module('myApp.partners', [])

    .controller('PartnersCtrl', ['$scope', '$kinvey', function ($scope, $kinvey) {
        $scope.partners = [];

        var dataStore = $kinvey.DataStore.getInstance('partner');

        $scope.loadPartners = function(query){
            dataStore.find().then(function (result) {
                $scope.partners = result.cache;
                return result.networkPromise;
            }).then(function (partners) {
                $scope.partners = partners;
                $scope.$digest();
            }).catch(function(err){
                console.log("err " + JSON.stringify(err));
                alert("Error: " + err.description);
            });
        };
        $scope.loadPartners();

    }]);