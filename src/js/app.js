// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

var initialized = false;
// Declare app level module which depends on views, and components
var app = angular.module('myApp', ['ionic','kinvey','ui.bootstrap','ui.router']);

app.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
    });
});

app.constant('kinveyConfig', {
    apiHostName: 'https://baas.kinvey.com',
    micHostName: 'https://auth.kinvey.com',
    appKey: 'kid_Wy7NMiwaTx',
    appSecret: '18e581bc9c7046a5b1b20ae838105126'
});

app.config(['$kinveyProvider', 'kinveyConfig', function ($kinveyProvider, kinveyConfig) {
    $kinveyProvider.init(kinveyConfig);
}]);

app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/main/login");

    $stateProvider
        .state("main", {
                abstract: true,
                url: "/main",
                templateUrl: "templates/main.html",
                controller: "MainCtrl"
            }
        )
        .state("main.login", {
            url: "/login",
            views: {
                'auth-tab': {
                    templateUrl: "templates/login.html",
                    controller: "LoginCtrl"
                }
            }
        })
        .state("main.products", {
            url: "/products",
            views: {
                'products-tab': {
                    templateUrl: "templates/products.html",
                    controller: "ProductsCtrl"
                }
            }
        })
        .state("main.partners", {
            url: "/partners",
            views: {
                'partners-tab': {
                    templateUrl: "templates/partners.html",
                    controller: "PartnersCtrl"
                }
            }
        })
        .state("main.todos", {
            url: "/todos",
            views: {
                'todo-tab': {
                    templateUrl: "templates/todos.html",
                    controller: "TodoCtrl"
                }
            }
        })
        .state("main.collaterals", {
            url: "/collaterals",
            views: {
                'collateral-tab': {
                    templateUrl: "templates/collaterals.html",
                    controller: "CollateralsCtrl"
                }
            }
        })
        .state("main.insert", {
            url: "/insert",
            views: {
                'insert-tab': {
                    templateUrl: "templates/insert.html",
                    controller: "InsertCtrl"
                }
            }
        })
        .state("main.employees", {
            url: "/employees",
            views: {
                'employees-tab': {
                    templateUrl: "templates/employees.html",
                    controller: "EmployeesCtrl"
                }
            }
        })
        .state("main.media", {
            url: "/media",
            views: {
                'media-tab': {
                    templateUrl: "templates/medias.html",
                    controller: "MediaCtrl"
                }
            }
        });
});

