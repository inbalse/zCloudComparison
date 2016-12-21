'use strict';

angular.module('zvmApp.core')
    .constant('restoreVmEvents', {
        editVolumes: 'RestoreVm::EditVolumes',
        editNics: 'RestoreVm::EditNics'
    })
    .controller('restoreVmSettingsController', function ($scope, $filter, $window, $translate, restoreVmEvents, zSlickGridFilterTypes, restoreWizardModel, zAlertFactory, restoreVolumesFactory, restoreNicsFactory, restoreBulkEditFactory) {
        //===============================================================
        // grids init
        //===============================================================
        $scope.isHyperV = restoreWizardModel.isHyperV;
        $scope.data = restoreWizardModel.data;
        $scope.grid = {};
        $scope.selectedVmSettings = [];
        $scope.potentialsForDatastores = [];
        $scope.potentialsForHosts = [];

        $scope.getPotentialHosts = function () {
            return $scope.potentialsForHosts;
        };

        $scope.queueAndExecuteCommand = function (item, column, editCommand) {
            var allowUndo = true;
            switch (column.id) {
                case 'IsPowerOn':
                    item.IsPowerOn = editCommand.serializedValue;
                    break;
                case 'Datastore':
                    //console.log(editCommand.serializedValue);
                    _.each(item.Volumes, function (volume) {
                        restoreWizardModel.applyDatastoreToVolume(volume, editCommand.serializedValue);
                    });
            }
            if (allowUndo) {
                $scope.grid.commandQueue.push(editCommand);
            }
            editCommand.execute();
        };

        var getDatastoreDropdownEditor = function () {
            return $filter('zInlineDropdownEditor')({
                className: 'datastore-restore-inline-dropdown',
                optionsCollection: restoreWizardModel.getVCenterPotentialDatatstore,
                propName: 'DisplayName',
                innerItemAsItem: 'Datastore',
                disabled: 'isDisabled',
                loadValue:function(item) {
                    return item.Datastore;
                },
                uiSelectModel: function (item) {
                    return _.isNullOrUndefined(item.Datastore) ? item.Datastore : {Datastore: item.Datastore};
                },
                applyValue: function (item, value) {
                    if(value) {//field can be empty in first time
                        if (value.hasOwnProperty('Datastore')) {
                            item.Datastore = value.Datastore;
                            item.Datastore.value = value.Datastore.DisplayName;
                        } else {
                            item.Datastore = value;
                            item.Datastore.value = value.DisplayName;
                        }
                    }
                },
                searchEnabled: true
            });
        };

        var getHostDropdownEditor = function () {
            return $filter('zInlineDropdownEditor')({
                className: 'host-restore-inline-dropdown',
                optionsCollection: $scope.getPotentialHosts,
                propName: 'DisplayName',
                searchEnabled: true
            });
        };

        $scope.restoreVmsSettingsColumnDefs = [
            {
                name: $translate.instant('RESTORE_WIZARD.RESTORE_VM_SETTINGS_STEP.COLUMNS.VM_NAME'),
                field: 'OriginalName',
                filter: zSlickGridFilterTypes.WILDCARD
            },
            {
                name: $translate.instant('RESTORE_WIZARD.RESTORE_VM_SETTINGS_STEP.COLUMNS.RESTORED_VM_NAME'),
                field: 'Name',
                filter: zSlickGridFilterTypes.WILDCARD,
                cssClass: 'editable-cell',
                editor: $filter('textEditor')
            },
            {
                name: $translate.instant('RESTORE_WIZARD.RESTORE_VM_SETTINGS_STEP.COLUMNS.HOST'),
                field: 'ComputeResource',
                filter: zSlickGridFilterTypes.MULTI_SELECT,
                formatter: $filter('computeResourceFilter'),
                cssClass: 'editable-cell',
                editor: getHostDropdownEditor()
            },
            {
                name: ($scope.isHyperV ? $translate.instant('RESTORE_WIZARD.RESTORE_VM_SETTINGS_STEP.COLUMNS.STORAGE') : $translate.instant('RESTORE_WIZARD.RESTORE_VM_SETTINGS_STEP.COLUMNS.DATASTORE')),
                field: 'Datastore',
                filter: zSlickGridFilterTypes.MULTI_SELECT,
                formatter: $filter('datastoreFilter'),
                cssClass: 'editable-cell',
                editor: getDatastoreDropdownEditor()
            },
            {
                name: $translate.instant('RESTORE_WIZARD.RESTORE_VM_SETTINGS_STEP.COLUMNS.BACKUP_STATUS'),
                field: 'Status',
                filter: zSlickGridFilterTypes.MULTI_SELECT
            },
            {
                name: $translate.instant('RESTORE_WIZARD.RESTORE_VM_SETTINGS_STEP.COLUMNS.VOLUMES'),
                field: 'VolumesDisplay',
                filter: zSlickGridFilterTypes.RANGE,
                formatter: $filter('objectFormatter')

            },
            {
                name: $translate.instant('RESTORE_WIZARD.RESTORE_VM_SETTINGS_STEP.COLUMNS.POWER_ON'),
                field: 'IsPowerOn',
                filter: zSlickGridFilterTypes.MULTI_SELECT,
                formatter: $filter('iconClassFormatter')('checkbox'),
                editor: $filter('checkboxOneClickEditor')('IsPowerOn')
            },
            {
                name: $translate.instant('RESTORE_WIZARD.RESTORE_VM_SETTINGS_STEP.COLUMNS.ACTIONS'),
                field: 'Actions',
                formatter: $filter('actionsFilter'),
                sortable: false
            }
        ];

        $scope.restoreVmsSettingsCustomOptions = {
            columns: $scope.restoreVmsSettingsColumnDefs,
            defaultSortField: 'Name',
            showCheckbox: true,
            showSearch: false,
            showGroupBy: false,
            editCommandHandler: $scope.queueAndExecuteCommand
        };

        //check if data already exist (save state between tabs)
        if (angular.isUndefined($scope.data.restoreConfiguration)) {
            restoreWizardModel.getRestoreConfigurationScreen();
        }
        else if(!angular.equals($scope.data.selectedItems[0].BackupJobIdentifier, $scope.data.restoreConfiguration.BackupJobIdentifier)) {
            restoreWizardModel.data.restoreHost = null;
            restoreWizardModel.data.restoreDatastore = null;
            $scope.data.potentialRestoreSecondaryEntities = null;
            restoreWizardModel.getRestoreConfigurationScreen();
        }

        //===============================================================
        // User interaction
        //===============================================================
        $scope.handleApplyVPGConfigurationClick = function () {
            restoreWizardModel.applyVPGConfiguration();
            $scope.updateGrid();
        };

        $scope.handleEditSelectedClick = function () {

            var potentialComputeResources = $scope.data.restoreConfiguration.PotentialRestoreMainEntities.PotentialComputeResources;

            restoreBulkEditFactory.openEdit($scope.selectedVmSettings, potentialComputeResources).then($scope.onEditBulkFactoryResult);
        };
        $scope.onEditBulkFactoryResult = function (result) {
            restoreWizardModel.applyChangesToSelectedVMs($scope.selectedVmSettings, result);
            $scope.updateGrid();
        };

        $scope.selectedVmSettingsChange = function () {
            if (!$scope.$$phase) {
                $scope.$digest();
            }
        };

        $scope.onRestoreHostChanged = function () {

            //clear the old datastore
            if (_.isObject($scope.data.restoreDatastore)) {
                $scope.data.restoreDatastore = null;
                restoreWizardModel.clearDatastoreToAll();
            }

            var selectedItem = restoreWizardModel.data.selectedItems[0];
            restoreWizardModel.getVCenterPotentialRestoreSecondaryEntities(selectedItem.SiteIdentifier,
                $scope.data.restoreHost.BaseComputeResourceIdentifier).then($scope.onVCenterPotentialsResult);

            restoreWizardModel.applyHostToAll($scope.data.restoreHost);
            $scope.updateGrid();
        };

        $scope.onVCenterPotentialsResult = function (result) {
            $scope.data.potentialRestoreSecondaryEntities = result;
            $scope.potentialsForDatastores = result.Datastores;
        };

        $scope.onRestoreDatastoreChanged = function () {
            restoreWizardModel.applyDatastoreToAll($scope.data.restoreDatastore);
            $scope.updateGrid();
        };

        $scope.updateGrid = function () {
            $scope.grid.updateData($scope.data.restoreConfiguration.Configuration.VirtualMachines);
        };

        //===============================================================
        // watchers
        //===============================================================
        $scope.watchers = {
            restoreConfiguration: $scope.$watch('data.restoreConfiguration', function (newValue) {
                if (angular.isDefined(newValue)) {
                    $scope.potentialsForHosts = $scope.data.restoreConfiguration.PotentialRestoreMainEntities.PotentialComputeResources;
                    $scope.watchers.restoreConfiguration();
                }
            })
        };

        $scope.rowClick = function (e, row) {
            if (e.target.rel) {
                e.preventDefault();
            }

            switch (e.target.rel) {
                case restoreVmEvents.editVolumes:
                {
                    var editedVolumeItem = angular.copy($scope.data.restoreConfiguration.Configuration.VirtualMachines[row]);

                    if (editedVolumeItem.ComputeResource && editedVolumeItem.ComputeResource.BaseComputeResourceIdentifier) {
                        restoreVolumesFactory.openEdit(editedVolumeItem,
                            $scope.data.selectedItems[0],
                            editedVolumeItem.ComputeResource.BaseComputeResourceIdentifier).then(function (result) {
                                $scope.data.restoreConfiguration.Configuration.VirtualMachines[row].Volumes = result.Volumes;
                                $scope.updateGrid();
                            });
                    } else {
                        zAlertFactory.fail(undefined, $translate.instant('RESTORE_WIZARD.WARNINGS.DEFAULTS_NOT_SELECTED_DESC'), undefined, undefined);
                    }
                    break;
                }
                case restoreVmEvents.editNics:
                {
                    var editedNicItem = angular.copy($scope.data.restoreConfiguration.Configuration.VirtualMachines[row]);

                    if (editedNicItem.ComputeResource && editedNicItem.ComputeResource.BaseComputeResourceIdentifier) {
                        restoreNicsFactory.openEdit(editedNicItem,
                            $scope.data.selectedItems[0],
                            editedNicItem.ComputeResource.BaseComputeResourceIdentifier).then(function (result) {
                                $scope.data.restoreConfiguration.Configuration.VirtualMachines[row].VNics = result.VNics;
                            });
                    } else {
                        zAlertFactory.fail(undefined, $translate.instant('RESTORE_WIZARD.WARNINGS.DEFAULTS_NOT_SELECTED_DESC'), undefined, undefined);
                    }
                    break;
                }
                default:
                    break;
            }
        };
    });
