'use strict';

angular.module('zvmApp.core')
    .controller('flrWizardController', function ($scope, flrWizardFactory, flrWizardVmModel, flrWizardRestorepointModel, flrWizardVolumesModel,
                                                 flrWizardMountModel) {
        $scope.steps = [
            flrWizardVmModel.model.step,
            flrWizardRestorepointModel.model.step,
            flrWizardVolumesModel.model.step,
            flrWizardMountModel.model.step
        ];


        $scope.doneEnabled = false;

        $scope.closeHandler = function () {
            flrWizardFactory._self.trackInWizardTimeToAnalytics(false);
            flrWizardFactory.close();
        };

        $scope._handleStepChanged = function (newValue, oldValue) {
            if (newValue === oldValue) {
                return;
            }
            $scope.doneEnabled = false;
        };

        $scope.$on('wizard:StepChanged', $scope._handleStepChanged);
        $scope.$on('wizard:DoneButtonClick', $scope._handleDoneClick);
        $scope.$on('wizard:CancelButtonClick', $scope.closeHandler);
    });
