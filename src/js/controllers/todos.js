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
        trainingUtils.hideProgress();
    };

    $scope.pullTodos();

    //TODO: LAB: sync Todos
    $scope.syncTodos = function () {
        trainingUtils.showProgress();
        trainingUtils.hideProgress();
    };

    //TODO: LAB: push Todos
    $scope.pushTodos = function () {
        trainingUtils.showProgress();
        trainingUtils.hideProgress();
    };

    $scope.editTodo = function (todo) {
        todo.editAction = true;
    };

    //TODO: LAB: update Todos
    $scope.updateTodo = function (todo) {
        trainingUtils.showProgress();
        delete todo.editAction;
        trainingUtils.hideProgress();
    };

    //TODO: LAB: delete Todos
    $scope.deleteTodo = function (todo, index) {
        trainingUtils.showProgress();
        trainingUtils.hideProgress();
    }

}]);