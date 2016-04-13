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
            //var promise = $kinvey.Push.init({
            //}).then(function(response) {
            //    console.log("register push " + JSON.stringify(response));
            //}).catch(function(error) {
            //        console.log("register push error " + JSON.stringify(error));
            //    }
            //);
            trainingUtils.hideProgress();
            $scope.form = {};
            $state.go("app.main.products");
        }, function (err) {
            console.log("err " + JSON.stringify(err));
            trainingUtils.hideProgress();
            trainingUtils.showOkDialog("Error: " + err.description);
        });
    };

    $scope.micLogin = function () {
        var user = new $kinvey.User();
        //TODO: LAB: implement MIC login
        var promise = user.loginWithMIC('http://localhost:8100');
        promise.then(function (user) {
          trainingUtils.hideProgress();
          $scope.form = {};
          $state.go("app.main.products");
        }, function (err) {
            console.log("mic login error " + JSON.stringify(err));
            trainingUtils.showOkDialog("Error: " + err.description);
        });
    };

}]);