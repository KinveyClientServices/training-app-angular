'use strict';

angular.module('myApp').controller('PartnersCtrl',  ['$scope', '$kinvey','trainingUtils', '$state', function ($scope, $kinvey, trainingUtils, $state) {
        $scope.partners = [];

        var dataStore = $kinvey.DataStore.getInstance('Partner', $kinvey.DataStoreType.Cache);

        //TODO: LAB: Get all Partners by query
        $scope.loadPartners = function(query){
            trainingUtils.showProgress();
            dataStore.find().then(function (result) {
                $scope.partners = result.cache;
                return result.networkPromise;
            }).then(function (partners) {
                $scope.partners = partners;
                $scope.$apply();
                trainingUtils.hideProgress();
            }).catch(function(err){
                console.log("err " + JSON.stringify(err));
                trainingUtils.hideProgress();
                trainingUtils.showOkDialog("Error: " + err.description);
            });
        };
        $scope.loadPartners();


        $scope.addPartner = function () {
            console.log("add partner");
            $state.go("app.newPartner");
        };

        //TODO: LAB: Cache data from Kinvey locally
        $scope.pullPartners = function () {
            trainingUtils.showProgress();
            dataStore.pull().then(function (result) {
                console.log(JSON.stringify(result));
                //$scope.partners = result;
                //$scope.$apply();
                trainingUtils.hideProgress();
            }).catch(function (err) {
                console.log("err " + JSON.stringify(err));
                trainingUtils.hideProgress();
                trainingUtils.showOkDialog("Error: " + err.description);
            });
        };

        //TODO: LAB: Push cached changes to Kinvey
        $scope.pushPartners = function () {
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

        //TODO: LAB: sync cached changes and get new updates
        $scope.syncPartners = function () {
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
                    $scope.partners = syncResult.pull;
                }
            }).catch(function (err) {
                console.log("err " + JSON.stringify(err));
                trainingUtils.hideProgress();
                trainingUtils.showOkDialog("Error: " + err.description);
            });
        };
    }])
    .controller('PartnerCtrl', ['$scope', '$kinvey', '$ionicNavBarDelegate', "$state", "trainingUtils", function ($scope, $kinvey, $ionicNavBarDelegate, $state, trainingUtils) {
        $scope.partner = {};

        var dataStore = $kinvey.DataStore.getInstance('Partner', $kinvey.DataStoreType.Cache);

        $scope.savePartner = function (partner) {
            trainingUtils.showProgress();
            console.log("partner " + JSON.stringify(partner));
            dataStore.save(partner).then(function (entity) {
                console.log("entity " + JSON.stringify(entity));
                trainingUtils.hideProgress();
                $state.go('app.main.partners');
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
