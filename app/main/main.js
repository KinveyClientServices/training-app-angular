'use strict';

angular.module('myApp.main', [])
    .controller("MainCtrl", function ($rootScope, $scope, $state) {

        $scope.go = function (route) {
            $state.go(route);
        };

        $scope.active = function (route) {
            return $state.is(route);
        };

        $scope.tabs = [
            {heading: "Auth", route: "main.login", active: true},
            {heading: "Products", route: "main.products", active: false},
            {heading: "Partners", route: "main.partners", active: false},
            {heading: "ToDos", route: "main.todos", active: false},
            {heading: "Collateral", route: "main.collaterals", active: false},
            {heading: "Insert", route: "main.insert", active: false}
        ];

        $scope.$on("$stateChangeSuccess", function () {
            $scope.tabs.forEach(function (tab) {
                tab.active = $scope.active(tab.route);
            });
        });
    });