'use strict';

angular.module('myApp.insert', [])

    .controller('InsertCtrl', ['$scope','$kinvey', function ($scope, $kinvey) {

        var dataStore = $kinvey.DataStore.getInstance('Todo',$kinvey.DataStoreType.Sync);
        $scope.todo = {
            action: "",
            duedate: new Date(),
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