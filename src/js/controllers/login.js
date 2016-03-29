angular.module('myApp').controller('LoginCtrl', ['$scope', '$kinvey', function ($scope, $kinvey) {

    var promise = $kinvey.User.getActiveUser();
    promise.then(function(user) {
        if (user) {
            return user.me();
        }
        return user;
    }).then(function(user) {
        $scope.showLogin = !user;
        $scope.$digest();
    }).catch(function(error) {
        alert("return error " + JSON.stringify(error));
        $scope.showLogin = false;
        $scope.$digest();
    });

        $scope.login = function (username, password) {
            var user = new $kinvey.User();
            var promise = user.login(username, password);
            promise.then(function (user) {
                //var promise = $kinvey.Push.init({
                //}).then(function(response) {
                //    console.log("register push " + JSON.stringify(response));
                //}).catch(function(error) {
                //        console.log("register push error " + JSON.stringify(error));
                //    }
                //);
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
                if (user) {
                    user.logout().then(function () {
                        console.log("logout with success ");
                        $scope.showLogin = true;
                        $scope.$digest();
                    }).catch(function (err) {
                        console.log("logout error " + JSON.stringify(err));
                        alert("Error: " + err.description);
                    });
                }
            })
        }
    }]);