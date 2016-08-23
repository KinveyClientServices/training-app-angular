'use strict';

angular.module('myApp')

    .controller('ProductsCtrl', ['$scope', '$kinvey','trainingUtils', function ($scope, $kinvey, trainingUtils) {
        $scope.products = [];

        //TODO: LAB: handle a push notification being received
        $kinvey.Push.onNotification(function(data) {
          console.log("RECEIVED PUSH: " + JSON.stringify(data));
        });

        //TODO: LAB: Create a default data store. SDK defaults to Cache Store
        var productDataStore = $kinvey.DataStore.getInstance('Products');

        //TODO: LAB: Get all products by query
        //$scope.products
        $scope.loadProducts = function(query){
            trainingUtils.showProgress();
            productDataStore.find(query).subscribe(function (result) {
                $scope.products = result;
                $scope.$apply();
                trainingUtils.hideProgress();
            }, function (err) {
                console.log("err " + JSON.stringify(err.message));
                trainingUtils.hideProgress();
                trainingUtils.showOkDialog("Error: " + err.message);
            }, function() {
                //completed
            });
        };

        $scope.loadProducts();

        //TODO: LAB: Sort Products
        $scope.sortProducts = function(){
            var query = new $kinvey.Query();
            query.ascending('productdesc');
            $scope.loadProducts(query);
        };

        //TODO: LAB: Limit Products by 4
        $scope.limitProducts = function(){
            var query = new $kinvey.Query();
            query.limit(2);
            // query.addFilter("limit",2);
            $scope.loadProducts(query);
        };

        //TODO: LAB: Skip 0 and Limit 1 Product
        $scope.skipProducts = function(){
            var query = new $kinvey.Query();
            query.skip(0);
            query.limit(1);
            // query.addFilter("limit",1);
            // query.addFilter("skip",0);
            $scope.loadProducts(query);
        };

        //TODO: LAB: Delete a Product
        $scope.deleteProduct = function (product, index) {
            trainingUtils.showProgress();
            productDataStore.removeById(product._id).then(function (result) {
                $scope.products.splice(index, 1);
                $scope.$apply();
                trainingUtils.hideProgress();
            }).catch(function (err) {
                console.log("delete with error " + JSON.stringify(err.message));
                trainingUtils.hideProgress();
                trainingUtils.showOkDialog("Error: " + err.message);
            });
        }
    }]);