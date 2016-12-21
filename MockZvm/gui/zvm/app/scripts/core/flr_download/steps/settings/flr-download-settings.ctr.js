'use strict';

angular.module('zvmApp.core')
    .controller('flrDownloadSettingsController', function ($scope, flrDownloadSettingsModel) {
        $scope.model = flrDownloadSettingsModel.model;

        flrDownloadSettingsModel.init();
    });
