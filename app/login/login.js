'use strict';

angular.module('myApp.login', [])

    .controller('LoginCtrl', ['$scope', '$kinvey', '$location', function ($scope, $kinvey, $location) {
        $kinvey.User.getActiveUser().then(function (user) {
            console.log("active user " + JSON.stringify(user));
            $scope.showLogin = !user;
        });

        $scope.login = function (username, password) {
            var user = new $kinvey.User();
            var promise = user.login(username, password);
            promise.then(function (user) {
                $scope.showLogin = false;
                $scope.$digest();
            }, function (err) {
                console.log("err " + JSON.stringify(err));
                alert("Error: " + err.description);
            });
        };

        $scope.micLogin = function () {
            var user = new $kinvey.User();
            var promise = user.loginWithMIC('http://localhost:8000/app/index.html');
            promise.then(function (user) {
                $scope.showLogin = false;
                $scope.$digest();
            }, function (err) {
                console.log("mic login error " + JSON.stringify(err));
                alert("Error: " + err.description);
            });
        };

        $scope.logout = function () {
            $kinvey.User.getActiveUser().then(function (user) {
                    user.logout().then(function () {
                        console.log("logout with success ");
                        $scope.showLogin = true;
                        $scope.$digest();
                }).catch(function(err){
                console.log("logout error " + JSON.stringify(err));
                alert("Error: " + err.description);
            });
        })
        }
    }]);