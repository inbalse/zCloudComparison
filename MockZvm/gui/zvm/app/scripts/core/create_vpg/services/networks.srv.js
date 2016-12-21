/**
 * Created by nir.moreno on 23/03/2016.
 */
'use strict';

angular.module('zvmApp.core')
    .service('networksService', function (createVPGModel, helperService, saveNicsService, saveVCDNicsService, enums, zertoServiceFactory,
                                          $translate, dataCollectionFactory, busyOverlayService, $q, vos) {

        var networksService = this;

        networksService.applyDefaultFailoverNetwork = function (vms, network) {
            createVPGModel.setConfigDefaultsByKey('FailoverNetwork', network);
            applyDefaultNetworks(vms, network);
        };

        networksService.applyDefaultTestNetwork = function (vms, network) {
            createVPGModel.setConfigDefaultsByKey('TestNetwork', network);
            applyDefaultTestNetworks(vms, network);
        };

        networksService.applyDefaultVCDFailoverNetwork = function (vms, network) {
            createVPGModel.setConfigDefaultsByKey('FailoverVCDVAppNetwork', network);
            _.forEach(vms, function (vm) {
                if (vm._isNewVm) {
                    _.forEach(vm.NetworkInterfaces, function (nic) {
                        applyDefaultVCDNicSettings(nic.FailoverSettings, network);
                    });
                }
            });
        };

        networksService.applyDefaultVCDTestNetwork = function (vms, network) {
            createVPGModel.setConfigDefaultsByKey('TestVCDVAppNetwork', network);
            _.forEach(vms, function (vm) {
                if (vm._isNewVm) {
                    _.forEach(vm.NetworkInterfaces, function (nic) {
                        applyDefaultVCDNicSettings(nic.TestSettings, network);
                    });
                }
            });
        };

        networksService.applyDefaultHost = function (vms, value) {

            var vpgSettings = createVPGModel.getVpgSettings();
            if (vpgSettings) {
                vpgSettings.Config.Defaults.TargetComputeResource = value;

                _.forEach(vms, function (vm) {
                    if (!vm.TargetHost || vm._isNewVm) {
                        vm.TargetHost = value;
                    }
                });
            }
        };

        networksService.vcdClearVMsNetworks = function (collection) {
            var networkNone = createVPGModel.getDefaultNetworkNone();

            _.forEach(collection, function (vm) {
                _.forEach(vm.NetworkInterfaces, function (nic) {
                    if (nic.FailoverSettings && nic.FailoverSettings.VCDNetworkSettings && nic.FailoverSettings.VCDNetworkSettings.NicInfo) {
                        nic.FailoverSettings.VCDNetworkSettings.NicInfo.VappNetworkName = networkNone.VappNetworkName;
                        if (nic.FailoverSettings.VCDNetworkSettings.NicInfo.IPMode && nic.FailoverSettings.VCDNetworkSettings.NicInfo.IPMode.IpModeType === enums.VCDNetworkIpMode_VCDNetworkIpModeType.None) {
                            nic.FailoverSettings.VCDNetworkSettings.NicInfo.IPMode = null;
                        }
                    }
                    if (nic.TestSettings && nic.TestSettings.VCDNetworkSettings && nic.TestSettings.VCDNetworkSettings.NicInfo) {
                        nic.TestSettings.VCDNetworkSettings.NicInfo.VappNetworkName = networkNone.VappNetworkName;
                        if (nic.TestSettings.VCDNetworkSettings.NicInfo.IPMode && nic.TestSettings.VCDNetworkSettings.NicInfo.IPMode.IpModeType === enums.VCDNetworkIpMode_VCDNetworkIpModeType.None) {
                            nic.TestSettings.VCDNetworkSettings.NicInfo.IPMode = null;
                        }
                    }
                });
            });
        };

        networksService.initNicsPerVms = function (vms) {
            var nicsList = [];

            _.forEach(vms, function (vm) {
                _.forEach(vm.NetworkInterfaces, function (nicObject) {
                    var nic = nicObject;
                    nic.vmId = vm.InternalVirtualMachineId;
                    nic.id = getNicId(vm, nic);
                    nic.vmName = vm.Name;
                    nic.potentialResrouce = vm.potentialResrouce;
                    nic.nicName = nic.InternalIdentifier.Name;
                    nic.ProtectedNetwork = getNicProtectedNetwork(nic);

                    if (!nic.FailoverSettings) {
                        nic.FailoverSettings = new vos.VPGDetailsNicNetworkSettings();
                        nic.FailoverSettings.VCenterNetworkSettings = new vos.VPGDetailsNicVcenterNetworkSettings();
                        nic.FailoverSettings.VCenterNetworkSettings.ShouldReplaceMacAddress = false;
                    }

                    if (!nic.FailoverSettings.VCenterNetworkSettings) {
                        nic.FailoverSettings.VCenterNetworkSettings = new vos.VPGDetailsNicVcenterNetworkSettings();
                        nic.FailoverSettings.VCenterNetworkSettings.ShouldReplaceMacAddress = false;
                    }

                    if (!nic.FailoverSettings.VCenterNetworkSettings.RecoveryNetwork && networksService.getDefaultFailoverNetwork()) {
                        nic.FailoverSettings.VCenterNetworkSettings.RecoveryNetwork = networksService.getDefaultFailoverNetwork();
                    }

                    if (!nic.TestSettings) {
                        nic.TestSettings = new vos.VPGDetailsNicNetworkSettings();
                        nic.TestSettings.VCenterNetworkSettings = new vos.VPGDetailsNicVcenterNetworkSettings();
                        nic.TestSettings.VCenterNetworkSettings.ShouldReplaceMacAddress = false;
                    }

                    if (!nic.TestSettings.VCenterNetworkSettings) {
                        nic.TestSettings.VCenterNetworkSettings = new vos.VPGDetailsNicVcenterNetworkSettings();
                        nic.TestSettings.VCenterNetworkSettings.ShouldReplaceMacAddress = false;
                    }

                    if (!nic.TestSettings.VCenterNetworkSettings.RecoveryNetwork && createVPGModel.getDefaultTestNetwork()) {
                        nic.TestSettings.VCenterNetworkSettings.RecoveryNetwork = createVPGModel.getDefaultTestNetwork();
                    }

                    nic.FailoverIp = getNicIP(nic.FailoverSettings);
                    nic.FailoverNetwork = getNicFailoverNetwork(nic);
                    nic.TestNetwork = getNicTestNetwork(nic);
                    nic.TestIP = getNicIP(nic.TestSettings);
                    nic.isInMultiNicVM = vm.NetworkInterfaces.length > 1;
                    nicsList.push(nic);
                });
            });
            networksService.setVmsNicsList(nicsList);
        };

        networksService.setVmsNicsList = function (nicsList) {
            createVPGModel.setVmsNicsList(nicsList);
        };

        networksService.getVmsNicsList = function () {
            return createVPGModel.getVmsNicsList();
        };

        networksService.getVmsVcdNicsList = function () {
            return createVPGModel.getVmsVcdNicsList();
        };

        networksService.initVCDNicsList = function (vms) {
            var nicsList = [];

            var index = 1;

            _.forEach(vms, function (vm) {
                _.forEach(vm.NetworkInterfaces, function (nicObject) {
                    var nic = nicObject;
                    nic.vmId = vm.InternalVirtualMachineId;
                    nic.id = getNicId(vm, nic);
                    nic.vmName = vm.Name;
                    nic.index = index;
                    nic.FailoverNetwork = getNicVCDFailoverNetwork(nic);
                    nic.TestNetwork = getNicVCDTestNetwork(nic);
                    nic.FailoverConnected = getNicVCDFailoverConnected(nic);
                    nic.TestConnected = getNicVCDTestConnected(nic);
                    nic.FailoverPrimary = getNicVCDFailoverPrimary(nic);
                    nic.TestPrimary = getNicVCDTestPrimary(nic);
                    nic.FailoverIp = getNicVCDIP(nic.FailoverSettings);
                    nic.TestIP = getNicVCDIP(nic.TestSettings);
                    nic.TestMac = getNicVCDMac(nic.TestSettings);
                    nic.FailoverMac = getNicVCDMac(nic.FailoverSettings);
                    nic.nicName = nic.InternalIdentifier.Name;

                    nicsList.push(nic);
                    ++index;
                });
            });

            networksService.setVmsVcdNicsList(nicsList);
        };

        networksService.setVmsVcdNicsList = function (nicsList) {
            createVPGModel.setVmsVcdNicsList(nicsList);
        };

        networksService.setSelectedDefaultNetworks = function (vms) {
            var targetSiteType = createVPGModel.getTargetSiteType(),
                defaultFailOverNetwork = networksService.getDefaultFailoverNetwork(),
                selectedVms = !_.isEmpty(vms) ? vms : createVPGModel.getInitializedSelectedVms(),
                defaultTestNetwork = networksService.getDefaultTestNetwork();

            if (!_.isNullOrUndefined(targetSiteType)) {
                switch (targetSiteType.value) {
                    case enums.VpgEntityType.VCVpg:
                        setDefaultNetworkFromComputeResource(defaultFailOverNetwork, false);
                        setDefaultNetworkFromComputeResource(defaultTestNetwork, false);
                        networksService.applyDefaultFailoverNetwork(selectedVms, defaultFailOverNetwork);
                        networksService.applyDefaultTestNetwork(selectedVms, defaultTestNetwork);
                        break;
                    case enums.VpgEntityType.VCDvApp:
                        setDefaultNetworkFromComputeResource(defaultFailOverNetwork, true);
                        setDefaultNetworkFromComputeResource(defaultTestNetwork, true);
                        networksService.applyDefaultVCDFailoverNetwork(selectedVms, defaultFailOverNetwork);
                        networksService.applyDefaultVCDTestNetwork(selectedVms, defaultTestNetwork);
                        break;
                }
            }
        };

        networksService.clearVDCNetworks = function () {
            createVPGModel.setConfigDefaultsByKey('FailoverVCDVAppNetwork', null);
            createVPGModel.setConfigDefaultsByKey('TestVCDVAppNetwork', null);
        };

        networksService.isUsingVappNetworkMapping = function () {
            return createVPGModel.isUsingVappNetworkMapping();
        };

        networksService.setIsUsingVappNetworkMapping = function () {
            var isSourceVCD = _.isEqual(createVPGModel.getEntitySource(), enums.VpgEntityType.VCDvApp),
                isTargetVCD = createVPGModel.isVcdVapp(),
                isUsingVAppNetworkMapping = (createVPGModel.checkOrgVirtualDatacenterExists() || createVPGModel.isReverse()) && isSourceVCD && isTargetVCD;

            createVPGModel.setIsUsingVappNetworkMapping(isUsingVAppNetworkMapping);
        };

        networksService.getDefaultFailoverNetwork = function () {
            return createVPGModel.getDefaultFailoverNetwork();
        };
        networksService.getDefaultTestNetwork = function () {
            return createVPGModel.getDefaultTestNetwork();
        };

        networksService.getWanCompression = function () {
            return createVPGModel.getWanCompression();
        };

        networksService.setCopyNatRulesAvailable = function (value) {
            createVPGModel.setCopyNatRulesAvailable(value);
        };

        networksService.setCopyNatRules = function (value) {
            var vpgSettings = createVPGModel.getVpgSettings();
            vpgSettings.Config.Configuration.CopyNatRulesOptions = value;
        };

        networksService.isCopyNatRulesAvailable = function () {
            return createVPGModel.isCopyNatRulesAvailable();
        };

        networksService.isCopyNatServiceAvailable = function () {
            return createVPGModel.isCopyNatServiceAvailable() && createVPGModel.isSourceVcd();
        };

        networksService.getCopyNatRulesOptions = function () {
            return dataCollectionFactory.COPY_NAT_SERVICE_COLLECTION;
        };


        networksService.setPotentialMappingNetworks = function (potentialNetworks) {
            createVPGModel.setPotentialMappingNetworks(potentialNetworks);
        };
        networksService.getPotentialMappingNetworks = function () {
            return createVPGModel.getPotentialMappingNetworks();
        };

        networksService.setPotentialReverseMappingNetworks = function (potentialReverseNetworks) {
            createVPGModel.setPotentialReverseMappingNetworks(potentialReverseNetworks);
        };
        networksService.getPotentialReverseMappingNetworks = function () {
            return createVPGModel.getPotentialReverseMappingNetworks();
        };

        networksService.applyValueFailoverConnected = function (item, state) {
            item.FailoverSettings.VCDNetworkSettings.NicInfo.IsConnected = state;
            item.FailoverConnected = state;
        };

        networksService.applyValueTestConnected = function (item, state) {
            item.TestSettings.VCDNetworkSettings.NicInfo.IsConnected = state;
            item.TestConnected = state;
        };

        networksService._applyPrimary = function (property, display, item) {
            item[property].VCDNetworkSettings.NicInfo.IsPrimary = true;
            item[display] = true;
            _.forEach(createVPGModel.getInitializedSelectedVms(), function (vm) {
                if (vm.InternalVirtualMachineId.InternalVmName === item.vmId.InternalVmName) {
                    _.forEach(vm.NetworkInterfaces, function (nic) {
                        if (nic.nicName !== item.nicName) {
                            nic[display] = false;
                            nic[property].VCDNetworkSettings.NicInfo.IsPrimary = false;
                        }
                    });
                }
            });
        };

        networksService.applyValueFailoverPrimary = function (item) {
            networksService._applyPrimary('FailoverSettings', 'FailoverPrimary', item);
        };

        networksService.applyValueTestPrimary = function (item) {
            networksService._applyPrimary('TestSettings', 'TestPrimary', item);
        };

        networksService.saveNics = function (bulkNic, selectedNics) {
            saveNics(selectedNics, bulkNic, saveNicsService.save);
            networksService.initNicsPerVms(createVPGModel.getInitializedSelectedVms());
        };

        networksService.saveVCDNics = function (bulkNic, selectedNics) {
            saveNics(selectedNics, bulkNic, saveVCDNicsService.save);
            networksService.initVCDNicsList(createVPGModel.getInitializedSelectedVms());
        };

        networksService.getNicNetworkCollection = function (item) {
            var protectionGroupId = createVPGModel.getProtectionGroupId(),
                targetSite = createVPGModel.getTargetSite(),
                targetHostBaseComputeResourceIdentifier = networksService.getTargetHostBaseComputeResourceIdentifier(item.vmId);

            var deferred = $q.defer();

            var resultHandler = function (result) {
                busyOverlayService.removeFromBlacklist('GetRecoveryComputeResourceForReverseConfig');
                busyOverlayService.removeFromBlacklist('GetRecoveryComputeResource');

                deferred.resolve(result.Networks);
            };

            busyOverlayService.addToBlacklist('GetRecoveryComputeResourceForReverseConfig');
            busyOverlayService.addToBlacklist('GetRecoveryComputeResource');

            if (createVPGModel.isReverse()) {
                zertoServiceFactory.GetRecoveryComputeResourceForReverseConfig(protectionGroupId, targetHostBaseComputeResourceIdentifier)
                    .then(resultHandler);
            } else {
                zertoServiceFactory.GetRecoveryComputeResource(protectionGroupId, targetSite.OwnersId.Id, targetHostBaseComputeResourceIdentifier)
                    .then(resultHandler);
            }

            return deferred.promise;
        };

        networksService.validateVCNics = function () {
            var initializedSelectedVms = createVPGModel.getInitializedSelectedVms();

            if (_.isEmpty(initializedSelectedVms)) {
                return false;
            }

            var result = true;

            _.forEach(initializedSelectedVms, function (vm) {
                _.forEach(vm.NetworkInterfaces, function (nic) {
                    if (!nic.FailoverSettings.VCenterNetworkSettings.RecoveryNetwork || !nic.TestSettings.VCenterNetworkSettings.RecoveryNetwork) {
                        result = false;
                    }
                });
            });
            return result;
        };

        networksService.validateVCDNics = function () {
            var initializedSelectedVms = createVPGModel.getInitializedSelectedVms();

            if (_.isEmpty(initializedSelectedVms)) {
                return false;
            }
            var result = true;
            _.forEach(initializedSelectedVms, function (vm) {
                _.forEach(vm.NetworkInterfaces, function (nic) {
                    if (!nic.FailoverSettings.VCDNetworkSettings.NicInfo.VappNetworkName || !nic.TestSettings.VCDNetworkSettings.NicInfo.VappNetworkName) {
                        result = false;
                    }
                });
            });
            return result;
        };

        networksService.getTargetHostBaseComputeResourceIdentifier = function (vmId) {
            var identifier = helperService.getTargetHostBaseComputeResourceIdentifierByVmId(createVPGModel.getInitializedSelectedVms(), vmId);
            if (_.isNullOrUndefined(identifier)) {
                identifier = createVPGModel.getTargetHost().BaseComputeResourceIdentifier;
            }

            return identifier;
        };

        function applyDefaultVCDNicSettings(settings, value) {
            if (!settings.VCDNetworkSettings) {
                settings.VCDNetworkSettings = new vos.VCDNetworkManagementSettings();
                settings.VCDNetworkSettings.NicInfo = new vos.VCDNicInfo();
            }
            if (settings.RecoveryOrganizationVCDOrgNetwork === null) {
                settings.VCDNetworkSettings.NicInfo.IPMode = new vos.VCDNetworkIpMode();
                settings.VCDNetworkSettings.NicInfo.IPMode.IpModeType = enums.VCDNetworkIpMode_VCDNetworkIpModeType.None;
                settings.VCDNetworkSettings.NicInfo.VappNetworkName = 'none';
                settings.VCDNetworkSettings.NicInfo.IpAddress = null;
            } else {
                if (value && value.NetworkName === 'none') {
                    settings.VCDNetworkSettings.NicInfo.IPMode = new vos.VCDNetworkIpMode();
                    settings.VCDNetworkSettings.NicInfo.IPMode.IpModeType = enums.VCDNetworkIpMode_VCDNetworkIpModeType.None;
                    settings.VCDNetworkSettings.NicInfo.VappNetworkName = 'none';
                    settings.VCDNetworkSettings.NicInfo.IpAddress = null;
                } else {
                    settings.VCDNetworkSettings.NicInfo.VappNetworkName =
                        value ? value.NetworkName : settings.VCDNetworkSettings.NicInfo.VappNetworkName ? settings.VCDNetworkSettings.NicInfo.VappNetworkName : 'none';

                    if (settings.VCDNetworkSettings.NicInfo.IPMode && settings.VCDNetworkSettings.NicInfo.VappNetworkName !== 'none') {
                        settings.VCDNetworkSettings.NicInfo.IPMode.IpModeType = enums.VCDNetworkIpMode_VCDNetworkIpModeType.IPPool;
                        settings.VCDNetworkSettings.NicInfo.IpAddress = null;
                    }
                }
            }
        }

        function setDefaultNetworkFromComputeResource(defaultNetwork, isVcd) {
            var computeResources = createVPGModel.getComputeResources();

            if (defaultNetwork) {
                var findNetwork = _.find(computeResources.Networks, function (network) {
                    if (isVcd) {
                        if (network.NetworkName === defaultNetwork.NetworkName) {
                            return true;
                        }
                    } else if (_.isEqual(network.Id, defaultNetwork.Id)) {
                        return true;
                    }
                });
                if (!findNetwork) {
                    defaultNetwork = undefined;
                }
            }
            return defaultNetwork;
        }

        function getNicId(vm, nic) {
            return vm.InternalVirtualMachineId.InternalVmName + nic.MacAddress;
        }

        function getNicProtectedNetwork(nic) {
            if (nic.SourceNetwork && nic.SourceNetwork.VcenterNetwork && nic.SourceNetwork.VcenterNetwork.DisplayName) {
                return nic.SourceNetwork.VcenterNetwork.DisplayName;
            } else if (nic.SourceNetwork && nic.SourceNetwork.VCDNetwork && nic.SourceNetwork.VCDNetwork.VappNetworkName) {
                return nic.SourceNetwork.VCDNetwork.VappNetworkName;
            }
        }

        function getNicIP(nic) {
            if (nic && nic.VCenterNetworkSettings && nic.VCenterNetworkSettings.IP) {
                if (nic.VCenterNetworkSettings.IP.IsDhcp) {
                    return 'DHCP';
                } else {
                    return nic.VCenterNetworkSettings.IP.StaticIP;
                }
            }
            return '';
        }

        function getNicVCDIP(nic) {
            if (nic.VCDNetworkSettings && nic.VCDNetworkSettings.NicInfo) {
                if (_.isNullOrUndefined(nic.VCDNetworkSettings.NicInfo.IPMode)) {
                    nic.VCDNetworkSettings.NicInfo.IPMode = {IpModeType: enums.VCDNetworkIpMode_VCDNetworkIpModeType.IPPool};
                }
                switch (nic.VCDNetworkSettings.NicInfo.IPMode.IpModeType) {
                    case enums.VCDNetworkIpMode_VCDNetworkIpModeType.IPPool:
                        return 'IP Pool';
                    case enums.VCDNetworkIpMode_VCDNetworkIpModeType.Dhcp:
                        return 'DHCP';
                    case enums.VCDNetworkIpMode_VCDNetworkIpModeType.None:
                        return $translate.instant('EDIT_NIC.NONE');
                    case enums.VCDNetworkIpMode_VCDNetworkIpModeType.Manual:
                        return nic.VCDNetworkSettings.NicInfo.IpAddress;
                }
            }
            return '';
        }

        function getNicFailoverNetwork(nic) {
            if (nic.FailoverSettings &&
                nic.FailoverSettings.VCenterNetworkSettings &&
                nic.FailoverSettings.VCenterNetworkSettings.RecoveryNetwork &&
                nic.FailoverSettings.VCenterNetworkSettings.RecoveryNetwork.DisplayName) {

                return nic.FailoverSettings.VCenterNetworkSettings.RecoveryNetwork.DisplayName;
            } else {
                return $translate.instant('CREATE_VPG.NO_SETTINGS');
            }
        }

        function getNicVCDFailoverNetwork(nic) {
            if (nic.FailoverSettings.VCDNetworkSettings &&
                nic.FailoverSettings.VCDNetworkSettings.NicInfo &&
                nic.FailoverSettings.VCDNetworkSettings.NicInfo.VappNetworkName) {
                return nic.FailoverSettings.VCDNetworkSettings.NicInfo.VappNetworkName;
            }
        }

        function getNicVCDTestNetwork(nic) {
            if (nic.TestSettings.VCDNetworkSettings &&
                nic.TestSettings.VCDNetworkSettings.NicInfo &&
                nic.TestSettings.VCDNetworkSettings.NicInfo.VappNetworkName) {
                return nic.TestSettings.VCDNetworkSettings.NicInfo.VappNetworkName;
            }
        }

        function getNicVCDFailoverConnected(nic) {
            return nic.FailoverSettings.VCDNetworkSettings &&
                nic.FailoverSettings.VCDNetworkSettings.NicInfo &&
                nic.FailoverSettings.VCDNetworkSettings.NicInfo.IsConnected;
        }

        function getNicVCDTestConnected(nic) {
            return nic.TestSettings.VCDNetworkSettings &&
                nic.TestSettings.VCDNetworkSettings.NicInfo &&
                nic.TestSettings.VCDNetworkSettings.NicInfo.IsConnected;
        }

        function getNicVCDFailoverPrimary(nic) {
            return nic.FailoverSettings.VCDNetworkSettings &&
                nic.FailoverSettings.VCDNetworkSettings.NicInfo &&
                nic.FailoverSettings.VCDNetworkSettings.NicInfo.IsPrimary;
        }

        function getNicVCDTestPrimary(nic) {
            return nic.TestSettings.VCDNetworkSettings &&
                nic.TestSettings.VCDNetworkSettings.NicInfo &&
                nic.TestSettings.VCDNetworkSettings.NicInfo.IsPrimary;
        }

        function getNicVCDMac(nic) {
            if (_.isNullOrUndefined(nic.VCDNetworkSettings)) {
                return null;
            }

            if (nic.VCDNetworkSettings &&
                nic.VCDNetworkSettings.NewMacAddress &&
                nic.VCDNetworkSettings.NewMacAddress.MacAddress) {

                return nic.VCDNetworkSettings.NewMacAddress.MacAddress;
            }

            if (nic.VCDNetworkSettings && _.isNullOrUndefined(nic.VCDNetworkSettings.NewMacAddress)) {
                nic.VCDNetworkSettings.NewMacAddress = {MacAddress: nic.VCDNetworkSettings.NicInfo.MacAddress};
            }

            return nic.VCDNetworkSettings.NewMacAddress.MacAddress;
        }

        function getNicTestNetwork(nic) {
            if (nic.TestSettings &&
                nic.TestSettings.VCenterNetworkSettings &&
                nic.TestSettings.VCenterNetworkSettings.RecoveryNetwork) {
                return nic.TestSettings.VCenterNetworkSettings.RecoveryNetwork.DisplayName;
            } else {
                return $translate.instant('CREATE_VPG.NO_SETTINGS');
            }
        }

        function applyDefaultNetworks(vms, value) {
            _.forEach(vms, function (vm) {
                if (vm._isNewVm) {
                    _.forEach(vm.NetworkInterfaces, function (nic) {
                        nic.FailoverSettings = nic.FailoverSettings || new vos.VPGDetailsNicNetworkSettings();
                        if (_.isNullOrUndefined(nic.FailoverSettings.VCenterNetworkSettings)) {
                            nic.FailoverSettings.VCenterNetworkSettings = new vos.VPGDetailsNicVcenterNetworkSettings(null, null, value, false);
                        } else {
                            nic.FailoverSettings.VCenterNetworkSettings.RecoveryNetwork = value;
                        }
                    });
                }
            });
        }

        function applyDefaultTestNetworks(vms, value) {
            _.forEach(vms, function (vm) {
                if (vm._isNewVm) {
                    _.forEach(vm.NetworkInterfaces, function (nic) {
                        nic.TestSettings = nic.TestSettings || new vos.VPGDetailsNicNetworkSettings();

                        if (_.isNullOrUndefined(nic.TestSettings.VCenterNetworkSettings)) {
                            nic.TestSettings.VCenterNetworkSettings = new vos.VPGDetailsNicVcenterNetworkSettings(null, null, value, false);
                        } else {
                            nic.TestSettings.VCenterNetworkSettings.RecoveryNetwork = value;
                        }
                    });
                }
            });
        }

        function saveNics(selectedNics, bulkNic, saveFunction) {
            var disabledIpNic = _.find(selectedNics, {IsIPConfigurationEnabled: false}),
                initializedSelectedVms = createVPGModel.getInitializedSelectedVms();
            _.forEach(initializedSelectedVms, function (vm) {
                _.forEach(vm.NetworkInterfaces, function (originalNic) {
                    var checkId = getNicId(vm, originalNic);
                    if (_.find(selectedNics, {'id': checkId})) {
                        saveFunction(originalNic, bulkNic, _.isNullOrUndefined(disabledIpNic));
                    }
                });
            });
        }
    });
