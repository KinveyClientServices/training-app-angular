'use strict';

angular.module('myApp')

    .controller('ProductsCtrl', ['$scope', '$kinvey','trainingUtils', function ($scope, $kinvey, trainingUtils) {
        $scope.products = [];

        //TODO: LAB: handle a push notification being received

        //TODO: LAB: Create a default data store. SDK defaults to Cache Store

        //TODO: LAB: Get all products by query
        //$scope.products
        $scope.loadProducts = function(query){
            trainingUtils.showProgress();
            trainingUtils.hideProgress();
        };

        $scope.loadProducts();

        //TODO: LAB: Sort Products
        $scope.sortProducts = function(){
            $scope.loadProducts(query)
        };

        //TODO: LAB: Limit Products by 4
        $scope.limitProducts = function(){
            $scope.loadProducts(query)
        };

        //TODO: LAB: Skip 0 and Limit 1 Product
        $scope.skipProducts = function(){
            $scope.loadProducts(query)
        };

        //TODO: LAB: Delete a Product
        $scope.deleteProduct = function (product, index) {
            trainingUtils.showProgress();
            trainingUtils.hideProgress();
        }
    }]);