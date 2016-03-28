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


'use strict';

angular.module('myApp')
    .controller('CollateralsCtrl', ['$scope', '$kinvey', function ($scope, $kinvey) {
        $scope.collaterals = [];

        $scope.loadCollaterals = function(){
            var query = new $kinvey.Query();
            query.equalTo('mimeType','application/pdf');
            var fileStore = new $kinvey.FileStore(),
                promise = fileStore.find(query);
            promise.then(function(files) {
                $scope.collaterals = files;
                $scope.$digest();
            }).catch(function(err) {
                console.log("fetch collaterals error " + JSON.stringify(err));
                alert("Error: " + err.description);
            });
        };

        $scope.loadCollaterals();

    }]);
'use strict';

angular.module('myApp')

    .controller('EmployeesCtrl', ['$scope', '$kinvey', "$uibModal", function ($scope, $kinvey, $uibModal) {
        $scope.employees = [];

        var dataStore = $kinvey.DataStore.getInstance('Employees', $kinvey.DataStoreType.Cache);

        $scope.loadEmployees = function () {
            dataStore.find().then(function(result) {
                // The entities fetched from the cache
                var cache = result.cache;
                // Return the promise for fetching the entities from the backend
                return result.networkPromise;
            }).then(function(entities) {
                console.log("employees " + JSON.stringify(entities));
                $scope.employees = entities;
                $scope.$digest();
            }).catch(function(error) {
                console.log("err " + JSON.stringify(err));
                alert("Error: " + err.description);
            });
        };

        $scope.loadEmployees();

        $scope.addEmployee = function () {
            $uibModal.open({
                animation: true,
                templateUrl: 'templates/employee.html',
                controller: "EmployeeCtrl",
                resolve: {
                    employee: function () {
                        return {};
                    }
                }
            }).result.then(function (employee) {
                if(employee) {
                    $scope.employees.push(employee);
                    return employee;
                }
            });
        };

        $scope.pullEmployees = function(){
            dataStore.pull().then(function (result) {
                console.log(JSON.stringify(result));
            }).catch(function (err) {
                console.log("err " + JSON.stringify(err));
                alert("Error: " + err.description);
            });
        };

        $scope.pushEmployees = function(){
            dataStore.push().then(function (result) {
                console.log("Push result" + JSON.stringify(result));
            }).catch(function (err) {
                console.log("err " + JSON.stringify(err));
                alert("Error: " + err.description);
            });
        };

        $scope.syncEmployees = function () {
            var promise = dataStore.sync().then(function(result) {
                console.log("Sync result" + JSON.stringify(result));
                $scope.loadEmployees();
            }).catch(function(error) {
                console.log("err " + JSON.stringify(err));
                alert("Error: " + err.description);
            });
        };
    }])
    .controller('EmployeeCtrl', ['$scope', '$kinvey', "$uibModalInstance", function ($scope, $kinvey, $uibModalInstance) {
        $scope.employee = {};

        var dataStore = $kinvey.DataStore.getInstance('Employees', $kinvey.DataStoreType.Cache);

        $scope.saveEmployee = function (employee) {
            dataStore.save(employee).then(function (entity) {
                $uibModalInstance.close(employee);
            }).catch(function (err) {
                console.log("error " + JSON.stringify(err));
                alert("Error: " + err.description);
            });
        };

        $scope.cancel = function () {
            $uibModalInstance.close();
        }

    }]);
'use strict';

angular.module('myApp')

    .controller('InsertCtrl', ['$scope','$kinvey', function ($scope, $kinvey) {

        var dataStore = $kinvey.DataStore.getInstance('Todo',$kinvey.DataStoreType.Sync);
        $scope.todo = {
            action: "",
            duedate: new Date(),
            completed:false
        };

        $scope.insert = function (todo) {
            dataStore.save(todo).then(function (entity) {
                alert("Todo was added with success");
                //$state.go('todos');
            }).catch(function (err) {
                console.log("error " + JSON.stringify(err));
                alert("Error: " + err.description);
            });
        }
    }]);
