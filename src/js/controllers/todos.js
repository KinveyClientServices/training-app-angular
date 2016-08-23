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
    var dataStore = $kinvey.DataStore.getInstance('WaniToDo', $kinvey.DataStoreType.Sync);

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
        // console.log("pullTodos");
        trainingUtils.showProgress();
        var promise = dataStore.pull().then(function(entities) {
            console.log("pullTodos data - ");
            console.log("pullTodos data - " + JSON.stringify(entities));
            $scope.todos = entities;
            $scope.$apply();
            trainingUtils.hideProgress();
        }).catch(function(err) {
            console.log("err " + JSON.stringify(err.message));
            trainingUtils.hideProgress();
            trainingUtils.showOkDialog("Error: " + err.message);
        });
   };

    // $scope.pullTodos();

    //TODO: LAB: sync Todos
    $scope.syncTodos = function () {
        trainingUtils.showProgress();
        var promise = dataStore.sync().then(function(result) {
            console.log("syncTodos data - " + JSON.stringify(result));
            $scope.todos = result;
            $scope.$apply();
            trainingUtils.hideProgress();
        }, function (err) {
            console.log("err " + JSON.stringify(err.message));
            trainingUtils.hideProgress();
            trainingUtils.showOkDialog("Error: " + err.message);
        });
    };

    //TODO: LAB: push Todos
    $scope.pushTodos = function () {
        trainingUtils.showProgress();
        var promise = dataStore.push().then(function(result) {
            console.log("pushTodos data - " + JSON.stringify(result));
            // $scope.todos = result;
            // $scope.$apply();
            trainingUtils.hideProgress();
        }).catch(function(err) {
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
        var promise = dataStore.save(todo).then(function(entity) {
            trainingUtils.hideProgress();
        }).catch(function(err) {
            console.log("local update with error " + JSON.stringify(err.message));
            trainingUtils.hideProgress();
            trainingUtils.showOkDialog("Error: " + err.message);
        });
    };

    //TODO: LAB: delete Todos
    $scope.deleteTodo = function (todo, index) {
        trainingUtils.showProgress();
        var promise = dataStore.removeById(todo._id).then(function (result) {
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