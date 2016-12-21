'use strict';

angular.module('zvmApp.core')
    .controller('flrWizardVolumesController', function ($scope, flrWizardVolumesModel) {
        $scope.model = flrWizardVolumesModel.model;
        $scope.grid = {};

        flrWizardVolumesModel.init();

        $scope.validate = function () {
            flrWizardVolumesModel.validate();

            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };
    });
