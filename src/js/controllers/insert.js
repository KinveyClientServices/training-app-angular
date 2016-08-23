'use strict';

angular.module('myApp').controller('InsertCtrl', ['$scope', '$kinvey','trainingUtils', function ($scope, $kinvey, trainingUtils) {

        $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
            viewData.enableBack = true;
        });

        var dataStore = $kinvey.DataStore.getInstance('WaniTodo',$kinvey.DataStoreType.Sync);

        //TODO: LAB: Define Todo JSON
        $scope.todo = {
            action: "",
            duedate: new Date(),
            completed:false
        };

        //TODO: LAB: Create a Todo
        $scope.insert = function (todo) {
            console.log("Here to add Todo");
            trainingUtils.showProgress();
            var promise = dataStore.save(todo).then(function(entity) {
                console.log("local insert " + JSON.stringify(entity));
                trainingUtils.hideProgress();
                trainingUtils.showOkDialog("Todo was added with success");
            }).catch(function(err) {
                console.log("local insert with error " + JSON.stringify(err.message));
                trainingUtils.hideProgress();
                trainingUtils.showOkDialog("Error: " + err.message);
            });
        }
    }]);