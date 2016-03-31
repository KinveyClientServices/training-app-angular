angular.module('myApp').factory('trainingUtils', function($ionicPopup, $ionicLoading) {
    var factory = {
        showOkDialog: function(message) {
            $ionicPopup.alert({
                title: 'Training app',
                content: message
            }).then(function(res) {
            });
        },

        showProgress: function() {
            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
        },

        hideProgress: function() {
            $ionicLoading.hide();
        }
    };
    return factory;
});
