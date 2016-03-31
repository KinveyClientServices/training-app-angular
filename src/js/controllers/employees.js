'use strict';

angular.module('myApp').controller('EmployeesCtrl', ['$scope', '$kinvey', "$state",'trainingUtils', function ($scope, $kinvey, $state, trainingUtils) {


        $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
            viewData.enableBack = true;
        });

        $scope.employees = [];

        var dataStore = $kinvey.DataStore.getInstance('Employees', $kinvey.DataStoreType.Cache);

        $scope.loadEmployees = function () {
            trainingUtils.showProgress();
            dataStore.find().then(function (result) {
                // The entities fetched from the cache
                var cache = result.cache;
                // Return the promise for fetching the entities from the backend
                return result.networkPromise;
            }).then(function (entities) {
                console.log("employees " + JSON.stringify(entities));
                $scope.employees = entities;
                $scope.$digest();
                trainingUtils.hideProgress();
            }).catch(function (err) {
                console.log("err " + JSON.stringify(err));
                trainingUtils.hideProgress();
                trainingUtils.showOkDialog("Error: " + err.description);
            });
        };

        $scope.loadEmployees();

        $scope.addEmployee = function () {
            $state.go("app.newEmployee");
        };

        $scope.pullEmployees = function () {
            trainingUtils.showProgress();
            dataStore.pull().then(function (result) {
                console.log(JSON.stringify(result));
                trainingUtils.hideProgress();
            }).catch(function (err) {
                console.log("err " + JSON.stringify(err));
                trainingUtils.hideProgress();
                trainingUtils.showOkDialog("Error: " + err.description);
            });
        };

        $scope.pushEmployees = function () {
            trainingUtils.showProgress();
            dataStore.push().then(function (result) {
                console.log("Push result" + JSON.stringify(result));
                trainingUtils.hideProgress();
            }).catch(function (err) {
                console.log("err " + JSON.stringify(err));
                trainingUtils.hideProgress();
                trainingUtils.showOkDialog("Error: " + err.description);
            });
        };

        $scope.syncEmployees = function () {
            trainingUtils.showProgress();
            dataStore.sync().then(function (result) {
                console.log("Sync result" + JSON.stringify(result));
                $scope.loadEmployees();
            }).catch(function (err) {
                console.log("err " + JSON.stringify(err));
                trainingUtils.hideProgress();
                trainingUtils.showOkDialog("Error: " + err.description);
            });
        };
    }])
    .controller('EmployeeCtrl', ['$scope', '$kinvey', '$ionicNavBarDelegate', "$state","trainingUtils", function ($scope, $kinvey,$ionicNavBarDelegate, $state, trainingUtils) {
        $scope.employee = {};

        var dataStore = $kinvey.DataStore.getInstance('Employees', $kinvey.DataStoreType.Cache);

        $scope.saveEmployee = function (employee) {
            trainingUtils.showProgress();
            dataStore.save(employee).then(function (entity) {
                trainingUtils.hideProgress();
                $state.go('app.employees');
            }).catch(function (err) {
                console.log("error " + JSON.stringify(err));
                trainingUtils.hideProgress();
                trainingUtils.showOkDialog("Error: " + err.description);
            });
        };

        $scope.cancel = function () {
            $ionicNavBarDelegate.back()
        }

    }]);