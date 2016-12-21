'use strict';

angular.module('zvmApp.core')
    .service('createVpgNicVCGridService', function ($q, $filter, $translate, enums, networksService, createVpgNicNetworkEditorService,
                                                    createVpgNicConstants, zSlickGridFilterTypes) {
        var nicVCGrid = this,
            targetSite,
            sourceSite;

        nicVCGrid.init = function (source, target) {

            targetSite = target;
            sourceSite = source;

            var defer = $q.defer(),
                gridObj = {
                    id: createVpgNicConstants.GRID.IDS.VC,
                    data: networksService.getVmsNicsList(),
                    groupByValues: createVpgNicConstants.GRID.GROUP_BY_VALUES,
                    onValidationUpdate: function () {
                        return defer.promise;
                    }
                };


            gridObj.customOptions = {
                columns: nicVCGrid.getColumnDefs(),
                showSearch: true,
                editCommandHandler: function (item, column, editCommand) {
                    var allowUndo = nicVCGrid.handleCommand(column, editCommand);
                    if (allowUndo) {
                        gridObj.grid.commandQueue.push(editCommand);
                    }
                    defer.notify();
                }
            };

            return gridObj;
        };

        nicVCGrid.handleCommand = function (column, editCommand) {
            var allowUndo = !(_.isEqual(column.field, createVpgNicConstants.COLUMNS.FAILOVER_IP) ||
            _.isEqual(column.field, createVpgNicConstants.COLUMNS.TEST_IP));

            editCommand.execute();

            return allowUndo;
        };

        nicVCGrid.getIpInfoTextAndPosition = function (isTestIp) {
            var textInfo, topFixer, leftFixer;

            topFixer = isTestIp ? 120 : 35;
            leftFixer = isTestIp ? 35 : 140;

            if (sourceSite === enums.VpgEntityType.VCVpg && targetSite === enums.VpgEntityType.VCVpg) {
                textInfo = $translate.instant('EDIT_NIC.VC_TO_VC_INFO');
            } else if (sourceSite === enums.VpgEntityType.HyperV && targetSite === enums.VpgEntityType.HyperV) {
                textInfo = $translate.instant('EDIT_NIC.HYPER_V_TO_HYPER_V');
            } else {
                textInfo = $translate.instant('EDIT_NIC.MIXED_TYPE_INFO');
                topFixer = isTestIp ? 154 : 52;
                leftFixer = isTestIp ? 56 : 150;
            }

            return {text: textInfo, top: topFixer, left: leftFixer};
        };

        nicVCGrid.getColumnDefs = function() {
            return [
                {
                    name: $translate.instant('CREATE_VPG_NICS.COLUMNS.VM_NAME'),
                    field: createVpgNicConstants.COLUMNS.VM_NAME,
                    filter: zSlickGridFilterTypes.WILDCARD
                },
                {
                    name: $translate.instant('CREATE_VPG_NICS.COLUMNS.NIC_NAME'),
                    field: createVpgNicConstants.COLUMNS.VC.NIC_NAME,
                    filter: zSlickGridFilterTypes.WILDCARD
                },
                {
                    name: $translate.instant('CREATE_VPG_NICS.COLUMNS.PROTECTED_NETWORK'),
                    filter: zSlickGridFilterTypes.WILDCARD,
                    field: createVpgNicConstants.COLUMNS.VC.PROTECTED_NETWORK
                },
                {
                    name: $translate.instant('CREATE_VPG_NICS.COLUMNS.FAILOVER_NETWORK'),
                    filter: zSlickGridFilterTypes.WILDCARD,
                    field: createVpgNicConstants.COLUMNS.FAILOVER_NETWORK,
                    cssClass: 'editable-cell',
                    editor: nicVCGrid.getNicNetworkEditor(createVpgNicConstants.COLUMNS.FAILOVER_NETWORK)
                },
                {
                    name: $translate.instant('CREATE_VPG_NICS.COLUMNS.FAILOVER_IP'),
                    filter: zSlickGridFilterTypes.WILDCARD,
                    field: createVpgNicConstants.COLUMNS.FAILOVER_IP,
                    zCellEditable: function (dataItem) {

                        var infoObj = nicVCGrid.getIpInfoTextAndPosition(false);

                        return {
                            isEditEnabled: angular.isDefined(dataItem.IsIPConfigurationEnabled) && dataItem.IsIPConfigurationEnabled,
                            errorMessage: infoObj.text, leftFixer: infoObj.left, topFixer: infoObj.top
                        };
                    },
                    cssClass: 'editable-cell',
                    editor: $filter('nicIpEditor')(createVpgNicConstants.EDITOR_SETTINGS.FAILOVER_SETTINGS)
                },
                {
                    name: $translate.instant('CREATE_VPG_NICS.COLUMNS.TEST_NETWORK'),
                    filter: zSlickGridFilterTypes.WILDCARD,
                    field: createVpgNicConstants.COLUMNS.TEST_NETWORK,
                    cssClass: 'editable-cell',
                    editor: nicVCGrid.getNicNetworkEditor(createVpgNicConstants.COLUMNS.TEST_NETWORK)
                },
                {
                    name: $translate.instant('CREATE_VPG_NICS.COLUMNS.TEST_IP'),
                    filter: zSlickGridFilterTypes.WILDCARD,
                    field: createVpgNicConstants.COLUMNS.TEST_IP,
                    zCellEditable: function (dataItem) {

                        var infoObj = nicVCGrid.getIpInfoTextAndPosition(true);

                        return {
                            isEditEnabled: angular.isDefined(dataItem.IsIPConfigurationEnabled) && dataItem.IsIPConfigurationEnabled,
                            errorMessage: infoObj.text, leftFixer: infoObj.left, topFixer: infoObj.top
                        };
                    },
                    cssClass: 'editable-cell editor-to-right',
                    editor: $filter('nicIpEditor')(createVpgNicConstants.EDITOR_SETTINGS.TEST_SETTINGS)
                }
            ];
        };

        //region VC NIC INLINE
        nicVCGrid.getNicNetworkEditor = function (prop) {
            return $filter('zInlineDropdownEditor')(createVpgNicNetworkEditorService.getEditor(prop));
        };
    });
