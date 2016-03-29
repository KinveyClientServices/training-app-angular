'use strict';

angular.module('myApp').controller('MediaCtrl', ['$scope', '$kinvey', "$state", function ($scope, $kinvey, $state) {

        $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
            viewData.enableBack = true;
        });

        $scope.medias = [];

        var dataStore = $kinvey.DataStore.getInstance('Media', $kinvey.DataStoreType.Network);

        $scope.loadMedia = function () {
            dataStore.find().then(function (entities) {
                $scope.medias = entities;
                $scope.$digest();
            }).catch(function (error) {
                console.log("err " + JSON.stringify(err));
                alert("Error: " + err.description);
            });
        };

        $scope.loadMedia();

        $scope.addMedia = function () {
            $state.go("app.newMedia");
        };

        $scope.editMedia = function (media) {
            media.editAction = true;
        };

        $scope.updateMedia = function (media) {
            delete media.editAction;
            dataStore.save(media).then(function () {
                media.editAction = false;
            }).catch(function (error) {
                console.log("error " + JSON.stringify(error));
                alert("Error: " + error.description);
            });
        };

        $scope.deleteMedia = function (media, index) {
            dataStore.removeById(media._id).then(function (res) {
                $scope.medias.splice(index, 1);
                $scope.$digest();
            }).catch(function (err) {
                console.log("delete with error " + JSON.stringify(err));
                alert("Error: " + err.description);
            });
        }


    }])
    .controller('MediaEntityCtrl', ['$scope', '$kinvey', '$ionicNavBarDelegate', "$state", function ($scope, $kinvey, $ionicNavBarDelegate, $state) {

        $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
            viewData.enableBack = true;
        });

        $scope.media = {};

        var dataStore = $kinvey.DataStore.getInstance('Media', $kinvey.DataStoreType.Network);

        $scope.saveMedia = function (media) {
            dataStore.save(media).then(function (entity) {
                $state.go('app.media');
            }).catch(function (err) {
                console.log("error " + JSON.stringify(err));
                alert("Error: " + err.description);
            });
        };

        $scope.cancel = function () {
            $ionicNavBarDelegate.back();
        }

    }]);