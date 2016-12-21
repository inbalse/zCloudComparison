'use strict';

angular.module('zvmApp.core')
    .controller('advancedVmReplicationSettingsPopup', function ($scope, $translate, advancedVmReplicationSettingsFactory, zertoServiceFactory, zAlertFactory,
                                                                advancedVmReplicationSettingsModel, createVPGHelperFactory, objectTransformHelpersService, vos,
                                                                enums, zSlickGridFilterTypes, $filter, editVmFactory, vpgService, vmsService, storageService) {

        var targetSiteInfo = vpgService.getTargetSiteInfo();

        $scope.data = {
            isScvmm: vpgService.isScvmm(),
            vmsList: angular.copy(vmsService.getInitializedSelectedVms())
        };
        $scope.gridData = [];
        $scope.gridObj = {};

        //===========================================================================
        // Handle User interaction
        //===========================================================================
        $scope.close = function () {
            advancedVmReplicationSettingsFactory.modalInstance.dismiss('close');
        };

        $scope.handleCancelClicked = function () {
            $scope.close();
        };

        $scope.handleSaveClicked = function () {
            var limitsResult = storageService.validateJournalLimits($scope.data.vmsList);

            if (limitsResult === '') {
                advancedVmReplicationSettingsModel.gridValid($scope.data.vmsList, vpgService.getProtectionGroupId(), vpgService.getTargetSite().OwnersId.Id)
                    .then(function (result) {
                        if (result !== '') {
                            zAlertFactory.fail($translate.instant('ADVANCED_VM_REPLICATION_SETTINGS.SAVE_SETTINGS'), result);
                        } else {
                            var validationTokens = [];
                            validationTokens.push(new vos.InputValidationTokenVisualObject(enums.InWizardValidationTypeVisualObject.RecoveryHost));
                            validationTokens.push(new vos.InputValidationTokenVisualObject(enums.InWizardValidationTypeVisualObject.RecoveryDatastoreVm));
                            validationTokens.push(new vos.InputValidationTokenVisualObject(enums.InWizardValidationTypeVisualObject.JournalSpaceConfiguredForVm));
                            validationTokens.push(new vos.InputValidationTokenVisualObject(enums.InWizardValidationTypeVisualObject.VmComputeResourceCanSeeVmRecoveryDatastore));

                            var vpgSettings = vpgService.getVpgSettings();
                            zertoServiceFactory.ValidateProtectionGroup(vpgService.getProtectionGroupId(), vpgSettings.Config, vmsService.createValidationFlags(), validationTokens, vpgService.isReverse())
                                .then(function (result) {
                                    if (result && result.length > 0) {
                                        zAlertFactory.fail($translate.instant('ADVANCED_VM_REPLICATION_SETTINGS.SAVE_SETTINGS'), $scope.setValidationErrorString(result));
                                    } else {
                                        advancedVmReplicationSettingsFactory.modalInstance.close($scope.data.vmsList);
                                    }
                                });
                        }
                    });
            } else {
                zAlertFactory.fail('Error', '<ul>' + limitsResult + '</ul>');
            }
        };

        $scope.setValidationErrorString = function (validationError) {
            var result = '<ul>';
            _.forEach(validationError, function (error) {
                result = result + '<li>' + error.ErrorMsg + '</li>';
            });
            return result + '</ul>';
        };

        $scope.translations = $translate.instant(['MODAL.CANCEL', 'MODAL.OK']);
        $scope.saveButton = {
            label: $scope.translations['MODAL.OK'],
            handler: $scope.handleSaveClicked,
            disabled: false
        };
        $scope.buttons = [
            {
                label: $scope.translations['MODAL.CANCEL'],
                class: 'btn btn-link',
                handler: $scope.handleCancelClicked,
                disabled: false
            },
            $scope.saveButton
        ];

        $scope.loading = false;

        $scope.getPotentialHosts = function () {
            var computeResource = _.map(targetSiteInfo.PotentialReplicationDestinations, 'ComputeResource');
            _.each(computeResource, function (cr) {
                cr.filterValue = cr.DisplayName;
            });

            return computeResource;
        };

        var queueAndExecuteCommand = function (item, column, editCommand) {
            switch (column.id) {
                case 'RecoveryHost':
                    editCommand.editor.applyValue = advancedVmReplicationSettingsModel.applyValueRecoveryHost;
                    break;
                case 'RecoveryDatastore':
                    editCommand.editor.applyValue = advancedVmReplicationSettingsModel.applyValueRecoveryDatastore;

                    break;
                case 'JournalDatastoresObj':
                    editCommand.editor.applyValue = advancedVmReplicationSettingsModel.applyValueJournalDataStore;

                    break;
                case 'JournalHardLimitObj':
                    editCommand.editor.applyValue = advancedVmReplicationSettingsModel.applyValueHardLimit;
                    break;
                case 'JournalWarningThresholdObj':
                    editCommand.editor.applyValue = advancedVmReplicationSettingsModel.applyValueWarningThreshold;
                    break;
            }
            $scope.gridObj.advancedVmSettingsGrid.commandQueue.push(editCommand);
            editCommand.execute();
        };

        var getVmsRecoveryHostEditor = function () {
            return $filter('zInlineDropdownEditor')({
                className: 'vm-recovery-host-inline-dropdown',
                optionsCollection: $scope.getPotentialHosts,
                propName: 'value',
                searchEnabled: true
            });
        };

        var getRecoveryDatastoreEditor = function () {
            return $filter('zInlineDropdownEditor')({
                className: 'recovery-datastore-inline-dropdown',
                optionsCollection: advancedVmReplicationSettingsModel.getRecoveryComputeResource,
                propName: 'value',
                innerItemAsItem: 'Datastore',
                disabled: 'isDisabled',
                searchEnabled: true
            });
        };

        var getJournalDatastoreModel = function (item) {
            return item.JournalDatastoresObj.value ? item.JournalDatastoresObj.value.Datastore : item.JournalDatastoresObj.value;
        };

        var getJournalDatastoreEditor = function () {
            return $filter('zInlineDropdownEditor')({
                className: 'journal-datastore-inline-dropdown',
                optionsCollection: advancedVmReplicationSettingsModel.gerPotentialJournalDatastoresForDropdownOptions,
                propName: 'value',
                uiSelectModel: getJournalDatastoreModel,
                innerItemAsItem: 'Datastore',
                disabled: 'isDisabled',
                searchEnabled: false
            });
        };

        var columnDefs = [
            {
                name: $translate.instant('ADVANCED_VM_REPLICATION_SETTINGS.GRID.VM_NAME'),
                id: 'Name',
                field: 'Name',
                filter: zSlickGridFilterTypes.WILDCARD
            },
            {
                name: $translate.instant('ADVANCED_VM_REPLICATION_SETTINGS.GRID.RECOVERY_HOST_CLUSTER_HOST'),
                id: 'RecoveryHost',
                field: 'RecoveryHost',
                zCellValidation: function (dataItem) {
                    return angular.isDefined(dataItem.display) && dataItem.display !== '';
                },
                formatter: $filter('objectFormatter'),
                cssClass: 'editable-cell',
                editor: getVmsRecoveryHostEditor()

            },
            {
                name: $scope.data.isScvmm ? $translate.instant('ADVANCED_VM_REPLICATION_SETTINGS.GRID.RECOVERY_STORAGE') : $translate.instant('ADVANCED_VM_REPLICATION_SETTINGS.GRID.RECOVERY_DATASTORE'),
                id: 'RecoveryDatastore',
                field: 'RecoveryDatastore',
                zCellValidation: function (dataItem) {
                    return angular.isDefined(dataItem.display) && dataItem.display !== '';
                },
                formatter: $filter('objectFormatter'),
                cssClass: 'editable-cell',
                editor: getRecoveryDatastoreEditor(),
                zCellEditable: function (dataItem) {
                    return {
                        isEditEnabled: !_.isNullOrUndefined(dataItem.RecoveryHost.value),
                        errorMessage: 'Recovery host is empty',
                        leftFixer: 7
                    };
                }
            },
            {
                name: $translate.instant('ADVANCED_VM_REPLICATION_SETTINGS.GRID.JOURNAL_SIZE'),
                field: 'JournalHardLimitObj',
                id: 'JournalHardLimitObj',
                formatter: $filter('objectFormatter'),
                cssClass: 'editable-cell input-editor', editor: $filter('vmJournalSize')('JournalHardLimit')
            },
            {
                name: $translate.instant('ADVANCED_VM_REPLICATION_SETTINGS.GRID.JOURNAL_WARNING_THRESHOLD'),
                field: 'JournalWarningThresholdObj',
                id: 'JournalWarningThresholdObj',
                formatter: $filter('objectFormatter'),
                cssClass: 'editable-cell editor-to-right input-editor',
                editor: $filter('vmJournalSize')('JournalWarningThreshold')
            },
            {
                name: $scope.data.isScvmm ? $translate.instant('ADVANCED_VM_REPLICATION_SETTINGS.GRID.JOURNAL_STORAGE') : $translate.instant('ADVANCED_VM_REPLICATION_SETTINGS.GRID.JOURNAL_DATASTORE'),
                field: 'JournalDatastoresObj',
                id: 'JournalDatastoresObj',
                formatter: $filter('objectFormatter'),
                cssClass: 'editable-cell editor-to-right',
                editor: getJournalDatastoreEditor(),
                zCellEditable: function (dataItem) {
                    return {
                        isEditEnabled: !_.isNullOrUndefined(dataItem.RecoveryHost.value),
                        errorMessage: 'Recovery host is empty',
                        leftFixer: 13
                    };
                }
            }
        ];

        if (!$scope.data.isSlaCustom) {
            delete columnDefs[_.findIndex(columnDefs, {id: 'JournalHardLimitObj'})].cssClass;
            delete columnDefs[_.findIndex(columnDefs, {id: 'JournalWarningThresholdObj'})].cssClass;
        }

        $scope.customOptions = {
            columns: columnDefs,
            showSearch: true,
            editCommandHandler: queueAndExecuteCommand
        };

        $scope.selectedItems = [];

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
                id: 'RecoveryHostName',
                text: $translate.instant('GROUP_BY_LIST.RECOVERY_HOST_CLUSTER')
            },
            {
                id: 'RecoveryDatastoreName',
                text: $scope.data.isScvmm ? $translate.instant('GROUP_BY_LIST.RECOVERY_STORAGE') : $translate.instant('GROUP_BY_LIST.RECOVERY_DATASTORE')
            }
        ];

        $scope.handleApplyDefaultsClick = function () {
            zAlertFactory.fail('Not implemented');
        };

        $scope.handleEditSelectedClick = function () {
            editVmFactory.openWindow($scope.selectedItems, vpgService.isReverse())
                .then($scope.onEditVMFactoryResultSave);
        };

        $scope.onEditVMFactoryResultSave = function (result) {
            var updatedTargetHost;
            _.forEach($scope.selectedItems, function (item) {
                if (result.TargetHost) {
                    item.TargetHost = result.TargetHost;
                    updatedTargetHost = item.TargetHost;
                }
                if (result.TargetDatastore) {
                    item.TargetDatastore = result.TargetDatastore;
                }
                item.JournalHardLimit = result.JournalHardLimit;
                if (!_.isEmpty(result.JournalDatastores)) {
                    item.JournalDatastores = result.JournalDatastores.slice(0);
                }
                item.JournalWarningThreshold = result.JournalWarningThreshold;
                advancedVmReplicationSettingsModel.processItem(item);
            });

            $scope.gridObj.advancedVmSettingsGrid.updateData($scope.gridData);

        };

        $scope.selectedItemsChange = function () {
            if (!$scope.$$phase) {
                $scope.$digest();
            }
        };

        $scope.gridData = advancedVmReplicationSettingsModel.processData($scope.data.vmsList);

        $scope.Hosts = targetSiteInfo.PotentialReplicationDestinations;

    });
