angular.module('myApp').controller('LoginCtrl', ['$scope', '$kinvey', 'trainingUtils', function ($scope, $kinvey, trainingUtils) {

    var user = $kinvey.User.getActiveUser();
    console.log("active user " + JSON.stringify(user));
    $scope.showLogin = !user;

        $scope.login = function (username, password) {
            trainingUtils.showProgress();
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
                trainingUtils.hideProgress();
            }, function (err) {
                console.log("err " + JSON.stringify(err));
                trainingUtils.hideProgress();
                trainingUtils.showOkDialog("Error: " + err.description);
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
                trainingUtils.showOkDialog("Error: " + err.description);
            });
        };

        $scope.logout = function () {
            $kinvey.User.getActiveUser().then(function (user) {
                if (user) {
                    trainingUtils.showProgress();
                    user.logout().then(function () {
                        console.log("logout with success ");
                        $scope.showLogin = true;
                        $scope.$digest();
                        trainingUtils.hideProgress();
                    }).catch(function (err) {
                        console.log("logout error " + JSON.stringify(err));
                        trainingUtils.hideProgress();
                        trainingUtils.showOkDialog("Error: " + err.description);
                    });
                }
            })
        }
    }]);