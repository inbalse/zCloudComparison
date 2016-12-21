'use strict';

angular.module('zvmApp.core')
    .controller('flrWizardMountController', function ($scope, zAlertFactory, flrWizardFactory, flrWizardVmModel, flrWizardRestorepointModel, flrWizardVolumesModel, flrWizardMountModel, $translate) {

        $scope.vmModel = flrWizardVmModel.model;
        $scope.rpModel = flrWizardRestorepointModel.model;
        $scope.volumeModel = flrWizardVolumesModel.model;

        $scope.mount = function () {

            zAlertFactory.warn(
                $translate.instant('FLR.WIZARD.MOUNT.PREPARE_RESTORE_POINT_LABEL'),
                $translate.instant('FLR.WIZARD.MOUNT.PREPARE_RESTORE_POINT_TEXT'),
                function (event) {
                    if (event.target.name === zAlertFactory.buttons.OK) {
                        flrWizardMountModel.mount();
                        flrWizardFactory.close();
                    }
                });
        };
    });
