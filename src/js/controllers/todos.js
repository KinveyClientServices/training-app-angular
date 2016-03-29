'use strict';

angular.module('myApp')

    .controller('TodoCtrl', ['$scope', '$kinvey', function ($scope, $kinvey) {
        $scope.todos = [];

        var dataStore = $kinvey.DataStore.getInstance('Todo', $kinvey.DataStoreType.Sync);

        $scope.loadTodos = function () {
            dataStore.find().then(function (result) {
                $scope.todos = result;
                $scope.$digest();
            }).catch(function (err) {
                console.log("err " + JSON.stringify(err));
                alert("Error: " + err.description);
            });
        };

        $scope.loadTodos();

        $scope.pullTodos = function () {
            dataStore.pull().then(function (result) {
                console.log("todo refresh " + JSON.stringify(result));
            }).catch(function (err) {
                console.log("err " + JSON.stringify(err));
                alert("Error: " + err.description);
            });
        };

        $scope.syncTodos = function () {
            var promise = dataStore.sync().then(function (result) {
                console.log("result sync" + JSON.stringify(result));
                result = result.push;
                alert('Sync successfully ' + result.success.length + ' entities and failed to sync ' + result.error.length);
                if(result.error.length != 0){
                    console.log("sync error " + JSON.stringify(result.error));
                    var fails = [];
                    result.error.forEach(function(error){
                        fails.push({
                            entityId: error._id,
                            errorDescription: error.error.description
                        })
                    });
                    alert("Fail reasons: " + JSON.stringify(fails));
                }
            }).catch(function (err) {
                console.log("err " + JSON.stringify(err));
                alert("Error: " + err.description);
            });
        };

        $scope.pushTodos = function () {
            dataStore.push().then(function (result) {
                console.log("result push" + JSON.stringify(result));
                alert('Push successfully ' + result.success.length + ' entities and failed to push ' + result.error.length);
                if(result.error.length != 0){
                    console.log("sync error " + JSON.stringify(result.error));
                    var fails = [];
                    result.error.forEach(function(error){
                       fails.push({
                           entityId: error._id,
                           errorDescription: error.error.description
                       })
                    });
                    alert("Fail reasons: " + JSON.stringify(fails));
                }
            }).catch(function (err) {
                console.log("err " + JSON.stringify(err));
                alert("Error: " + err.description);
            });
        };

        $scope.editTodo = function (todo) {
            todo.editAction = true;
        };

        $scope.updateTodo = function (todo) {
            delete todo.editAction;
            dataStore.save(todo).then(function () {
                todo.editAction = false;
            }).catch(function (error) {
                console.log("error " + JSON.stringify(error));
                alert("Error: " + error.description);
            });
        };

        $scope.deleteTodo = function (todo, index) {
            dataStore.removeById(todo._id).then(function (res) {
                $scope.todos.splice(index, 1);
                $scope.$digest();
            }).catch(function (err) {
                console.log("delete with error " + JSON.stringify(err));
                alert("Error: " + err.description);
            });
        }

    }]);