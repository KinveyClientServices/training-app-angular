'use strict';

angular.module('myApp').controller('EmployeesCtrl', ['$scope', '$kinvey', "$state", function ($scope, $kinvey, $state) {


        $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
            viewData.enableBack = true;
        });

        $scope.employees = [];

        var dataStore = $kinvey.DataStore.getInstance('Employees', $kinvey.DataStoreType.Cache);

        $scope.loadEmployees = function () {
            dataStore.find().then(function (result) {
                // The entities fetched from the cache
                var cache = result.cache;
                // Return the promise for fetching the entities from the backend
                return result.networkPromise;
            }).then(function (entities) {
                console.log("employees " + JSON.stringify(entities));
                $scope.employees = entities;
                $scope.$digest();
            }).catch(function (error) {
                console.log("err " + JSON.stringify(err));
                alert("Error: " + err.description);
            });
        };

        $scope.loadEmployees();

        $scope.addEmployee = function () {
            $state.go("app.newEmployee");
        };

        $scope.pullEmployees = function () {
            dataStore.pull().then(function (result) {
                console.log(JSON.stringify(result));
            }).catch(function (err) {
                console.log("err " + JSON.stringify(err));
                alert("Error: " + err.description);
            });
        };

        $scope.pushEmployees = function () {
            dataStore.push().then(function (result) {
                console.log("Push result" + JSON.stringify(result));
            }).catch(function (err) {
                console.log("err " + JSON.stringify(err));
                alert("Error: " + err.description);
            });
        };

        $scope.syncEmployees = function () {
            var promise = dataStore.sync().then(function (result) {
                console.log("Sync result" + JSON.stringify(result));
                $scope.loadEmployees();
            }).catch(function (error) {
                console.log("err " + JSON.stringify(err));
                alert("Error: " + err.description);
            });
        };
    }])
    .controller('EmployeeCtrl', ['$scope', '$kinvey', '$ionicNavBarDelegate', "$state", function ($scope, $kinvey,$ionicNavBarDelegate, $state) {
        $scope.employee = {};

        var dataStore = $kinvey.DataStore.getInstance('Employees', $kinvey.DataStoreType.Cache);

        $scope.saveEmployee = function (employee) {
            dataStore.save(employee).then(function (entity) {
                $state.go('app.employees');
            }).catch(function (err) {
                console.log("error " + JSON.stringify(err));
                alert("Error: " + err.description);
            });
        };

        $scope.cancel = function () {
            $ionicNavBarDelegate.back()
        }

    }]);