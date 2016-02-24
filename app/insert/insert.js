'use strict';

angular.module('myApp.insert', [])

    .controller('InsertCtrl', ['$scope','$kinvey','$state', function ($scope, $kinvey, $state) {

        var dataStore = $kinvey.DataStore.getInstance('todo',$kinvey.DataStoreType.Sync);
        $scope.todo = {
            action: "",
            duedate: "",
            completed:false
        };

        $scope.insert = function (todo) {
            dataStore.save(todo).then(function (entity) {
                alert("Todo was added with success");
                //$state.go('todos');
            }).catch(function (err) {
                console.log("error " + JSON.stringify(err));
                alert("Error: " + err.description);
            });
        }
    }]);