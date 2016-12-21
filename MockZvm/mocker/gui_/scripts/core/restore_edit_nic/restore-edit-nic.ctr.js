'use strict';

angular.module('zvmApp.core')
    .controller('restoreEditNicController', function ($scope, $translate, item, potentials, isBulk, restoreEditNicFactory, enums) {
        //===============================================================
        // init components
        //===============================================================
        $scope.loading = true;
        $scope.item = item;
        $scope.potentials = potentials;
        $scope.isBulk = isBulk;
        $scope.forms = {};
        $scope.changeVnicIPConfList = [
            {label: 'Same', value: enums.RestoreIpType.Same},
            {label: 'DHCP', value: enums.RestoreIpType.Dhcp},
            {label: 'Static', value: enums.RestoreIpType.Static}
        ];

        //===============================================================
        // user interaction
        //===============================================================

        $scope.$watch('item.VCenterVNicRestoreConfiguration.IPConfiguration.Type', function (newValue) {
            $scope.isRequired = $scope.item.VCenterVNicRestoreConfiguration.IsIPConfigurationEnabled && newValue === enums.RestoreIpType.Static;
            $scope.isDisabled = !$scope.item.VCenterVNicRestoreConfiguration.IsIPConfigurationEnabled || newValue !== enums.RestoreIpType.Static;
        });

        $scope.handleSaveClicked = function () {
            restoreEditNicFactory.save($scope.item);
        };

        $scope.handleCancel = function () {
            restoreEditNicFactory.close();
        };
        //===============================================================
        // helpers
        //===============================================================
        $scope.processTranslations = function (translations) {
            $scope.sendButton = {label: translations['MODAL.OK'], handler: $scope.handleSaveClicked, disabled: false};
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

        $scope.$watch('forms.restoreEditNic.$valid', function (value) {
            if (angular.isDefined(value)) {
                $scope.buttons[1].disabled = !value;
            }
        });

        $translate(['MODAL.CANCEL', 'MODAL.OK', 'RESTORE_EDIT_VOLUME.TITLE']).then($scope.processTranslations);

    });
