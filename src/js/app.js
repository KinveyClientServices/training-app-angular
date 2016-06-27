// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

var initialized = false;
// Declare app level module which depends on views, and components
var app = angular.module('myApp', ['ionic','kinvey','ui.router']);

app.run(function ($ionicPlatform, $state, $kinvey) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        var user = $kinvey.User.getActiveUser();
        console.log("active user" + JSON.stringify(user));
        if(user){
            $state.go("app.main.products");
        }else{
            $state.go("app.login");
        }
    });
});

//TODO: LAB: initialize Kinvey
app.config(['$kinveyProvider', function ($kinveyProvider) {
    $kinveyProvider.init({
        host: 'baas.kinvey.com',
        appKey: 'kid_Wy7NMiwaTx',
        appSecret: '18e581bc9c7046a5b1b20ae838105126',
        appVersion: '0.1.2'
    });
}]);

app.config(function ($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
    $stateProvider
        .state('app', {
            url: "/app",
            abstract: true,
            templateUrl: "templates/menu.html",
            controller: 'MenuCtrl'
        })
        .state('app.main', {
            url: "/main",
            abstract: true,
            views: {
                'menuContent': {
                    templateUrl: "templates/tabs.html",
                    controller: "MainCtrl"
                }
            }
        })
        .state("app.login", {
            url: "/login",
            views: {
                'menuContent': {
                    templateUrl: "templates/login.html",
                    controller: "LoginCtrl"
                }
            }
        })
        .state("app.main.products", {
            url: "/products",
            views: {
                'products-tab': {
                    templateUrl: "templates/products.html",
                    controller: "ProductsCtrl"
                }
            }
        })
        .state("app.main.partners", {
            url: "/partners",
            views: {
                'partners-tab': {
                    templateUrl: "templates/partners.html",
                    controller: "PartnersCtrl"
                }
            }
        })
        .state("app.main.todos", {
            url: "/todos",
            views: {
                'todo-tab': {
                    templateUrl: "templates/todos.html",
                    controller: "TodoCtrl"
                }
            }
        })
        .state("app.main.collaterals", {
            url: "/collaterals",
            views: {
                'col-tab': {
                    templateUrl: "templates/collaterals.html",
                    controller: "CollateralsCtrl"
                }
            }
        })
        .state("app.insert", {
            url: "/insert",
            views: {
                'menuContent': {
                    templateUrl: "templates/insert.html",
                    controller: "InsertCtrl"
                }
            }
        })
        .state("app.media", {
            url: "/media",
            cache:"false",
            views: {
                'menuContent': {
                    templateUrl: "templates/medias.html",
                    controller: "MediaCtrl"
                }
            }
        })
        .state("app.newMedia", {
            url: "/newMedia",
            views: {
                'menuContent': {
                    templateUrl: "templates/media.html",
                    controller: "MediaEntityCtrl"
                }
            }
        })
        .state("app.newPartner", {
            url: "/newPartner",
            views: {
                'menuContent': {
                    templateUrl: "templates/partner.html",
                    controller: "PartnerCtrl"
                }
            }
        })
        .state("app.logout", {
            url: "/logout",
            views: {
                'menuContent': {
                    templateUrl: "templates/logout.html",
                    controller: "LogoutCtrl"
                }
            }
        })
        .state("app.sync", {
            url: "/sync",
            views: {
                'menuContent': {
                    templateUrl: "templates/sync.html",
                    controller: "SyncCtrl"
                }
            }
        });

    //$urlRouterProvider.otherwise("/app/login");
});

