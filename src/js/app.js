// Has Kinvey been initialized?
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
    });
});

//TODO: LAB: initialize Kinvey
app.run(['$kinvey', '$rootScope', '$location', '$state', function($kinvey, $rootScope, $location, $state) {
  $rootScope.$on('$locationChangeStart', function(event, newUrl) {
    if (initialized === false) {
      event.preventDefault(); // Stop the location change
      $kinvey.initialize({
        appKey: 'kid_rknbFHFBg',
        appSecret: '980f522550a143edb1b86bdcfd42c564',
        apiHostname: 'https://baas.kinvey.com',
        micHostname: 'https://auth.kinvey.com',
        appVersion: '0.1.2'
      }).then(function(activeUser) {
        initialized = true;
        if(!activeUser) {
            $state.go('app.login');
        } else {
            $state.go('app.main.testresults');
        }
      }).catch(function(error) {
        console.log("Could not initialize Kinvey: " + JSON.stringify(err.message))
      });
    }
  });
}]);

app.config(function ($stateProvider, $ionicConfigProvider) {
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
        .state("app.main.testresults", {
            url: "/testresults",
            views: {
                'testresults-tab': {
                    templateUrl: "templates/testresults.html",
                    controller: "TestResultsCtrl"
                }
            }
        })
        .state("app.main.surveys", {
            url: "/surveys",
            views: {
                'surveys-tab': {
                    templateUrl: "templates/surveys.html",
                    controller: "SurveysCtrl"
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
        .state("app.submitSurvey", {
            url: "/submitSurvey",
            views: {
                'menuContent': {
                    templateUrl: "templates/submitsurvey.html",
                    controller: "SubmitSurveyCtrl"
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
        })
});

