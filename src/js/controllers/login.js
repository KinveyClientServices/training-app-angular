angular.module('myApp').controller('LoginCtrl', ['$scope', '$kinvey', 'trainingUtils', "$state", "$ionicSideMenuDelegate", function ($scope, $kinvey, trainingUtils, $state, $ionicSideMenuDelegate) {

    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        viewData.enableBack = false;
    });

    $scope.$on('$ionicView.enter', function(){
        $ionicSideMenuDelegate.canDragContent(false);
    });

    $scope.form = {};

    $scope.login = function (username, password) {
        trainingUtils.showProgress();
        var user = new $kinvey.User();
        //TODO: LAB: implement user login
        var promise = user.login(username, password);
        promise.then(function (user) {
            registerPush();
            trainingUtils.hideProgress();
            $scope.form = {};
            $state.go("app.main.products");
        }, function (err) {
            console.log("err " + JSON.stringify(err.message));
            trainingUtils.hideProgress();
            trainingUtils.showOkDialog("Error: " + err.message);
        });
    };

    $scope.micLogin = function () {
        var user = new $kinvey.User();
        //TODO: LAB: implement MIC login
        var promise = user.loginWithMIC('http://localhost:8100');
        promise.then(function (user) {
          trainingUtils.hideProgress();
          $scope.form = {};
          registerPush();
          $state.go("app.main.products");
        }, function (err) {
            console.log("mic login error " + JSON.stringify(err.message));
            trainingUtils.showOkDialog("Error: " + err.message);
        });
    };

    $scope.loginFB = function(){
        if (!facebookConnectPlugin) {
            trainingUtils.showOkDialog("Facebook plugin installation error");
        } else {
            //get facebook access_token and expires_in parameters
            facebookConnectPlugin.getLoginStatus(function (success) {
                console.log("facebook login status: " + JSON.stringify(success));
                if (success.status === 'connected') {
                    // The user is logged in and has authenticated your app, and response.authResponse supplies
                    // the user's ID, a valid access token, a signed request, and the time the access token
                    // and signed request each expire
                    kinveyFBLogin(success.authResponse.accessToken, success.authResponse.expiresIn);
                } else {
                    // Ask the permissions you need. You can learn more about
                    // FB permissions here: https://developers.facebook.com/docs/facebook-login/permissions/v2.4
                    facebookConnectPlugin.login(['email', 'public_profile'], function(success){
                        kinveyFBLogin(success.authResponse.accessToken, success.authResponse.expiresIn);
                    }, function(err){
                        console.log("facebook login error " + JSON.stringify(err));
                        trainingUtils.showOkDialog("Error: " + JSON.stringify(err));
                    });
                }
            });
        }

        function kinveyFBLogin(accessToken, expiresIn){
            trainingUtils.showProgress();
            var token = {
                access_token: accessToken,
                expires_in: expiresIn
            };
            var user = new $kinvey.User();
            var promise = user.connect($kinvey.SocialIdentity.Facebook, token);
            promise.then(function(user) {
                console.log("login user " + JSON.stringify(user));
                registerPush();
                trainingUtils.hideProgress();
                $state.go("app.main.products");
            }).catch(function(error) {
                console.log("facebook login error " + JSON.stringify(error));
                trainingUtils.hideProgress();
                trainingUtils.showOkDialog("Error: " + error.message);
            });
        }

    };

    function registerPush() {
        var promise = $kinvey.Push.register({
            android: {
                senderID: '856811466642'
            },
            ios: {
                alert: true,
                badge: true,
                sound: true
            }
        }).then(function (response) {
            console.log("register push " + JSON.stringify(response));
        }).catch(function (error) {
                console.log("register push error " + JSON.stringify(error));
                trainingUtils.showOkDialog("Error: " + error.message);
            }
        );
    }
}]);