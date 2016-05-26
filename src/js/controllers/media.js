'use strict';

angular.module('myApp').controller('MediaCtrl', ['$scope', '$kinvey', "$state", "trainingUtils", function ($scope, $kinvey, $state, trainingUtils) {

        $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
            viewData.enableBack = true;
        });

        $scope.medias = [];

        //TODO: LAB: Create a Network Data Store
        var dataStore = $kinvey.DataStore.getInstance('Media', $kinvey.DataStoreType.Network);

        $scope.loadMedia = function () {
            trainingUtils.showProgress();
            dataStore.find().subscribe(function (entities) {
                $scope.medias = entities;
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

        $scope.loadMedia();

        $scope.addMedia = function () {
            $state.go("app.newMedia");
        };

        $scope.editMedia = function (media) {
            media.editAction = true;
        };

        //TODO: LAB: Update Media
        $scope.updateMedia = function (media) {
            delete media.editAction;
            trainingUtils.showProgress();
            dataStore.save(media).then(function () {
                media.editAction = false;
                trainingUtils.hideProgress();
            }).catch(function (err) {
                console.log("error " + JSON.stringify(err.message));
                trainingUtils.hideProgress();
                trainingUtils.showOkDialog("Error: " + err.message);
            });
        };

        //TODO: LAB: Delete Media
        $scope.deleteMedia = function (media, index) {
            trainingUtils.showProgress();
            dataStore.removeById(media._id).then(function (res) {
                $scope.medias.splice(index, 1);
                $scope.$apply();
                trainingUtils.hideProgress();
            }).catch(function (err) {
                console.log("delete with error " + JSON.stringify(err.message));
                trainingUtils.hideProgress();
                trainingUtils.showOkDialog("Error: " + err.message);
            });
        }


    }])
    .controller('MediaEntityCtrl', ['$scope', '$kinvey', '$ionicNavBarDelegate', "$state", "trainingUtils", function ($scope, $kinvey, $ionicNavBarDelegate, $state, trainingUtils) {

        $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
            viewData.enableBack = true;
        });

        $scope.media = {};

        var dataStore = $kinvey.DataStore.getInstance('Media', $kinvey.DataStoreType.Network);

        $scope.saveMedia = function (media) {
            trainingUtils.showProgress();
            dataStore.save(media).then(function (entity) {
                trainingUtils.hideProgress();
                $state.go('app.media');
            }).catch(function (err) {
                console.log("error " + JSON.stringify(err.message));
                trainingUtils.hideProgress();
                trainingUtils.showOkDialog("Error: " + err.message);
            });
        };

        $scope.cancel = function () {
            $ionicNavBarDelegate.back();
        }

    }]);