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

    var bunchSyncClick = function () {
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
            "title": "Bunch Sync",
            "click": bunchSyncClick
        },
        {
            "title": "Logout",
            "click": logoutClick
        }
    ];


});