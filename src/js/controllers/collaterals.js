'use strict';

angular.module('myApp')
    .controller('CollateralsCtrl', ['$scope', '$kinvey', function ($scope, $kinvey) {

        $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
            viewData.enableBack = true;
        });

        $scope.collaterals = [];

        $scope.loadCollaterals = function(){
            var query = new $kinvey.Query();
            query.equalTo('mimeType','application/pdf');
            var fileStore = new $kinvey.FileStore(),
                promise = fileStore.find(query);
            promise.then(function(files) {
                $scope.collaterals = files;
                $scope.$digest();
            }).catch(function(err) {
                console.log("fetch collaterals error " + JSON.stringify(err));
                alert("Error: " + err.description);
            });
        };

        $scope.loadCollaterals();

    }]);