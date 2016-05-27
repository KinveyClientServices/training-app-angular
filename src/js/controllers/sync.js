'use strict';

angular.module('myApp')
    .controller('SyncCtrl', ['$scope', '$kinvey', 'trainingUtils', function ($scope, $kinvey, trainingUtils) {

        $scope.workOrderCount = 0;

        var workOrderDataStore = $kinvey.DataStore.getInstance('WorkOrder', $kinvey.DataStoreType.Sync),
            employeesDataStore = $kinvey.DataStore.getInstance('Employees', $kinvey.DataStoreType.Network);

        $scope.generateData = function (count) {
            trainingUtils.showProgress();
            getEmployees(function (employees) {
                generateWorkOrders(employees, count, function () {
                    trainingUtils.hideProgress();
                    trainingUtils.showOkDialog(count + " WorkOrder entities were generated");
                })
            });
        };

        $scope.bulkSync = function () {
            trainingUtils.showProgress();
            workOrderDataStore.sync().then(function (syncResult) {
                var result = syncResult.push;
                trainingUtils.hideProgress();
                if (result.error && result.error.length != 0) {
                    trainingUtils.showOkDialog('Sync Completed: ' + result.error.length + 'entities failed to sync');
                    console.log("sync error " + JSON.stringify(result.error));
                    var fails = [];
                    result.error.forEach(function (error) {
                        fails.push({
                            entityId: error._id,
                            errorDescription: error.error.description
                        })
                    });
                    trainingUtils.showOkDialog("Sync Failure: " + JSON.stringify(fails));
                } else if (syncResult.pull) {
                    trainingUtils.showOkDialog('Sync Completed');
                }
            }).catch(function (err) {
                console.log("err " + JSON.stringify(err.message));
                trainingUtils.hideProgress();
                trainingUtils.showOkDialog("Error: " + err.message);
            });

        };

        function getEmployees(callback) {
            employeesDataStore.find().then(function (employees) {
                return callback(employees)
            }).catch(function (err) {
                console.log("err " + JSON.stringify(err.message));
                trainingUtils.hideProgress();
                trainingUtils.showOkDialog("Error: " + err.message);
            });
        }

        function generateWorkOrders(employees, workOrderCount, callback) {
            var employeesCount = employees.length,
                workOrders = [];
            for (var i = 0; i < workOrderCount; i++) {
                var workOrderEntity = {
                    "title": Date.now(),
                    "employee_id": employees[i % employeesCount]._id
                };
                workOrders.push(workOrderEntity);
            }

            workOrderDataStore.save(workOrders).then(function (res) {
                return callback()
            }).catch(function (err) {
                console.log("err " + JSON.stringify(err.message));
                trainingUtils.hideProgress();
                trainingUtils.showOkDialog("Error: " + err.message);
            });
        }
    }]);