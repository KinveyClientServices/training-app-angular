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
                //$scope.employees = result;
                //$scope.$digest();
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

        $scope.syncEmployees = function () {
            trainingUtils.showProgress();
            dataStore.sync().then(function (syncResult) {
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
                    $scope.employees = syncResult.pull;
                }
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