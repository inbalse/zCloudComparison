'use strict';

angular.module('zvmApp.core')
    .controller('restoreWizardController', function ($scope, steps, restoreWizardFactory, restoreWizardModel, zAlertFactory) {
        $scope.title = restoreWizardFactory.title;
        $scope.doneEnabled = false;

        $scope.closeHandler = function () {
            restoreWizardFactory.dismissModal();
        };

        $scope.onSuccess = function () {
            restoreWizardFactory.closeModal();
        };
        $scope.onFail = function (reason) {
            zAlertFactory.fail('Restore Failed', reason.faultString, undefined, undefined);
        };

        $scope._handleDoneClick = function () {
            restoreWizardModel.restoreFromBackup().then($scope.onSuccess, $scope.onFail);
        };

        $scope._handleStepChanged = function (newValue, oldValue) {
            if (newValue === oldValue) {
                return;
            }
            $scope.doneEnabled = $scope.isDoneEnabled();
        };

        $scope.$on('wizard:StepChanged', $scope._handleStepChanged);
        $scope.$on('wizard:DoneButtonClick', $scope._handleDoneClick);
        $scope.$on('wizard:CancelButtonClick', $scope.closeHandler);

        $scope.isDoneEnabled = function () {
            var result = true;
            if (!$scope.steps) {
                return false;
            }
            _.forEach($scope.steps, function (step) {
                if (!step.isValid(step)) {
                    result = false;
                }
            });
            return result;
        };

        $scope.steps = steps;
    });