angular.module('myApp').controller('LoginCtrl', ['$scope', '$kinvey', '$location', function ($scope, $kinvey, $location) {
        $kinvey.User.getActiveUser().then(function (user) {
            console.log("active user " + JSON.stringify(user));
            $scope.showLogin = !user;
            $scope.$digest();
        });

        $scope.login = function (username, password) {
            var user = new $kinvey.User();
            var promise = user.login(username, password);
            promise.then(function (user) {
                //var promise = $kinvey.Push.init({
                //}).then(function(response) {
                //    console.log("register push " + JSON.stringify(response));
                //}).catch(function(error) {
                //        console.log("register push error " + JSON.stringify(error));
                //    }
                //);
                $scope.showLogin = false;
                $scope.$digest();
            }, function (err) {
                console.log("err " + JSON.stringify(err));
                alert("Error: " + err.description);
            });
        };

        $scope.micLogin = function () {
            var user = new $kinvey.User();
            var promise = user.loginWithMIC('http://localhost:8000/app/index.html');
            promise.then(function (user) {
                $scope.showLogin = false;
                $scope.$digest();
            }, function (err) {
                console.log("mic login error " + JSON.stringify(err));
                alert("Error: " + err.description);
            });
        };

        $scope.logout = function () {
            $kinvey.User.getActiveUser().then(function (user) {
                if (user) {
                    user.logout().then(function () {
                        console.log("logout with success ");
                        $scope.showLogin = true;
                        $scope.$digest();
                    }).catch(function (err) {
                        console.log("logout error " + JSON.stringify(err));
                        alert("Error: " + err.description);
                    });
                }
            })
        }
    }]);
angular.module('myApp').controller("MainCtrl", function ($rootScope, $scope, $state) {

        $scope.go = function (route) {
            $state.go(route);
        };

        $scope.active = function (route) {
            return $state.is(route);
        };

        $scope.tabs = [
            {heading: "Auth", route: "main.login", active: true, tab: "auth-tab"},
            {heading: "Products", route: "main.products", active: false, tab:"products-tab"},
            {heading: "Partners", route: "main.partners", active: false},
            {heading: "ToDos", route: "main.todos", active: false},
            {heading: "Collateral", route: "main.collaterals", active: false},
            {heading: "Insert", route: "main.insert", active: false},
            {heading: "Employees", route: "main.employees", active: false},
            {heading: "Media", route: "main.media", active: false}
        ];

        $scope.$on("$stateChangeSuccess", function () {
            $scope.tabs.forEach(function (tab) {
                tab.active = $scope.active(tab.route);
            });
        });
    });
'use strict';

angular.module('myApp')

    .controller('MediaCtrl', ['$scope', '$kinvey', "$uibModal", function ($scope, $kinvey, $uibModal) {
        $scope.medias = [];

        var dataStore = $kinvey.DataStore.getInstance('Media', $kinvey.DataStoreType.Network);

        $scope.loadMedia = function () {
            dataStore.find().then(function(entities) {
                $scope.medias = entities;
                $scope.$digest();
            }).catch(function(error) {
                console.log("err " + JSON.stringify(err));
                alert("Error: " + err.description);
            });
        };

        $scope.loadMedia();

        $scope.addMedia = function () {
            $uibModal.open({
                animation: true,
                templateUrl: 'templates/media.html',
                controller: "MediaEntityCtrl",
                resolve: {
                    media: function () {
                        return {};
                    }
                }
            }).result.then(function (media) {
                if(media) {
                    $scope.medias.push(media);
                    return media;
                }
            });
        };

        $scope.editMedia = function (media) {
            media.editAction = true;
        };

        $scope.updateMedia = function (media) {
            delete media.editAction;
            dataStore.save(media).then(function () {
                media.editAction = false;
            }).catch(function (error) {
                console.log("error " + JSON.stringify(error));
                alert("Error: " + error.description);
            });
        };

        $scope.deleteMedia = function (media, index) {
            dataStore.removeById(media._id).then(function (res) {
                $scope.medias.splice(index, 1);
                $scope.$digest();
            }).catch(function (err) {
                console.log("delete with error " + JSON.stringify(err));
                alert("Error: " + err.description);
            });
        }


    }])
    .controller('MediaEntityCtrl', ['$scope', '$kinvey', "$uibModalInstance", function ($scope, $kinvey, $uibModalInstance) {
        $scope.media = {};

        var dataStore = $kinvey.DataStore.getInstance('Media', $kinvey.DataStoreType.Network);

        $scope.saveMedia = function (media) {
            dataStore.save(media).then(function (entity) {
                $uibModalInstance.close(media);
            }).catch(function (err) {
                console.log("error " + JSON.stringify(err));
                alert("Error: " + err.description);
            });
        };

        $scope.cancel = function () {
            $uibModalInstance.close();
        }

    }]);
