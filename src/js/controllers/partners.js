'use strict';

angular.module('myApp')

    .controller('PartnersCtrl',  ['$scope', '$kinvey','trainingUtils', function ($scope, $kinvey, trainingUtils) {
        $scope.partners = [];

        var dataStore = $kinvey.DataStore.getInstance('Partner');

        $scope.loadPartners = function(query){
            trainingUtils.showProgress();
            dataStore.find().then(function (result) {
                $scope.partners = result.cache;
                return result.networkPromise;
            }).then(function (partners) {
                $scope.partners = partners;
                $scope.$digest();
                trainingUtils.hideProgress();
            }).catch(function(err){
                console.log("err " + JSON.stringify(err));
                trainingUtils.hideProgress();
                trainingUtils.showOkDialog("Error: " + err.description);
            });
        };
        $scope.loadPartners();

    }]);