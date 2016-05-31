'use strict';

angular.module('myApp').controller('TodoCtrl', ['$scope', '$kinvey','trainingUtils', function ($scope, $kinvey, trainingUtils) {

    $scope.$on('$ionicView.beforeEnter', function () {
        $scope.search = {
            action: ""
        };
        $scope.loadTodos();
    });

    $scope.todos = [];

    //TODO: LAB: create sync data store
    var dataStore = $kinvey.DataStore.getInstance('Todo', $kinvey.DataStoreType.Sync);

    //TODO: LAB: get all Todos
    //$scope.todos
    $scope.loadTodos = function (searchAction) {
        trainingUtils.showProgress();
        var query = new $kinvey.Query();
        searchAction = searchAction ? searchAction : "";
        query.matches("action","^" + searchAction);
        dataStore.find(query).subscribe(function (result) {
            $scope.todos = result;
            $scope.$apply();
            trainingUtils.hideProgress();
        }, function (err) {
            console.log("err " + JSON.stringify(err.message));
            trainingUtils.hideProgress();
            trainingUtils.showOkDialog("Error: " + err.message);
        }, function() {
            //completed
        });
    };

    //TODO: LAB: pull Todos
    $scope.pullTodos = function () {
        trainingUtils.showProgress();
        dataStore.pull().then(function (result) {
            console.log("todo refresh " + JSON.stringify(result));
            $scope.todos = result;
            $scope.$apply();
            trainingUtils.hideProgress();
        }).catch(function (err) {
            console.log("err " + JSON.stringify(err.message));
            trainingUtils.hideProgress();
            trainingUtils.showOkDialog("Error: " + err.message);
        });
    };

    $scope.pullTodos();

    //TODO: LAB: sync Todos
    $scope.syncTodos = function () {
        trainingUtils.showProgress();
        var promise = dataStore.sync().then(function (syncResult) {
            console.log("result sync" + JSON.stringify(syncResult));
            var result = syncResult.push;
            trainingUtils.hideProgress();
            if(result.error && result.error.length != 0){
                trainingUtils.showOkDialog('Sync Completed: ' + result.error.length + "entities failed to sync");
                console.log("sync error " + JSON.stringify(result.error));
                var fails = [];
                result.error.forEach(function(error){
                    fails.push({
                        entityId: error._id,
                        errorDescription: error.error.description
                    })
                });
                trainingUtils.showOkDialog("Sync Failure: " + JSON.stringify(fails));
            } else if(syncResult.pull != null) {
                trainingUtils.showOkDialog("Sync Completed");
                $scope.todos = syncResult.pull;
            } else {
                trainingUtils.showOkDialog("Sync Completed");
            }
        }).catch(function (err) {
            console.log("err " + JSON.stringify(err.message));
            trainingUtils.hideProgress();
            trainingUtils.showOkDialog("Error: " + err.message);
        });
    };

    //TODO: LAB: push Todos
    $scope.pushTodos = function () {
        trainingUtils.showProgress();
        dataStore.push().then(function (result) {
            console.log("result push" + JSON.stringify(result));
            trainingUtils.hideProgress();
            if(result.error && result.error.length != 0){
                trainingUtils.showOkDialog('Push completed: ' + result.error.length + 'entities failed');
                console.log("sync error " + JSON.stringify(result.error));
                var fails = [];
                result.error.forEach(function(error){
                   fails.push({
                       entityId: error._id,
                       errorDescription: error.error.description
                   })
                });
                trainingUtils.showOkDialog("Push Failure: " + JSON.stringify(fails));
            } else {
                var pushCount = result.success ? result.success.length : 0;
                trainingUtils.showOkDialog('Push completed: ' + pushCount + ' entities succeeded');
            }
        }).catch(function (err) {
            console.log("err " + JSON.stringify(err.message));
            trainingUtils.hideProgress();
            trainingUtils.showOkDialog("Error: " + err.message);
        });
    };

    $scope.editTodo = function (todo) {
        todo.editAction = true;
    };

    //TODO: LAB: update Todos
    $scope.updateTodo = function (todo) {
        trainingUtils.showProgress();
        delete todo.editAction;
        dataStore.save(todo).then(function () {
            todo.editAction = false;
            trainingUtils.hideProgress();
        }).catch(function (err) {
            trainingUtils.hideProgress();
            trainingUtils.showOkDialog("Error: " + err.message);
        });
    };

    //TODO: LAB: delete Todos
    $scope.deleteTodo = function (todo, index) {
        trainingUtils.showProgress();
        dataStore.removeById(todo._id).then(function (res) {
            $scope.todos.splice(index, 1);
            $scope.$apply();
            trainingUtils.hideProgress();
        }).catch(function (err) {
            console.log("delete with error " + JSON.stringify(err.message));
            trainingUtils.hideProgress();
            trainingUtils.showOkDialog("Error: " + err.message);
        });
    }

}]);