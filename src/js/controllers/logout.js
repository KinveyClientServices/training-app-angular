angular.module('myApp').controller('LogoutCtrl', ['$scope', '$kinvey', 'trainingUtils', "$state", function ($scope, $kinvey, trainingUtils, $state) {

    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        viewData.enableBack = true;
    });

    $scope.logout = function () {
        var user = $kinvey.User.getActiveUser();
        if (user) {
            trainingUtils.showProgress();
            //TODO: LAB:implement logout
            user.logout().then(function () {
                console.log("logout with success");
                trainingUtils.hideProgress();
                $state.go("app.login");
            }).catch(function (err) {
                console.log("logout error " + JSON.stringify(err));
                trainingUtils.hideProgress();
                trainingUtils.showOkDialog("Error: " + err.description);
            });
        }
    }
}]);