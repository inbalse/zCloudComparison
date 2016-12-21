'use strict';

angular.module('zvmApp.core')
    .service('createVpgRecoveryNetworksService', function ($filter, vpgService, vmsService, networksService) {
        var createVpgRecoveryNetworksService = this;

        createVpgRecoveryNetworksService.getDefaultFailoverNetwork = function () {
            return networksService.getDefaultFailoverNetwork();
        };

        createVpgRecoveryNetworksService.getDefaultTestNetwork = function () {
            return networksService.getDefaultTestNetwork();
        };

        createVpgRecoveryNetworksService.getColumns = function () {
            return [
                {name: 'Protected', field: 'OriginalOrgVdcNetworkValue', formatter: $filter('displayNameFormatter')},
                {
                    name: 'Failover/Move',
                    field: 'RecoveryOrgVdcNetworkValue',
                    formatter: $filter('displayNameFormatter'),
                    cssClass: 'editable-cell',
                    editor: getDropdownEditorByLabeler('RecoveryOrgVdcNetworkValue')
                },
                {
                    name: 'Failover Test',
                    field: 'RecoveryTestOrgVdcNetworkValue',
                    formatter: $filter('displayNameFormatter'),
                    cssClass: 'editable-cell',
                    editor: getDropdownEditorByLabeler('RecoveryTestOrgVdcNetworkValue')
                },
                {
                    name: 'Failover Test To Original Site',
                    minWidth: 120,
                    field: 'ReverseReplicationTestOrgVdcNetworkValue',
                    formatter: $filter('displayNameFormatter'),
                    cssClass: 'editable-cell',
                    editor: getDropdownEditorByLabeler('ReverseReplicationTestOrgVdcNetworkValue')
                }
            ];
        };

        createVpgRecoveryNetworksService.getGroupExtraSettings = function () {
            return {displayProp: 'Name', idProp: 'Id', externalIdProp: 'Id', enableSearch: true};
        };

        var getDropdownEditorByLabeler = function (prop) {
            return $filter('zInlineDropdownEditor')({
                className: 'dropdown-editor-by-labeler',
                optionsCollection: prop === 'ReverseReplicationTestOrgVdcNetworkValue' ? networksService.getPotentialReverseMappingNetworks() : networksService.getPotentialMappingNetworks(),
                propName: prop,
                uiSelectModel: uiSelectLabelerEventFunction.getModelFunction,
                applyValue: uiSelectLabelerEventFunction.applyValueFunction,
                loadValue: uiSelectLabelerEventFunction.loadValueFunction,
                searchEnabled: false,
                appendToBody: true
            });
        };

        var uiSelectLabelerEventFunction = {
            getModelFunction: function (item, prop) {
                return item[prop];
            },
            applyValueFunction: function (item, value, prop) {
                item[prop] = value;
                updateVCDNetworkMapping(value, prop);
            },
            loadValueFunction: function (item, prop) {
                return item[prop];
            }
        };

        createVpgRecoveryNetworksService.failoverNetworkChange = function (defaultFailoverNetwork) {
            createVpgRecoveryNetworksService.applyNetworkSettings(defaultFailoverNetwork, false);
            vpgService.handleChangingDefaultValues();
        };

        createVpgRecoveryNetworksService.testNetworkChange = function (defaultTestNetwork) {
            createVpgRecoveryNetworksService.applyNetworkSettings(defaultTestNetwork, true);
            vpgService.handleChangingDefaultValues();
        };

        createVpgRecoveryNetworksService.applyNetworkSettings = function (network, isTestSettings) {
            var selectedVms = vmsService.getInitializedSelectedVms();

            if (vpgService.isVcdVapp()) {
                if (isTestSettings) {
                    networksService.applyDefaultVCDTestNetwork(selectedVms, network);
                }
                else {
                    networksService.applyDefaultVCDFailoverNetwork(selectedVms, network);
                }
            } else {
                if (isTestSettings) {
                    networksService.applyDefaultTestNetwork(selectedVms, network);
                } else {
                    networksService.applyDefaultFailoverNetwork(selectedVms, network);
                }
            }
        };

        function updateVCDNetworkMapping(network, prop) {
            var settingsProp = (prop === 'RecoveryOrgVdcNetworkValue') ? 'FailoverSettings' : 'TestSettings';

            _.forEach(vmsService.getInitializedSelectedVms(), function (vm) {
                if (vm._isNewVm) {
                    _.forEach(vm.NetworkInterfaces, function (nic) {
                        nic[settingsProp].VCDNetworkSettings.NicInfo.VappNetworkName = network.DisplayName;
                    });
                }
            });
        }

    });
