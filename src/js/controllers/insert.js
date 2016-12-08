'use strict';

angular.module('myApp').controller('InsertCtrl', ['$scope', '$kinvey','trainingUtils', function ($scope, $kinvey, trainingUtils) {

        $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
            viewData.enableBack = true;
        });

        var dataStore = $kinvey.DataStore.collection('Todo',$kinvey.DataStoreType.Sync);

        //TODO: LAB: Define Todo JSON

        //TODO: LAB: Create a Todo
        $scope.insert = function (todo) {
            trainingUtils.showProgress();
            //     trainingUtils.hideProgress();
            //     trainingUtils.showOkDialog("Todo was added with success");
            //     //$state.go('todos');
            // }).catch(function (err) {
            //     console.log("error " + JSON.stringify(err.message));
            //     trainingUtils.hideProgress();
            //     trainingUtils.showOkDialog("Error: " + err.message);
            // });
        }
    }]);