'use strict';

angular.module('myApp')

    .controller('ProductsCtrl', ['$scope', '$kinvey','trainingUtils', function ($scope, $kinvey, trainingUtils) {
        $scope.products = [];

        //TODO: LAB: Create a default data store. SDK defaults to Cache Store
        var dataStore = $kinvey.DataStore.getInstance('Products');

        //TODO: LAB: Get all products by query
        //$scope.products
        $scope.loadProducts = function(query){
            trainingUtils.showProgress();
            dataStore.find(query).then(function (result) {
                console.log(JSON.stringify(result));
                $scope.products = result.cache;
                return result.networkPromise;
            }).then(function (products) {
                $scope.products = products;
                $scope.$digest();
                trainingUtils.hideProgress();
            }).catch(function(err){
                console.log("err " + JSON.stringify(err));
                trainingUtils.hideProgress();
                trainingUtils.showOkDialog("Error: " + err.description);
            });
        };

        $scope.loadProducts();

        //TODO: LAB: Sort Products
        $scope.sortProducts = function(){
            var query = new $kinvey.Query();
            query.descending('productname');
            $scope.loadProducts(query)
        };

        //TODO: LAB: Limit Products by 4
        $scope.limitProducts = function(){
            var query = new $kinvey.Query();
            query.limit(4);
            $scope.loadProducts(query)
        };

        //TODO: LAB: Skip 0 and Limit 1 Product
        $scope.skipProducts = function(){
            var query = new $kinvey.Query();
            query.skip(0);
            query.limit(1);
            $scope.loadProducts(query)
        };

        //TODO: LAB: Delete a Product
        $scope.deleteProduct = function (product, index) {
            trainingUtils.showProgress();
            dataStore.removeById(product._id).then(function (res) {
                $scope.products.splice(index, 1);
                $scope.$digest();
                trainingUtils.hideProgress();
            }).catch(function (err) {
                console.log("delete with error " + JSON.stringify(err));
                trainingUtils.hideProgress();
                trainingUtils.showOkDialog("Error: " + err.description);
            });
        }
    }]);