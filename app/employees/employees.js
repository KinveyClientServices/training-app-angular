'use strict';

angular.module('myApp.employees', [])

    .controller('EmployeesCtrl', ['$scope', '$kinvey', "$uibModal", function ($scope, $kinvey, $uibModal) {
        $scope.employees = [];

        var dataStore = $kinvey.DataStore.getInstance('Employees', $kinvey.DataStoreType.Cache);

        $scope.loadEmployees = function () {
            dataStore.find().then(function(result) {
                // The entities fetched from the cache
                var cache = result.cache;
                // Return the promise for fetching the entities from the backend
                return result.networkPromise;
            }).then(function(entities) {
                console.log("employees " + JSON.stringify(entities));
                $scope.employees = entities;
                $scope.$digest();
            }).catch(function(error) {
                console.log("err " + JSON.stringify(err));
                alert("Error: " + err.description);
            });
        };

        $scope.loadEmployees();

        $scope.addEmployee = function () {
            $uibModal.open({
                animation: true,
                templateUrl: 'employees/employee.html',
                controller: "EmployeeCtrl",
                resolve: {
                    employee: function () {
                        return {};
                    }
                }
            }).result.then(function (employee) {
                $scope.employees.push(employee);
                return employee;
            });
        };

        $scope.pullEmployees = function(){
            dataStore.pull().then(function (result) {
                console.log(JSON.stringify(result));
            }).catch(function (err) {
                console.log("err " + JSON.stringify(err));
                alert("Error: " + err.description);
            });
        };

        $scope.pushEmployees = function(){
            dataStore.push().then(function (result) {
                console.log("Push result" + JSON.stringify(result));
            }).catch(function (err) {
                console.log("err " + JSON.stringify(err));
                alert("Error: " + err.description);
            });
        };

        $scope.syncEmployees = function () {
            var promise = dataStore.sync().then(function(result) {
                console.log("Sync result" + JSON.stringify(result));
                $scope.loadEmployees();
            }).catch(function(error) {
                console.log("err " + JSON.stringify(err));
                alert("Error: " + err.description);
            });
        };
    }])
    .controller('EmployeeCtrl', ['$scope', '$kinvey', "$uibModalInstance", function ($scope, $kinvey, $uibModalInstance) {
        $scope.employee = {};

        var dataStore = $kinvey.DataStore.getInstance('Employees', $kinvey.DataStoreType.Cache);

        $scope.saveEmployee = function (employee) {
            dataStore.save(employee).then(function (entity) {
                $uibModalInstance.close(employee);
            }).catch(function (err) {
                console.log("error " + JSON.stringify(err));
                alert("Error: " + err.description);
            });
        };

        $scope.cancel = function () {
            $uibModalInstance.close();
        }

    }]);