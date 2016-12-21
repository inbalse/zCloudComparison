'use strict';

angular.module('zvmApp.core')
    .controller('editVcdVmController', function ($scope, editVcdVmFactory, $translate, vm, selectedVmsCount,
                                                 objectTransformHelpersService, vpgService, createVPGHelperFactory,
                                                 zAlertFactory, storageService) {
        $scope.vm = vm;
        $scope.data = {
            isSlaCustom: storageService.getIsSlaCustom()
        };
        $scope.selectedVmsCount = selectedVmsCount > 1 ? $translate.instant('EDIT_VM.TITLE_VMS', {vmsCount: selectedVmsCount}) : $translate.instant('EDIT_VM.TITLE_VM');
        $scope.forms = {};


        objectTransformHelpersService.JournalLimitTypeMBtoGB($scope.vm.JournalHardLimit);
        objectTransformHelpersService.JournalLimitTypeMBtoGB($scope.vm.JournalWarningThreshold);

        $scope.processTranslations = function (translations) {
            $scope.translations = translations;
            $scope.saveButton = {
                label: $scope.translations['MODAL.SAVE'],
                handler: $scope.handleSaveClick,
                disabled: false
            };
            $scope.buttons = [
                {
                    label: $scope.translations['MODAL.CANCEL'],
                    class: 'btn btn-link',
                    handler: $scope.handleCancelClick,
                    disabled: false
                },
                $scope.saveButton
            ];
        };

        $translate(['MODAL.CANCEL', 'MODAL.SAVE']).then($scope.processTranslations);

        $scope.handleSaveClick = function () {
            var totalVolumeGB = createVPGHelperFactory.calculateTotalVolumesInGB([vm]);

            if (createVPGHelperFactory.validateLimits($scope.vm.JournalHardLimit, $scope.vm.JournalWarningThreshold, totalVolumeGB)) {
                objectTransformHelpersService.JournalLimitTypeGBtoMB($scope.vm.JournalHardLimit);
                objectTransformHelpersService.JournalLimitTypeGBtoMB($scope.vm.JournalWarningThreshold);
                editVcdVmFactory.save($scope.vm);
                $scope.close();
            } else {
                zAlertFactory.fail('Error', $translate.instant('ADVANCED_JOURNAL_SETTINGS.LIMIT_ERROR'));
            }

        };

        $scope.handleCancelClick = function () {
            $scope.close();
        };

        $scope.close = function () {
            editVcdVmFactory.closeWindow('close');
        };

        $scope.disableButtons = function (value) {
            $scope.saveButton.disabled = !value;
        };

        $scope.loading = function () {
            return !$scope.data && !$scope.translations && !$scope.data.potentialVirtualDatacenterStorageProfiles;
        };

        $scope.$watch('forms.editVcdVmForm.$valid', $scope.disableButtons);

        function init() {
            var config = vpgService.getVpgConfig();
            $scope.isStorageProfileEnabled = storageService.isStorageProfileEnabled();

            storageService.getVCDPotentialVirtualDatacenterStorageProfiles(
                config.OwnersId,
                vpgService.getProtectionGroupId(),
                config.RecoveryVappSettings.VCDVappSettings.TargetVirtualDatacenter.Id
            ).then(function (result) {
                $scope.data.potentialVirtualDatacenterStorageProfiles = _.sortBy(result, 'DisplayName');
            });
        }

        init();
    });
