angular.module('myApp').controller('LogoutCtrl', ['$scope', '$kinvey', 'trainingUtils', "$state", function ($scope, $kinvey, trainingUtils, $state) {

    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        viewData.enableBack = true;
    });

    function logoutKinvey(user) {
        //TODO: LAB:implement logout
        user.logout().then(successLogoutCallback).catch(errorLogoutCallback);
    }

    function successLogoutCallback() {
        console.log("logout with success");
        trainingUtils.hideProgress();
        $state.go("app.login");
    }

    function errorLogoutCallback(err) {
        console.log("logout error " + JSON.stringify(err.message));
        trainingUtils.hideProgress();
        trainingUtils.showOkDialog("Error: " + err.message);
    }

    $scope.logout = function () {
        var user = $kinvey.User.getActiveUser();
        if (user) {
            trainingUtils.showProgress();
            if (!(user._socialIdentity && user._socialIdentity.facebook)) {
                // TODO
            } else {
                facebookConnectPlugin.logout(function () {
                    console.log("facebook logout success");
                    logoutKinvey(user)
                }, errorLogoutCallback);
            }
        }
    }
}]);