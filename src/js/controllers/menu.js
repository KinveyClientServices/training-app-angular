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

    var employeesClick = function () {
        $state.go("app.employees");
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
            "title": "Employees",
            "click": employeesClick
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