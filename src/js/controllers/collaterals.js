'use strict';

angular.module('myApp')
    .controller('CollateralsCtrl', ['$scope', '$kinvey','trainingUtils', function ($scope, $kinvey, trainingUtils) {

        $scope.collaterals = [];

        //TODO: LAB: Get files from Kinvey
        $scope.loadCollaterals = function(){
            trainingUtils.showProgress();
            var query = new $kinvey.Query();
            query.equalTo('mimeType','application/pdf');
            var promise = $kinvey.Files.find(query).then(function(files) {
                $scope.collaterals = files;
                $scope.$apply();
                trainingUtils.hideProgress();
            }).catch(function(error) {
                console.log("err " + JSON.stringify(error.message));
                trainingUtils.hideProgress();
                trainingUtils.showOkDialog("Error: " + error.message);
            });
        };

        $scope.openPdfFile = function(url){
            window.open(url, '_system', 'location=yes'); return false;
        };

        $scope.loadCollaterals();

    }]);