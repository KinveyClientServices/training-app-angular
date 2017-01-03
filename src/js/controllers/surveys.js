'use strict';

angular.module('myApp').controller('SurveysCtrl',  ['$scope', '$kinvey','trainingUtils', '$state', function ($scope, $kinvey, trainingUtils, $state) {

        $scope.$on('$ionicView.beforeEnter', function () {
            $scope.search = {
                name: ""
            };
            $scope.findSurveys();
        });

        $scope.surveys = [];

        //TODO: LAB: create a data store to access Survey APIs
        var dataStore = $kinvey.DataStore.collection('Surveys', $kinvey.DataStoreType.Sync);
        dataStore.useDeltaFetch = true;

        $scope.pullSurveys = function () {
            trainingUtils.showProgress();
          //TODO: LAB: Cache data from Kinvey cloud locally
            var query = new $kinvey.Query();
            dataStore.pull(query).then(function (result) {
                $scope.surveys = result;
                $scope.$apply();
                trainingUtils.hideProgress();
            }).catch(function (err) {
                console.log("err " + JSON.stringify(err.message));
                trainingUtils.hideProgress();
                trainingUtils.showOkDialog("Error: " + err.message);
            });
        };

        $scope.pushSurveys = function () {
            trainingUtils.showProgress();
          //TODO: LAB: Push offline changes to Kinvey
            dataStore.push().then(function (result) {
                console.log("result push" + JSON.stringify(result));
                trainingUtils.hideProgress();
                if(result.error && result.error.length != 0){
                    trainingUtils.showOkDialog('Push completed: ' + result.success.length + ' entities succeeded and ' + result.error.length + 'entities failed');
                    console.log("push error " + JSON.stringify(result.error));
                    var fails = [];
                    result.error.forEach(function(error){
                        fails.push({
                            entityId: error._id,
                            errorDescription: error.error.description
                        })
                    });
                    trainingUtils.showOkDialog("Push Failure: " + JSON.stringify(fails));
                } else {
                  var pushCount = result ? result.length : 0;
                  trainingUtils.showOkDialog('Push completed: ' + pushCount + ' entities pushed');
                }
            }).catch(function (err) {
                console.log("err " + JSON.stringify(err.message));
                trainingUtils.hideProgress();
                trainingUtils.showOkDialog("Error: " + err.message);
            });
        };

        $scope.syncSurveys = function () {
            trainingUtils.showProgress();
          //TODO: LAB: sync cached changes and get new updates
            dataStore.sync().then(function (syncResult) {
                console.log("result sync" + JSON.stringify(syncResult));
                var result = syncResult.push;
                trainingUtils.hideProgress();
                if(result.error && result.error.length != 0){
                  trainingUtils.showOkDialog('Sync Completed: ' + result.error.length + 'entities failed to sync');
                    console.log("sync error " + JSON.stringify(result.error));
                    var fails = [];
                    result.error.forEach(function(error){
                        fails.push({
                            entityId: error._id,
                            errorDescription: error.error.description
                        })
                    });
                    trainingUtils.showOkDialog("Sync Failure: " + JSON.stringify(fails));
                }else if(syncResult.pull){
                    trainingUtils.showOkDialog('Sync Completed');
                    $scope.surveys = syncResult.pull;
                }
            }).catch(function (err) {
                console.log("err " + JSON.stringify(err.message));
                trainingUtils.hideProgress();
                trainingUtils.showOkDialog("Error: " + err.message);
            });
        };

        $scope.findSurveys = function(searchName){
            trainingUtils.showProgress();
            var query = new $kinvey.Query();
            if(searchName) {
                query.matches("surveyname", "^" + searchName);
            }
            //TODO: LAB: Get all Surveys by query
            dataStore.find(query).subscribe(function (result) {
                $scope.surveys = result;
                trainingUtils.hideProgress();
            }, function (error) {
                console.log("err " + JSON.stringify(err.message));
                trainingUtils.hideProgress();
                trainingUtils.showOkDialog("Error: " + err.message);
            }, function() {
                //completed
            });
        };
    
        $scope.addSurvey = function () {
            $state.go("app.submitSurvey");
        };
    }])
    .controller('SubmitSurveyCtrl', ['$scope', '$kinvey', '$ionicNavBarDelegate', "$state", "trainingUtils", function ($scope, $kinvey, $ionicNavBarDelegate, $state, trainingUtils) {
        $scope.survey = {};

        //TODO: LAB: create a data store to save a survey
        var dataStore = $kinvey.DataStore.collection('Surveys', $kinvey.DataStoreType.Sync);

        $scope.saveSurvey = function (survey) {
            trainingUtils.showProgress();
            console.log("survey " + JSON.stringify(survey));
          //TODO: LAB: Save a new Survey object to offline sync store
            dataStore.save(survey).then(function (entity) {
                console.log("entity " + JSON.stringify(entity));
                trainingUtils.hideProgress();
                $state.go('app.main.surveys');
            }).catch(function (err) {
                console.log("error " + JSON.stringify(err.message));
                trainingUtils.hideProgress();
                trainingUtils.showOkDialog("Error: " + err.message);
            });
        };

        $scope.cancel = function () {
            $ionicNavBarDelegate.back()
        }

    }]);
