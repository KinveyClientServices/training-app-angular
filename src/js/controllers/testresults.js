'use strict';

angular.module('myApp')

    .controller('TestResultsCtrl', ['$scope', '$kinvey','trainingUtils', function ($scope, $kinvey, trainingUtils) {
        $scope.testresults = [];

        //TODO: LAB: Create a default data store. SDK defaults to Cache Store
        var dataStore = $kinvey.DataStore.collection('TestResults');

        //TODO: LAB: Get all testresults by query
        $scope.loadTestResults = function(query){
            trainingUtils.showProgress();
            dataStore.find(query).subscribe(function (result) {
                console.log(JSON.stringify(result));
                $scope.testresults = result;
                trainingUtils.hideProgress();
            }, function(err){
                console.log("err " + JSON.stringify(err.message));
                trainingUtils.hideProgress();
                trainingUtils.showOkDialog("Error: " + err.message);
            }, function() {
                //completed
            });
        };

        $scope.loadTestResults();

        //TODO: LAB: Sort TestResults
        $scope.sortTestResults = function(){
            var query = new $kinvey.Query();
            query.descending('productname');
            $scope.loadTestResults(query)
        };

        //TODO: LAB: Limit TestResults by 4
        $scope.limitTestResults = function(){
            var query = new $kinvey.Query();
            query.limit(4);
            $scope.loadTestResults(query)
        };

        //TODO: LAB: Skip 0 and Limit 1 TestResults
        $scope.skipTestResults = function(){
            var query = new $kinvey.Query();
            query.skip(0);
            query.limit(1);
            $scope.loadTestResults(query)
        };

        //TODO: LAB: Delete a TestResult
        $scope.deleteTestResult = function (testResult, index) {
            trainingUtils.showProgress();
            dataStore.removeById(testResult._id).then(function (res) {
                $scope.testresults.splice(index, 1);
                $scope.$apply();
                trainingUtils.hideProgress();
            }).catch(function (err) {
                console.log("delete test result error " + JSON.stringify(err.message));
                trainingUtils.hideProgress();
                trainingUtils.showOkDialog("Error: " + err.message);
            });
        }
    }]);