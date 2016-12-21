'use strict';

angular.module('zvmApp.core')
    .controller('advancedVcdVmReplicationSettingsPopup', function ($scope, $filter, $translate, createVPGModel, advancedVcdVmReplicationSettingsFactory, vos,
                                                                   enums, advancedVcdVmReplicationSettingsModel, zSlickGridFilterTypes, editVcdVmFactory, zertoServiceFactory,
                                                                   zAlertFactory, vmsService, vpgService, storageService) {

        $scope.data = {
            copiedVms: _.cloneDeep(vmsService.getInitializedSelectedVms())
        };
        $scope.gridObj = {};
        $scope.translations = $translate.instant(['MODAL.CANCEL', 'MODAL.OK']);

        $scope.handleSaveClicked = function () {
            var limitsResult = storageService.validateJournalLimits($scope.data.copiedVms);

            if (limitsResult === '') {
                var validationTokens = [],
                    vpgConfig = vpgService.getVpgConfig();

                validationTokens.push(new vos.InputValidationTokenVisualObject(enums.InWizardValidationTypeVisualObject.RecoveryHost));
                validationTokens.push(new vos.InputValidationTokenVisualObject(enums.InWizardValidationTypeVisualObject.RecoveryDatastoreVm));
                validationTokens.push(new vos.InputValidationTokenVisualObject(enums.InWizardValidationTypeVisualObject.JournalSpaceConfiguredForVm));

                zertoServiceFactory.ValidateProtectionGroup(vpgService.getProtectionGroupId(), vpgConfig, createVPGModel.getCreateValidationFlags(), validationTokens, vpgService.isReverse())
                    .then(function (result) {
                        if (result && result.length > 0) {
                            zAlertFactory.fail($translate.instant('ADVANCED_VM_REPLICATION_SETTINGS.SAVE_SETTINGS'), $scope.setValidationErrorString(result));
                        } else {
                            advancedVcdVmReplicationSettingsFactory.modalInstance.close($scope.data.copiedVms);
                            $scope.close();
                        }
                    });
            } else {
                zAlertFactory.fail('Error', '<ul>' + limitsResult + '</ul>');
            }
        };

        $scope.saveButton = {
            label: $scope.translations['MODAL.OK'],
            handler: $scope.handleSaveClicked,
            disabled: false
        };
        $scope.loading = false;
        $scope.selectedItems = [];

        $scope.close = function () {
            advancedVcdVmReplicationSettingsFactory.modalInstance.dismiss('close');
        };

        $scope.handleCancelClicked = function () {
            $scope.close();
        };

        ///////////////////////////////
        $scope.groupByValues = [
            {
                id: '',
                text: $translate.instant('GROUP_BY_LIST.NONE')
            },
            {
                id: 'Name',
                text: $translate.instant('GROUP_BY_LIST.VM_NAME')
            },
            {
                id: 'StorageProfileObj.display',
                text: $translate.instant('ADVANCED_VM_REPLICATION_SETTINGS.GRID.STORAGE_PROFILE')
            }
        ];

        var queueAndExecuteCommand = function (item, column, editCommand) {
            switch (column.id) {
                case 'StorageProfileObj':
                    editCommand.editor.applyValue = advancedVcdVmReplicationSettingsModel.applyValueStorageProfile;
                    break;
                case 'JournalHardLimitObj':
                    editCommand.editor.applyValue = advancedVcdVmReplicationSettingsModel.applyValueJournalHardLimit;
                    break;
                case 'JournalWarningThresholdObj':
                    editCommand.editor.applyValue = advancedVcdVmReplicationSettingsModel.applyValueJournalWarningThreshold;
                    break;
            }
            $scope.gridObj.advancedVcdVmSettingsGrid.commandQueue.push(editCommand);
            editCommand.execute();
        };

        var getStorageEditor = function () {
            return $filter('zInlineDropdownEditor')({
                className: 'advanced-vm-replication-vcd-inline-dropdown',
                optionsCollection: advancedVcdVmReplicationSettingsModel.getVCDPotentialStorageProfiles,
                propName: 'display',
                searchEnabled: false,
                disabled: 'isDisabled'
            });
        };

        var columns = [
            {
                name: $translate.instant('ADVANCED_VM_REPLICATION_SETTINGS.GRID.VM_NAME'),
                field: 'Name',
                filter: zSlickGridFilterTypes.WILDCARD
            },
            {
                name: $translate.instant('ADVANCED_VM_REPLICATION_SETTINGS.GRID.STORAGE_PROFILE'),
                field: 'StorageProfileObj',
                formatter: $filter('objectFormatter'),
                id: 'StorageProfileObj',
                cssClass: 'editable-cell',
                editor: getStorageEditor()
            },
            {
                name: $translate.instant('ADVANCED_VM_REPLICATION_SETTINGS.GRID.JOURNAL_SIZE'),
                field: 'JournalHardLimitObj',
                id: 'JournalHardLimitObj',
                formatter: $filter('objectFormatter'),
                cssClass: 'editable-cell input-editor',
                editor: $filter('vmJournalSize')('JournalHardLimit')
            },
            {
                name: $translate.instant('ADVANCED_VM_REPLICATION_SETTINGS.GRID.JOURNAL_WARNING_THRESHOLD'),
                field: 'JournalWarningThresholdObj',
                id: 'JournalWarningThresholdObj',
                formatter: $filter('objectFormatter'),
                cssClass: 'editable-cell input-editor',
                editor: $filter('vmJournalSize')('JournalWarningThreshold')
            }
        ];

        $scope.buttons = [
            {
                label: $scope.translations['MODAL.CANCEL'],
                class: 'btn btn-link',
                handler: $scope.handleCancelClicked,
                disabled: false
            },
            $scope.saveButton
        ];

        if (!storageService.getIsSlaCustom()) {
            delete columns[_.findIndex(columns, {id: 'JournalHardLimitObj'})].cssClass;
            delete columns[_.findIndex(columns, {id: 'JournalWarningThresholdObj'})].cssClass;
        }

        $scope.vmsGridOptions = {
            columns: columns,
            showSearch: true,
            editCommandHandler: queueAndExecuteCommand
        };

        $scope.handleApplyDefaultsClick = function () {
            zAlertFactory.fail('Not implemented');
        };

        $scope.handleEditSelectedClick = function () {
            editVcdVmFactory.openWindow($scope.selectedItems)
                .then($scope.onEditVcdVMFactoryResultSave);
        };

        $scope.onEditVcdVMFactoryResultSave = function (result) {
            _.forEach($scope.selectedItems, function (item) {
                if (!item.StorageProfile) {
                    var vdspv = new vos.VCDVirtualDatacenterStorageProfileVisualObject();
                    item.StorageProfile = new vos.VPGDetailsStorageProfileVisualObject(vdspv);
                }
                item.StorageProfile.VCDStorageProfile = result.StorageProfile.VCDStorageProfile;
                item.JournalHardLimit = result.JournalHardLimit;
                item.JournalWarningThreshold = result.JournalWarningThreshold;
                advancedVcdVmReplicationSettingsModel.processItem(item);
            });

            $scope.gridObj.advancedVcdVmSettingsGrid.updateData($scope.gridData);
        };

        $scope.selectedItemsChange = function () {
            if (!$scope.$$phase) {
                $scope.$digest();
            }
        };

        $scope.gridData = advancedVcdVmReplicationSettingsModel.processData($scope.data.copiedVms);
    });
