'use strict';

angular.module('zvmApp.core')
    .controller('restoreBulkEditController', function ($scope, $translate, item, hosts, restoreWizardModel, restoreBulkEditFactory) {
        //===============================================================
        // init components
        //===============================================================
        $scope.loading = true;
        $scope.item = item;
        $scope.hosts = hosts;

        $scope.onHostChange = function () {
            restoreWizardModel.getVCenterPotentialRestoreSecondaryEntities(restoreWizardModel.data.selectedItems[0].SiteIdentifier,
                item.ComputeResource.BaseComputeResourceIdentifier).then(function (result) {
                    $scope.datastores = result.Datastores;
                });
        };

        if (item.ComputeResource && item.ComputeResource.BaseComputeResourceIdentifier) {
            $scope.onHostChange();
        }

        //===============================================================
        // user interaction
        //===============================================================
        $scope.handleSaveClicked = function () {
            restoreBulkEditFactory.save($scope.item);
        };

        $scope.handleCancel = function () {
            restoreBulkEditFactory.close();
        };
        //===============================================================
        // helpers
        //===============================================================
        $scope.processTranslations = function (translations) {
            $scope.sendButton = {
                label: translations['MODAL.SAVE'],
                handler: $scope.handleSaveClicked,
                disabled: false
            };
            $scope.buttons = [
                {
                    label: translations['MODAL.CANCEL'],
                    class: 'btn btn-link',
                    handler: $scope.handleCancel,
                    disabled: false
                },
                $scope.sendButton
            ];
            $scope.loading = false;
        };

        $translate(['MODAL.CANCEL', 'MODAL.SAVE', 'RESTORE_EDIT_VOLUME.TITLE']).then($scope.processTranslations);

    });
