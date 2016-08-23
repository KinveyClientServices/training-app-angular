'use strict';

angular.module('myApp').controller('PartnersCtrl',  ['$scope', '$kinvey','trainingUtils', '$state', function ($scope, $kinvey, trainingUtils, $state) {

        $scope.$on('$ionicView.beforeEnter', function () {
            $scope.search = {
                name: ""
            };
            $scope.findPartners();
        });

        $scope.partners = [];

        //TODO: LAB: create a data store to access Partner APIs
        var dataStore = $kinvey.DataStore.getInstance('Partner', $kinvey.DataStoreType.Sync);

        $scope.pullPartners = function () {
            trainingUtils.showProgress();
            //TODO: LAB: Cache data from Kinvey cloud locally
            dataStore.pull().then(function (result) {
                $scope.partners = result;
                $scope.$apply();
                trainingUtils.hideProgress();
            }).catch(function (err) {
                console.log("err " + JSON.stringify(err.message));
                trainingUtils.hideProgress();
                trainingUtils.showOkDialog("Error: " + err.message);
            });
        };

        $scope.pushPartners = function () {
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
                  var pushCount = result.success ? result.success.length : 0;
                  trainingUtils.showOkDialog('Push completed: ' + pushCount + ' entities pushed');
                }
            }).catch(function (err) {
                console.log("err " + JSON.stringify(err.message));
                trainingUtils.hideProgress();
                trainingUtils.showOkDialog("Error: " + err.message);
            });
        };

        $scope.syncPartners = function () {
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
                    $scope.partners = syncResult.pull;
                }
            }).catch(function (err) {
                console.log("err " + JSON.stringify(err.message));
                trainingUtils.hideProgress();
                trainingUtils.showOkDialog("Error: " + err.message);
            });
        };

        $scope.findPartners = function(searchName){
            trainingUtils.showProgress();
            var query = new $kinvey.Query();
            if(searchName) {
                query.matches("partnername", "^" + searchName);
            }
            //TODO: LAB: Get all Partners by query
            dataStore.find(query).subscribe(function (result) {
                $scope.partners = result;
                trainingUtils.hideProgress();
            }, function (error) {
                console.log("err " + JSON.stringify(err.message));
                trainingUtils.hideProgress();
                trainingUtils.showOkDialog("Error: " + err.message);
            }, function() {
                //completed
            });
        };
    
        $scope.addPartner = function () {
            $state.go("app.newPartner");
        };
    }])
    .controller('PartnerCtrl', ['$scope', '$kinvey', '$ionicNavBarDelegate', "$state", "trainingUtils", function ($scope, $kinvey, $ionicNavBarDelegate, $state, trainingUtils) {
        $scope.partner = {};

        //TODO: LAB: create a data store to save a partner
        var dataStore = $kinvey.DataStore.getInstance('Partner', $kinvey.DataStoreType.Sync);

        $scope.savePartner = function (partner) {
            trainingUtils.showProgress();
            console.log("partner " + JSON.stringify(partner));
            //TODO: LAB: Save a new Partner object to offline sync store
            dataStore.save(partner).then(function (entity) {
                console.log("entity " + JSON.stringify(entity));
                trainingUtils.hideProgress();
                $state.go('app.main.partners');
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
