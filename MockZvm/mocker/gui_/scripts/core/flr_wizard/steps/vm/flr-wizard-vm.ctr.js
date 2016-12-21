'use strict';

angular.module('zvmApp.core')
    .controller('flrWizardVmController', function ($scope, flrWizardVmModel) {
        $scope.model = flrWizardVmModel.model;
        $scope.model.options = flrWizardVmModel.getGridOptions();
        $scope.grid = {};

        flrWizardVmModel.init();

        $scope.validate = function () {
            flrWizardVmModel.validate();

            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };
    });
