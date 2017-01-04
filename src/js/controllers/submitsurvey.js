'use strict';

angular.module('myApp').controller('SubmitSurveyCtrl', ['$scope', '$kinvey', '$ionicNavBarDelegate', "$state", "trainingUtils", function ($scope, $kinvey, $ionicNavBarDelegate, $state, trainingUtils) {
    $scope.survey = {};

    //TODO: LAB: create a data store to save a survey
    var dataStore = $kinvey.DataStore.collection('Surveys', $kinvey.DataStoreType.Sync);

    $scope.saveSurvey = function (survey) {
        trainingUtils.showProgress();
        console.log("survey " + JSON.stringify(survey));
        //TODO: LAB: Save a new Survey object to offline sync store
        dataStore.save(survey).then(function (entity) {
            console.log("entity " + JSON.stringify(entity));
            trainingUtils.hideProgress();
            $state.go('app.main.surveys');
        }).catch(function (err) {
            console.log("error " + JSON.stringify(err.message));
            trainingUtils.hideProgress();
            trainingUtils.showOkDialog("Error: " + err.message);
        });
    };

    $scope.cancel = function () {
        $ionicNavBarDelegate.back()
    }

}]);