'use strict';

angular.module('zvmApp.core')
    .controller('restoreNicsPopup', function ($scope, $translate, item, potentials, restoreNicsFactory, $filter, zAlertFactory, zSlickGridFilterTypes, restoreEditNicFactory) {
        $scope.loading = true;
        $scope.item = item;
        $scope.potentials = potentials;
        $scope.gridObj = {};

        $scope.handleSaveClicked = function () {
            restoreNicsFactory.save($scope.item);
        };

        $scope.handleCancel = function () {
            restoreNicsFactory.close();
        };

        $scope.processTranslations = function (translations) {
            $scope.sendButton = {
                label: translations['MODAL.DONE'],
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

            $scope.title = $scope.item.Name + translations['RESTORE_NICS.TITLE'];
            $scope.loading = false;
        };

        $translate(['MODAL.CANCEL', 'MODAL.DONE', 'RESTORE_NICS.TITLE']).then($scope.processTranslations);

        //===============================================================
        // user interactions
        //===============================================================
        $scope.handleEditSelectedClick = function () {
            restoreEditNicFactory.openEdit($scope.selectedItems, $scope.potentials).then($scope.onEditFactoryResult);
        };

        $scope.onEditFactoryResult = function (result) {
            var selectedVNicsNames = _.map($scope.selectedItems, function (obj) {
                return obj.VNicIdentifier.Name;
            });
            _.each($scope.item.VNics, function (vnic) {
                if (_.contains(selectedVNicsNames, vnic.VNicIdentifier.Name)) {
                    vnic.DisplayName = result.DisplayName;
                    vnic.VCenterVNicRestoreConfiguration.IPConfiguration = result.VCenterVNicRestoreConfiguration.IPConfiguration;
                    vnic.VCenterVNicRestoreConfiguration.IsIPConfigurationEnabled = result.VCenterVNicRestoreConfiguration.IsIPConfigurationEnabled;
                    vnic.VCenterVNicRestoreConfiguration.IsNewMacAddress = result.VCenterVNicRestoreConfiguration.IsNewMacAddress;
                    vnic.VCenterVNicRestoreConfiguration.Network = result.VCenterVNicRestoreConfiguration.Network;
                }
            });
            $scope.updateGrid();
        };

        //===============================================================
        // grid init
        //===============================================================

        var uiSelectEventFunction = {
            getUiSelectModel: function (item) {
                return item.VCenterVNicRestoreConfiguration.Network;
            },
            applyValueFunction: function (item, value) {
                item.VCenterVNicRestoreConfiguration.Network = value;
            },
            loadValueFunction: function (item) {
                return item.VCenterVNicRestoreConfiguration.Network;
            },
            serializeValueFunction: function (model) {
                return model;
            }
        };

        var getNetworksForNicEditor = function () {
            return $filter('zInlineDropdownEditor')({
                className: 'networks-nic-restore-inline-dropdown',
                optionsCollection: $scope.potentials.Networks,
                propName: 'DisplayName',
                searchEnabled: true,
                uiSelectModel: uiSelectEventFunction.getUiSelectModel,
                applyValue: uiSelectEventFunction.applyValueFunction,
                loadValue: uiSelectEventFunction.loadValueFunction,
                serializeValue: uiSelectEventFunction.serializeValueFunction
            });
        };

        $scope.restoreNicsColumnsDefs = [
            {
                id: 'DisplayName',
                name: $translate.instant('RESTORE_EDIT_NIC.NIC_NAME'),
                width: 271,
                field: 'DisplayName',
                cssClass: 'editable-cell',
                editor: $filter('textEditor')
            },
            {
                id: 'VCenterVNicRestoreConfigurationNetwork',
                name: $translate.instant('RESTORE_EDIT_NIC.NETWORK'),
                width: 173,
                field: 'VCenterVNicRestoreConfiguration',
                formatter: $filter('networkFormatter'),
                cssClass: 'editable-cell',
                editor: getNetworksForNicEditor()
            },
            {
                id: 'VCenterVNicRestoreConfigurationMacAddress',
                name: $translate.instant('RESTORE_EDIT_NIC.NEW_MAC'),
                width: 106,
                field: 'VCenterVNicRestoreConfiguration',
                formatter: $filter('propertyToEnumFormatter')('use-icon', 'IsNewMacAddress'),
                cssClass: 'editable-cell',
                editor: $filter('checkboxEditorByProperty')('IsNewMacAddress')
            },
            {
                id: 'VCenterVNicRestoreConfigurationIpAddress',
                name: $translate.instant('RESTORE_EDIT_NIC.IP_ADDRESS'),
                width: 146,
                field: 'VCenterVNicRestoreConfiguration',
                formatter: $filter('ipConfigurationFormatter'),
                cssClass: 'editable-cell',
                editor: $filter('restoreNicsIpEditor')('VCenterVNicRestoreConfiguration')
            },
            {
                id: 'VCenterVNicRestoreConfigurationDnsServer',
                name: $translate.instant('RESTORE_EDIT_NIC.PREFERRED_DNS_SERVER'),
                width: 174,
                field: 'VCenterVNicRestoreConfiguration',
                formatter: $filter('dnsFormatter')('PrimaryDns'),
                cssClass: 'editable-cell',
                editor: $filter('restoreNicsDnsEditor')('VCenterVNicRestoreConfiguration')
            }
        ];

        var queueAndExecuteCommand = function (item, column, editCommand) {
            if (column.id === 'VCenterVNicRestoreConfigurationIpAddress') {
                //todo: 'undo' does not working for inline editing
                //console.log(editCommand.serializedValue);
            }
            $scope.gridObj.grid.commandQueue.push(editCommand);
            editCommand.execute();
        };

        $scope.selectedItems = [];
        $scope.restoreNicsOptions = {
            columns: $scope.restoreNicsColumnsDefs,
            editCommandHandler: queueAndExecuteCommand
        };
        //===============================================================
        // helpers
        //===============================================================

        $scope.onSelection = function () {
            if (!$scope.$$phase) {
                $scope.$digest();
            }
        };
        $scope.updateGrid = function () {
            $scope.gridObj.grid.updateData($scope.item.VNics);
        };

    });
