'use strict';

angular.module('myApp')
    .controller('CollateralsCtrl', ['$scope', '$kinvey','trainingUtils', function ($scope, $kinvey, trainingUtils) {

        $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
            viewData.enableBack = true;
        });

        $scope.collaterals = [];

        $scope.loadCollaterals = function(){
            trainingUtils.showProgress();
            var query = new $kinvey.Query();
            query.equalTo('mimeType','application/pdf');
            var fileStore = new $kinvey.FileStore(),
                promise = fileStore.find(query);
            promise.then(function(files) {
                $scope.collaterals = files;
                $scope.$digest();
                trainingUtils.hideProgress();
            }).catch(function(err) {
                console.log("fetch collaterals error " + JSON.stringify(err));
                trainingUtils.hideProgress();
                trainingUtils.showOkDialog("Error: " + err.description);
            });
        };

        $scope.loadCollaterals();

    }]);