angular.module('myApp').controller('MenuCtrl', function ($scope, $timeout, $state) {

    var insertClick = function () {
        $state.go("app.insert");
    };

    var mediaClick = function () {
        $state.go("app.media")
    };

    var logoutClick = function () {
        $state.go("app.logout");
    };

    var bulkSyncClick = function () {
        $state.go("app.sync");
    };

    $scope.leftMenuItems = [
        {
            "title": "Create Todo",
            "click": insertClick
        },
        {
            "title": "Media",
            "click": mediaClick
        },
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