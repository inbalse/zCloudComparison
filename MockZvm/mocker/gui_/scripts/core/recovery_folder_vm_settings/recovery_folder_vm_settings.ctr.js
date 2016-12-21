'use strict';

angular.module('zvmApp.core')
    .controller('recoveryFolderVmSettingsController', function ($scope, $translate, $filter, recoveryFolderVmSettingsModel,
                                                                zSlickGridFilterTypes, recoveryFolderVmSettingsFactory, editVmFolderFactory) {

        $scope.loading = true;
        $scope.data = _.cloneDeep(recoveryFolderVmSettingsFactory.data);
        $scope.gridObj = {};
        $scope.selectedItems = [];

        var queueAndExecuteCommand = function (item, column, editCommand) {
            editCommand.editor.applyValue = recoveryFolderVmSettingsModel.applyValueRecoveryFolder;

            $scope.gridObj.recoveryFolderVmSettingsGrid.commandQueue.push(editCommand);
            editCommand.execute();
        };

        var getPotentialRecoveryFolders = function () {
            return $filter('zInlineDropdownEditor')({
                className: 'vm-recovery-host-inline-dropdown',
                optionsCollection: recoveryFolderVmSettingsModel.getRecoveryFolders,
                propName: 'value',
                searchEnabled: true
            });
        };

        var columnDefs = [
            {
                name: $translate.instant('ADVANCED_VM_REPLICATION_SETTINGS.GRID.VM_NAME'),
                field: 'Name',
                filter: zSlickGridFilterTypes.WILDCARD
            },
            {
                name: $translate.instant('ADVANCED_VM_REPLICATION_SETTINGS.GRID.RECOVERY_FOLDER'),
                id: 'RecoveryFolder',
                field: 'RecoveryFolder',
                formatter: $filter('objectFormatter'),
                zCellValidation: function (dataItem) {
                    return angular.isDefined(dataItem.display) && dataItem.display !== '';
                },
                cssClass: 'editable-cell',
                editor: getPotentialRecoveryFolders()
            }
        ];

        var getUniqueValues = function (list) {
            var result = [];
            _.forEach(list, function (item) {
                var found = _.find(result, function (resultItem) {
                    return _.isEqual(resultItem, item);
                });

                if (!found) {
                    result.push(item);
                }
            });

            return result;
        };

        $scope.customOptions = {
            columns: columnDefs,
            showSearch: true,
            //Bug 21858 requested to add add group by
            showGroupBy: true,
            editCommandHandler: queueAndExecuteCommand
        };

        $scope.groupByValues = [
            {
                id: '',
                text: $translate.instant('GROUP_BY_LIST.NONE')
            },
            {
                id: 'RecoveryFolder',
                text: $translate.instant('ADVANCED_VM_REPLICATION_SETTINGS.GRID.RECOVERY_FOLDER')
            }];

        $scope.close = function () {
            recoveryFolderVmSettingsFactory.modalInstance.dismiss('close');
        };

        $scope.handleCancelClicked = function () {
            $scope.close();
        };

        $scope.handleSaveClicked = function () {
            recoveryFolderVmSettingsFactory.save($scope.data);
            $scope.close();
        };

        $scope.saveButton = {
            label: $translate.instant('MODAL.OK'),
            handler: $scope.handleSaveClicked,
            disabled: false
        };
        $scope.buttons = [
            {
                label: $translate.instant('MODAL.CANCEL'),
                class: 'btn btn-link',
                handler: $scope.handleCancelClicked,
                disabled: false
            },
            $scope.saveButton
        ];

        $scope.handleEditSelectedClick = function () {
            //get all the host from selected vms
            //calculate the mutual folder
            var hostsIdent = _.map($scope.selectedItems, function (item) {
                return item.TargetHost.BaseComputeResourceIdentifier;
            });

            var uniqueHosts = getUniqueValues(hostsIdent);

            recoveryFolderVmSettingsFactory.getPotentialFoldersForSelectedVms(uniqueHosts).then(function (result) {
                editVmFolderFactory.openWindow($scope.selectedItems, result.PotentialFolders).then($scope.onEditVmFolderFactoryResultSave);
            });

        };

        $scope.onEditVmFolderFactoryResultSave = function (result) {
            //apply folder all selected vm
            _.forEach($scope.selectedItems, function (item) {
                item.TargetFolder = result.TargetFolder;
                recoveryFolderVmSettingsModel.processItem(item);
            });

            $scope.gridObj.recoveryFolderVmSettingsGrid.updateData($scope.gridData);
        };

        $scope.selectedItemsChange = function () {
            if (!$scope.$$phase) {
                $scope.$digest();
            }
        };

        $scope.gridData = recoveryFolderVmSettingsModel.processData($scope.data);
        $scope.loading = false;
    });
