angular.module('myApp').controller('MenuCtrl', function ($scope, $timeout, $state) {

    var logoutClick = function () {
        $state.go("app.logout");
    };

    var bulkSyncClick = function () {
        $state.go("app.sync");
    };

    $scope.leftMenuItems = [
        {
            "title": "Work Orders",
            "click": bulkSyncClick
        },
        {
            "title": "Logout",
            "click": logoutClick
        }
    ];


});