'use strict';

angular.module('myApp')

    .controller('PartnersCtrl', ['$scope', '$kinvey', function ($scope, $kinvey) {
        $scope.partners = [];

        var dataStore = $kinvey.DataStore.getInstance('Partner');

        $scope.loadPartners = function(query){
            dataStore.find().then(function (result) {
                $scope.partners = result.cache;
                return result.networkPromise;
            }).then(function (partners) {
                $scope.partners = partners;
                $scope.$digest();
            }).catch(function(err){
                console.log("err " + JSON.stringify(err));
                alert("Error: " + err.description);
            });
        };
        $scope.loadPartners();

    }]);
'use strict';

angular.module('myApp')

    .controller('ProductsCtrl', ['$scope', '$kinvey', function ($scope, $kinvey) {
        $scope.products = [];

        var dataStore = $kinvey.DataStore.getInstance('Products');

        $scope.loadProducts = function(query){
            dataStore.find(query).then(function (result) {
                console.log(JSON.stringify(result));
                $scope.products = result.cache;
                return result.networkPromise;
            }).then(function (products) {
                $scope.products = products;
                $scope.$digest();
            }).catch(function(err){
                console.log("err " + JSON.stringify(err));
                alert("Error: " + err.description);
            });
        };

        $scope.loadProducts();

        $scope.sortProducts = function(){
            var query = new $kinvey.Query();
            query.descending('productname');
            $scope.loadProducts(query)
        };

        $scope.limitProducts = function(){
            var query = new $kinvey.Query();
            query.limit(4);
            $scope.loadProducts(query)
        };

        $scope.skipProducts = function(){
            var query = new $kinvey.Query();
            query.skip(0);
            query.limit(1);
            $scope.loadProducts(query)
        };

        $scope.deleteProduct = function (product, index) {
            dataStore.removeById(product._id).then(function (res) {
                $scope.products.splice(index, 1);
                $scope.$digest();
            }).catch(function (err) {
                console.log("delete with error " + JSON.stringify(err));
                alert("Error: " + err.description);
            });
        }
    }]);
'use strict';

angular.module('myApp')

    .controller('TodoCtrl', ['$scope', '$kinvey', function ($scope, $kinvey) {
        $scope.todos = [];

        var dataStore = $kinvey.DataStore.getInstance('Todo', $kinvey.DataStoreType.Sync);

        $scope.loadTodos = function () {
            dataStore.find().then(function (result) {
                $scope.todos = result;
                $scope.$digest();
            }).catch(function (err) {
                console.log("err " + JSON.stringify(err));
                alert("Error: " + err.description);
            });
        };

        $scope.loadTodos();

        $scope.refreshTodos = function () {
            dataStore.pull().then(function (result) {
                $scope.todos = result;
                $scope.$digest();
            }).catch(function (err) {
                console.log("err " + JSON.stringify(err));
                alert("Error: " + err.description);
            });
        };

        $scope.syncTodos = function () {
            dataStore.push().then(function (result) {
                alert('Sync successfully ' + result.success.length + ' entities and failed to sync ' + result.error.length);
                if(result.error.length != 0){
                    console.log("sync error " + JSON.stringify(result.error));
                    var fails = [];
                    result.error.forEach(function(error){
                       fails.push({
                           entityId: error._id,
                           errorDescription: error.error.description
                       })
                    });
                    alert("Fail reasons: " + JSON.stringify(fails));
                }
            })
        };

        $scope.editTodo = function (todo) {
            todo.editAction = true;
        };

        $scope.updateTodo = function (todo) {
            delete todo.editAction;
            dataStore.save(todo).then(function () {
                todo.editAction = false;
            }).catch(function (error) {
                console.log("error " + JSON.stringify(error));
                alert("Error: " + error.description);
            });
        };

        $scope.deleteTodo = function (todo, index) {
            dataStore.removeById(todo._id).then(function (res) {
                $scope.todos.splice(index, 1);
                $scope.$digest();
            }).catch(function (err) {
                console.log("delete with error " + JSON.stringify(err));
                alert("Error: " + err.description);
            });
        }

    }]);