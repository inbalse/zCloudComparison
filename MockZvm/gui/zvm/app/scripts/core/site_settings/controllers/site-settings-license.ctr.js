'use strict';

angular.module('zvmApp.core')
    .controller('licenseController', function ($scope,$state, siteLicenseModel) {
        //=====================================================================================
        //  this controller does not subscribes to site-settings controller save events
        //=====================================================================================
        $scope.licenseModel = siteLicenseModel.model;

        $scope.updateLicense = function () {
            siteLicenseModel.save();

            if (_.isEmpty($scope.licenseModel.licenseData.Key.Key)){
                $state.go('license');
            }
        };
    });

