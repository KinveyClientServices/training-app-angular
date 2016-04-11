'use strict';

angular.module('myApp').controller('TodoCtrl', ['$scope', '$kinvey','trainingUtils', function ($scope, $kinvey, trainingUtils) {
        $scope.todos = [];

        //TODO: LAB: create sync data store
        var dataStore = $kinvey.DataStore.getInstance('Todo', $kinvey.DataStoreType.Sync);

        $scope.loadTodos = function () {
            trainingUtils.showProgress();
            dataStore.find().then(function (result) {
                $scope.todos = result;
                $scope.$digest();
                trainingUtils.hideProgress();
            }).catch(function (err) {
                console.log("err " + JSON.stringify(err));
                trainingUtils.hideProgress();
                trainingUtils.showOkDialog("Error: " + err.description);
            });
        };

    $scope.pullTodos = function () {
        trainingUtils.showProgress();
        dataStore.pull().then(function (result) {
            console.log("todo refresh " + JSON.stringify(result));
            $scope.todos = result;
            $scope.$digest();
            trainingUtils.hideProgress();
        }).catch(function (err) {
            console.log("err " + JSON.stringify(err));
            trainingUtils.hideProgress();
            trainingUtils.showOkDialog("Error: " + err.description);
        });
    };

        //TODO: LAB: pull data
        $scope.pullTodos();

        $scope.syncTodos = function () {
            trainingUtils.showProgress();
            var promise = dataStore.sync().then(function (syncResult) {
                console.log("result sync" + JSON.stringify(syncResult));
                var result = syncResult.push;
                trainingUtils.hideProgress();
                trainingUtils.showOkDialog('Sync successfully ' + result.success.length + ' entities and failed to sync ' + result.error.length);
                if(result.error.length != 0){
                    console.log("sync error " + JSON.stringify(result.error));
                    var fails = [];
                    result.error.forEach(function(error){
                        fails.push({
                            entityId: error._id,
                            errorDescription: error.error.description
                        })
                    });
                    trainingUtils.showOkDialog("Fail reasons: " + JSON.stringify(fails));
                }else if(syncResult.pull){
                    $scope.todos = syncResult.pull;
                }
            }).catch(function (err) {
                console.log("err " + JSON.stringify(err));
                trainingUtils.hideProgress();
                trainingUtils.showOkDialog("Error: " + err.description);
            });
        };

        //TODO: LAB: push data
        $scope.pushTodos = function () {
            trainingUtils.showProgress();
            dataStore.push().then(function (result) {
                console.log("result push" + JSON.stringify(result));
                trainingUtils.hideProgress();
                trainingUtils.showOkDialog('Push successfully ' + result.success.length + ' entities and failed to push ' + result.error.length);
                if(result.error.length != 0){
                    console.log("sync error " + JSON.stringify(result.error));
                    var fails = [];
                    result.error.forEach(function(error){
                       fails.push({
                           entityId: error._id,
                           errorDescription: error.error.description
                       })
                    });
                    trainingUtils.showOkDialog("Fail reasons: " + JSON.stringify(fails));
                }
            }).catch(function (err) {
                console.log("err " + JSON.stringify(err));
                trainingUtils.hideProgress();
                trainingUtils.showOkDialog("Error: " + err.description);
            });
        };

        $scope.editTodo = function (todo) {
            todo.editAction = true;
        };

        //TODO: LAB: update data
        $scope.updateTodo = function (todo) {
            trainingUtils.showProgress();
            delete todo.editAction;
            dataStore.save(todo).then(function () {
                todo.editAction = false;
                trainingUtils.hideProgress();
            }).catch(function (err) {
                trainingUtils.hideProgress();
                trainingUtils.showOkDialog("Error: " + err.description);
            });
        };

        //TODO: LAB: delete todo
        $scope.deleteTodo = function (todo, index) {
            trainingUtils.showProgress();
            dataStore.removeById(todo._id).then(function (res) {
                $scope.todos.splice(index, 1);
                $scope.$digest();
                trainingUtils.hideProgress();
            }).catch(function (err) {
                console.log("delete with error " + JSON.stringify(err));
                trainingUtils.hideProgress();
                trainingUtils.showOkDialog("Error: " + err.description);
            });
        }

    }]);