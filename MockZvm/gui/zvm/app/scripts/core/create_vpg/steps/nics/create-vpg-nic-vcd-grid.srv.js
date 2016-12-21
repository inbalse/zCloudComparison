'use strict';

angular.module('zvmApp.core')
    .service('createVpgNicVCDGridService', function ($q, $filter, $translate, vpgService, networksService, createVpgNicNetworkVCDEditorService, createVpgNicMacEditorService,
                                                     createVpgNicConstants, zSlickGridFilterTypes) {
            var nicVCDGrid = this;
            var gridObj;


            nicVCDGrid.init = function (isVCDToVCD) {
                var defer = $q.defer();
                gridObj = {
                    id: isVCDToVCD ? createVpgNicConstants.GRID.IDS.VCDvVCD : createVpgNicConstants.GRID.IDS.VCvVCD,
                    data: networksService.getVmsVcdNicsList(),
                    groupByValues: createVpgNicConstants.GRID.GROUP_BY_VALUES,
                    viewByValues: createVpgNicConstants.GRID.VIEW_BY_VALUES,
                    onValidationUpdate: function () {
                        return defer.promise;
                    }
                };
                gridObj.customOptions = {
                    columns: nicVCDGrid.getColumnDefs(isVCDToVCD),
                    showSearch: true,
                    editCommandHandler: function (item, column, editCommand) {
                        var allowUndo = nicVCDGrid.handleVCDCommand(column, editCommand);
                        if (allowUndo) {
                            gridObj.grid.commandQueue.push(editCommand);
                        }

                        defer.notify();
                    }
                };


                return gridObj;
            };

            nicVCDGrid.handleVCDCommand = function (column, editCommand) {
                var allowUndo;
                switch (column.field) {
                    case createVpgNicConstants.COLUMNS.VCD.FAILOVER_CONNECTED:
                        editCommand.editor.applyValue = networksService.applyValueFailoverConnected;
                        allowUndo = true;
                        break;
                    case createVpgNicConstants.COLUMNS.VCD.TEST_CONNECTED:
                        editCommand.editor.applyValue = networksService.applyValueTestConnected;
                        allowUndo = true;
                        break;
                    case createVpgNicConstants.COLUMNS.VCD.FAILOVER_PRIMARY:
                        editCommand.editor.applyValue = nicVCDGrid.applyValueFailoverPrimary;
                        allowUndo = false;
                        break;
                    case createVpgNicConstants.COLUMNS.VCD.TEST_PRIMARY:
                        editCommand.editor.applyValue = nicVCDGrid.applyValueTestPrimary;
                        allowUndo = false;
                        break;
                    default:
                        allowUndo = true;
                }
                editCommand.execute();

                return allowUndo;
            };

            nicVCDGrid.getColumnDefs = function (isVCDToVCD) {
                var columns = [
                    {
                        name: 'NIC#',
                        width: 40,
                        field: createVpgNicConstants.COLUMNS.VCD.INDEX,
                        views: ['Failover/Move', 'Test'],
                        filter: zSlickGridFilterTypes.RANGE
                    },
                    {
                        name: $translate.instant('CREATE_VPG_NICS.COLUMNS.VM_NAME'),
                        field: createVpgNicConstants.COLUMNS.VM_NAME,
                        views: ['Failover/Move', 'Test'],
                        filter: zSlickGridFilterTypes.WILDCARD
                    },
                    {
                        name: $translate.instant('CREATE_VPG_NICS.COLUMNS.VCD_NETWORK'),
                        filter: zSlickGridFilterTypes.WILDCARD,
                        field: createVpgNicConstants.COLUMNS.FAILOVER_NETWORK,
                        cssClass: 'editable-cell',
                        views: ['Failover/Move'],
                        editor: nicVCDGrid.getNicVcdNetworkEditor(createVpgNicConstants.COLUMNS.FAILOVER_NETWORK)
                    },
                    {
                        name: $translate.instant('CREATE_VPG_NICS.COLUMNS.VCD_NETWORK'),
                        filter: zSlickGridFilterTypes.WILDCARD,
                        field: createVpgNicConstants.COLUMNS.TEST_NETWORK,
                        cssClass: 'editable-cell',
                        views: ['Test'],
                        editor: nicVCDGrid.getNicVcdNetworkEditor(createVpgNicConstants.COLUMNS.TEST_NETWORK)
                    },
                    {
                        name: $translate.instant('CREATE_VPG_NICS.COLUMNS.F_CONNECTED_TO_ORG_VDC_NETWORK'),
                        filter: zSlickGridFilterTypes.MULTI_SELECT,
                        views: ['Failover/Move'],
                        field: createVpgNicConstants.COLUMNS.VCD.FAILOVER_CONNECTED,
                        formatter: $filter('iconClassFormatter')('checkbox'),
                        editor: $filter('checkboxOneClickEditor')(createVpgNicConstants.COLUMNS.VCD.FAILOVER_CONNECTED)
                    },
                    {
                        name: $translate.instant('CREATE_VPG_NICS.COLUMNS.T_CONNECTED_TO_ORG_VDC_NETWORK'),
                        filter: zSlickGridFilterTypes.MULTI_SELECT,
                        views: ['Test'],
                        field: createVpgNicConstants.COLUMNS.VCD.TEST_CONNECTED,
                        formatter: $filter('iconClassFormatter')('checkbox'),
                        editor: $filter('checkboxOneClickEditor')(createVpgNicConstants.COLUMNS.VCD.TEST_CONNECTED)
                    },
                    {
                        name: $translate.instant('CREATE_VPG_NICS.COLUMNS.F_USE_PRIMARY_NIC'),
                        filter: zSlickGridFilterTypes.MULTI_SELECT,
                        views: ['Failover/Move'],
                        field: createVpgNicConstants.COLUMNS.VCD.FAILOVER_PRIMARY,
                        formatter: $filter('iconClassFormatter')('radiobutton'),
                        editor: $filter('radioClickEditor')(createVpgNicConstants.COLUMNS.VCD.FAILOVER_PRIMARY)
                    },
                    {
                        name: $translate.instant('CREATE_VPG_NICS.COLUMNS.T_USE_PRIMARY_NIC'),
                        filter: zSlickGridFilterTypes.MULTI_SELECT,
                        views: ['Test'],
                        field: createVpgNicConstants.COLUMNS.VCD.TEST_PRIMARY,
                        formatter: $filter('iconClassFormatter')('radiobutton'),
                        editor: $filter('radioClickEditor')(createVpgNicConstants.COLUMNS.VCD.TEST_PRIMARY)
                    },
                    {
                        name: $translate.instant('CREATE_VPG_NICS.COLUMNS.IP_ADDRESS'),
                        isInitiallyVisible: false,
                        filter: zSlickGridFilterTypes.WILDCARD,
                        field: createVpgNicConstants.COLUMNS.FAILOVER_IP,
                        views: ['Failover/Move'],
                        cssClass: 'editable-cell',
                        editor: $filter('nicVCDIpEditor')(createVpgNicConstants.EDITOR_SETTINGS.FAILOVER_SETTINGS)
                    },
                    {
                        name: $translate.instant('CREATE_VPG_NICS.COLUMNS.IP_ADDRESS'),
                        filter: zSlickGridFilterTypes.WILDCARD,
                        field: createVpgNicConstants.COLUMNS.TEST_IP,
                        views: ['Test'],
                        cssClass: 'editable-cell',
                        editor: $filter('nicVCDIpEditor')(createVpgNicConstants.EDITOR_SETTINGS.TEST_SETTINGS)
                    },
                    {
                        name: $translate.instant('CREATE_VPG_NICS.COLUMNS.FAILOVER_MAC_ADDRESS'),
                        filter: zSlickGridFilterTypes.WILDCARD,
                        field: createVpgNicConstants.COLUMNS.VCD.FAILOVER_MAC,
                        formatter: $filter('nicsMacaddressFormatter'),
                        views: ['Failover/Move'],
                        cssClass: 'editable-cell',
                        editor: nicVCDGrid.getMacAddressVcdEditor(createVpgNicConstants.COLUMNS.VCD.FAILOVER_MAC)
                    },
                    {
                        name: $translate.instant('CREATE_VPG_NICS.COLUMNS.TEST_MAC_ADDRESS'),
                        filter: zSlickGridFilterTypes.WILDCARD,
                        field: createVpgNicConstants.COLUMNS.VCD.TEST_MAC,
                        formatter: $filter('nicsMacaddressFormatter'),
                        views: ['Test'],
                        cssClass: 'editable-cell',
                        editor: nicVCDGrid.getMacAddressVcdEditor(createVpgNicConstants.COLUMNS.VCD.TEST_MAC)
                    }

                ];

                if (isVCDToVCD) {
                    _.remove(columns, {field: createVpgNicConstants.COLUMNS.FAILOVER_NETWORK});
                    _.remove(columns, {field: createVpgNicConstants.COLUMNS.TEST_NETWORK});
                }

                return columns;
            };

            //endregion

            //region VCD NIC INLINE
            nicVCDGrid.getNicVcdNetworkEditor = function (prop) {
                return $filter('zInlineDropdownEditor')(createVpgNicNetworkVCDEditorService.getEditor(prop));
            };

            //region VCD MAC ADDRESS INLINE
            nicVCDGrid.getMacAddressVcdEditor = function (prop) {
                return $filter('zInlineDropdownEditor')(createVpgNicMacEditorService.getEditor(prop));
            };

            nicVCDGrid.applyValueFailoverPrimary = function (item) {
                nicVCDGrid.resetPrimaryNicGrid(item, 'FailoverSettings', 'FailoverPrimary');
                networksService.applyValueFailoverPrimary(item);
            };

            nicVCDGrid.applyValueTestPrimary = function (item) {
                nicVCDGrid.resetPrimaryNicGrid(item, 'TestSettings', 'TestPrimary');
                networksService.applyValueTestPrimary(item);
            };

            nicVCDGrid.resetPrimaryNicGrid = function (item, property, display) {
                _.forEach(gridObj.data, function (nic) {
                    if (nic.vmId.InternalVmName === item.vmId.InternalVmName) {
                        nic[display] = false;
                        nic[property].VCDNetworkSettings.NicInfo.IsPrimary = false;
                    }
                });

                gridObj.grid.updateData(gridObj.data);

            };

            //endregion
        }
    );
