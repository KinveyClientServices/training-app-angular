'use strict';


var initialized = false;
// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
    "kinvey",
    "ui.router",
    'ui.bootstrap',
    'myApp.main',
    'myApp.login',
    'myApp.partners',
    'myApp.products',
    'myApp.todos',
    'myApp.insert',
    'myApp.collaterals'
]);

app.constant('kinveyConfig', {
    apiHostName: 'https://baas.kinvey.com',
    micHostName: 'https://auth.kinvey.com',
    appKey: 'kid_bJg1ypzual',
    appSecret: 'd5e16c9315274c93920dc14f6ee79f0b'
});

app.config(['$kinveyProvider', function ($kinveyProvider) {
    $kinveyProvider.init({
        appKey: 'kid_bJg1ypzual',
        appSecret: 'd5e16c9315274c93920dc14f6ee79f0b'
    });
}]);

app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/main/login");

    $stateProvider
        .state("main", {
                abstract: true,
                url: "/main",
                templateUrl: "main/main.html",
                controller: "MainCtrl"
            }
        )
        .state("main.login", {
            url: "/login",
            templateUrl: "login/login.html",
            controller: "LoginCtrl"
        })
        .state("main.products", {
            url: "/products",
            templateUrl: "products/products.html",
            controller: "ProductsCtrl"
        })
        .state("main.partners", {
            url: "/partners",
            templateUrl: "partners/partners.html",
            controller: "PartnersCtrl"
        })
        .state("main.todos", {
            url: "/todos",
            templateUrl: "todos/todos.html",
            controller: "TodoCtrl"
        })
        .state("main.collaterals", {
            url: "/collaterals",
            templateUrl: "collaterals/collaterals.html",
            controller: "CollateralsCtrl"
        })
        .state("main.insert", {
            url: "/insert",
            templateUrl: "insert/insert.html",
            controller: "InsertCtrl"
        });
});