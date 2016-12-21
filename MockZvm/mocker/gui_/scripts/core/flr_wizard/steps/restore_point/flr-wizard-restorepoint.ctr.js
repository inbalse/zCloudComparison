'use strict';

angular.module('zvmApp.core')
    .controller('flrWizardRestorepointController', function ($scope, flrWizardVmModel, flrWizardRestorepointModel, flrCheckpointTypes) {
        $scope.model = flrWizardRestorepointModel.model;
        $scope.model.options = flrWizardRestorepointModel.getGridOptions();

        $scope.flrCheckpointTypes = flrCheckpointTypes;

        $scope.filter = function () {
            flrWizardRestorepointModel.filter();
        };

        $scope.selectedItemsChange = function () {
            flrWizardRestorepointModel.validate();

            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };

        $scope.reloadCheckPoints = function () {
            flrWizardRestorepointModel.loadCheckpoints();
        };

        $scope.onDateChange = function(){
            flrWizardRestorepointModel.onDateChange();
        };

        /*
         * Load
         * */

        if (flrWizardVmModel.model.selectedItems.length > 0) {
            flrWizardRestorepointModel.init(flrWizardVmModel.model.selectedItems[0].VpgIdentifier);
        }

    });
