'use strict';


angular.module('zvmApp.core')
    .controller('hostVersionsController', function ($scope, siteSettingsVersionsModel) {
        $scope.supportedVersionsModel = siteSettingsVersionsModel.model;
        siteSettingsVersionsModel.init();
    });
