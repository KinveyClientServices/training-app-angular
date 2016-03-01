'use strict';

angular.module('myApp.products', [])

    .controller('ProductsCtrl', ['$scope', '$kinvey', function ($scope, $kinvey) {
        $scope.products = [];

        var dataStore = $kinvey.DataStore.getInstance('vProducts');

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