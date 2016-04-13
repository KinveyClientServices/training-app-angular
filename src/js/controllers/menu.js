angular.module('myApp').controller('MenuCtrl', function ($scope, $timeout, $state) {

    var collateralsClick = function () {
        $state.go("app.collaterals");
    };

    var insertClick = function () {
        $state.go("app.insert");
    };

    var mediaClick = function () {
        $state.go("app.media")
    };

    var logoutClick = function () {
        $state.go("app.logout");
    };

    $scope.leftMenuItems = [
        {
            "title": "Collateral",
            "click": collateralsClick
        },
        {
            "title": "Create Todo",
            "click": insertClick
        },
        {
            "title": "Media",
            "click": mediaClick
        },
        {
            "title": "Logout",
            "click": logoutClick
        }
    ];


});