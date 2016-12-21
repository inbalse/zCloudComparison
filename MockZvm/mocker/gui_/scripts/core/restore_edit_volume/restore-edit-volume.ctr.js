'use strict';

angular.module('zvmApp.core')
    .controller('restoreEditVolumeController', function ($scope, $translate, item, potentials, restoreEditVolumeFactory, restoreWizardModel) {
        //===============================================================
        // init component
        //===============================================================
        $scope.loading = true;
        $scope.item = item;
        $scope.potentials = potentials;
        $scope.isHyperV = restoreWizardModel.isHyperV;
        //===============================================================
        // user interaction
        //===============================================================
        $scope.handleSaveClicked = function () {
            restoreEditVolumeFactory.save($scope.item);
        };

        $scope.handleCancel = function () {
            restoreEditVolumeFactory.close();
        };
        //===============================================================
        // helpers
        //===============================================================
        $scope.processTranslations = function (translations) {
            $scope.sendButton = {label: translations['MODAL.SAVE'], handler: $scope.handleSaveClicked, disabled: false };
            $scope.buttons = [
                {label: translations['MODAL.CANCEL'], class: 'btn btn-link', handler: $scope.handleCancel, disabled: false},
                $scope.sendButton
            ];
            $scope.loading = false;
        };

        $translate(['MODAL.CANCEL', 'MODAL.SAVE', 'RESTORE_EDIT_VOLUME.TITLE']).then($scope.processTranslations);
    });
