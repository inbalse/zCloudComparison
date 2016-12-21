'use strict';

describe('Edit nics dialog controller', function () {
    var scope, nicEditController, createVpgNicConstants, editNicService,
        potentials = {
            "Networks": [
                {
                    "Id": {
                        "ServerIdentifier": {
                            "ServerGuid": "3072da3a-bf7a-48cf-b13a-c857b47a2293"
                        },
                        "InternalType": "Network",
                        "InternalName": "network-16"
                    },
                    "DisplayName": "Net124"
                },
                {
                    "Id": {
                        "ServerIdentifier": {
                            "ServerGuid": "3072da3a-bf7a-48cf-b13a-c857b47a2293"
                        },
                        "InternalType": "Network",
                        "InternalName": "network-2155"
                    },
                    "DisplayName": "Net124_2"
                },
                {
                    "Id": {
                        "ServerIdentifier": {
                            "ServerGuid": "3072da3a-bf7a-48cf-b13a-c857b47a2293"
                        },
                        "InternalType": "Network",
                        "InternalName": "network-496"
                    },
                    "DisplayName": "Net146"
                },
                {
                    "Id": {
                        "ServerIdentifier": {
                            "ServerGuid": "3072da3a-bf7a-48cf-b13a-c857b47a2293"
                        },
                        "InternalType": "Network",
                        "InternalName": "network-2888"
                    },
                    "DisplayName": "Net149"
                },
                {
                    "Id": {
                        "ServerIdentifier": {
                            "ServerGuid": "3072da3a-bf7a-48cf-b13a-c857b47a2293"
                        },
                        "InternalType": "Network",
                        "InternalName": "network-17"
                    },
                    "DisplayName": "VM Network"
                },
                {
                    "Id": {
                        "ServerIdentifier": {
                            "ServerGuid": "3072da3a-bf7a-48cf-b13a-c857b47a2293"
                        },
                        "InternalType": "DistributedVirtualPortgroup",
                        "InternalName": "dvportgroup-2361"
                    },
                    "DisplayName": "dvs.VCDVSRoutedToExtNet-f0e03c69-2ed1-41ed-9a9f-0b0b6a137c25"
                },
                {
                    "Id": {
                        "ServerIdentifier": {
                            "ServerGuid": "3072da3a-bf7a-48cf-b13a-c857b47a2293"
                        },
                        "InternalType": "DistributedVirtualPortgroup",
                        "InternalName": "dvportgroup-2367"
                    },
                    "DisplayName": "dvs.VCDVSRoutedToExtNet3-2425af81-3e7f-4252-9043-fa4887e28186"
                },
                {
                    "Id": {
                        "ServerIdentifier": {
                            "ServerGuid": "3072da3a-bf7a-48cf-b13a-c857b47a2293"
                        },
                        "InternalType": "DistributedVirtualPortgroup",
                        "InternalName": "dvportgroup-2364"
                    },
                    "DisplayName": "dvs.VCDVSRoutedToExtNet2-e89f0577-2f70-4540-aab2-216adeff20ef"
                },
                {
                    "Id": {
                        "ServerIdentifier": {
                            "ServerGuid": "3072da3a-bf7a-48cf-b13a-c857b47a2293"
                        },
                        "InternalType": "DistributedVirtualPortgroup",
                        "InternalName": "dvportgroup-33"
                    },
                    "DisplayName": "VCD-External"
                },
                {
                    "Id": {
                        "ServerIdentifier": {
                            "ServerGuid": "3072da3a-bf7a-48cf-b13a-c857b47a2293"
                        },
                        "InternalType": "DistributedVirtualPortgroup",
                        "InternalName": "dvportgroup-3490"
                    },
                    "DisplayName": "dvPortGroup"
                },
                {
                    "Id": {
                        "ServerIdentifier": {
                            "ServerGuid": "3072da3a-bf7a-48cf-b13a-c857b47a2293"
                        },
                        "InternalType": "DistributedVirtualPortgroup",
                        "InternalName": "dvportgroup-2430"
                    },
                    "DisplayName": "dvs.VCDVSRoutedToExtNet4-fc71cde5-28a4-4e3e-b6f5-9c1353c866d8"
                }
            ]
        },
        selectedNics = [
            {
                "InternalIdentifier": {
                    "Name": "Network adapter 1"
                },
                "SourceNetwork": {
                    "VcenterNetwork": {
                        "Id": {
                            "ServerIdentifier": {
                                "ServerGuid": "3072da3a-bf7a-48cf-b13a-c857b47a2293"
                            },
                            "InternalType": "Network",
                            "InternalName": "network-17"
                        },
                        "DisplayName": "VM Network"
                    },
                    "VCDNetwork": null
                },
                "FailoverSettings": {
                    "VCenterNetworkSettings": {
                        "RecoveryNetwork": {
                            "Id": {
                                "ServerIdentifier": {
                                    "ServerGuid": "3072da3a-bf7a-48cf-b13a-c857b47a2293"
                                },
                                "InternalType": "Network",
                                "InternalName": "network-16"
                            },
                            "DisplayName": "Net124"
                        },
                        "IP": null,
                        "DnsSuffix": null,
                        "ShouldReplaceMacAddress": false
                    },
                    "VCDNetworkSettings": null
                },
                "TestSettings": {
                    "VCenterNetworkSettings": {
                        "RecoveryNetwork": {
                            "Id": {
                                "ServerIdentifier": {
                                    "ServerGuid": "3072da3a-bf7a-48cf-b13a-c857b47a2293"
                                },
                                "InternalType": "Network",
                                "InternalName": "network-16"
                            },
                            "DisplayName": "Net124"
                        },
                        "IP": null,
                        "DnsSuffix": null,
                        "ShouldReplaceMacAddress": false
                    },
                    "VCDNetworkSettings": null
                },
                "IsIPConfigurationEnabled": false,
                "MacAddress": "00:50:56:a5:7f:65",
                "vmId": {
                    "InternalVmName": "vm-3760",
                    "ServerIdentifier": {
                        "ServerGuid": "3072da3a-bf7a-48cf-b13a-c857b47a2293"
                    }
                },
                "id": "vm-376000:50:56:a5:7f:65",
                "vmName": "SdVapp1Org1Vm1 (f2e07bb2-47a4-4583-b404-d5ef8fc02fe0)",
                "nicName": "Network adapter 1",
                "ProtectedNetwork": "VM Network",
                "FailoverIp": "",
                "FailoverNetwork": "Net124",
                "TestNetwork": "Net124",
                "TestIP": "",
                "isInMultiNicVM": false
            },
            {
                "InternalIdentifier": {
                    "Name": "Network adapter 1"
                },
                "SourceNetwork": {
                    "VcenterNetwork": {
                        "Id": {
                            "ServerIdentifier": {
                                "ServerGuid": "3072da3a-bf7a-48cf-b13a-c857b47a2293"
                            },
                            "InternalType": "Network",
                            "InternalName": "network-17"
                        },
                        "DisplayName": "VM Network"
                    },
                    "VCDNetwork": null
                },
                "FailoverSettings": {
                    "VCenterNetworkSettings": {
                        "RecoveryNetwork": {
                            "Id": {
                                "ServerIdentifier": {
                                    "ServerGuid": "3072da3a-bf7a-48cf-b13a-c857b47a2293"
                                },
                                "InternalType": "Network",
                                "InternalName": "network-16"
                            },
                            "DisplayName": "Net124"
                        },
                        "IP": null,
                        "DnsSuffix": null,
                        "ShouldReplaceMacAddress": false
                    },
                    "VCDNetworkSettings": null
                },
                "TestSettings": {
                    "VCenterNetworkSettings": {
                        "RecoveryNetwork": {
                            "Id": {
                                "ServerIdentifier": {
                                    "ServerGuid": "3072da3a-bf7a-48cf-b13a-c857b47a2293"
                                },
                                "InternalType": "Network",
                                "InternalName": "network-16"
                            },
                            "DisplayName": "Net124"
                        },
                        "IP": null,
                        "DnsSuffix": null,
                        "ShouldReplaceMacAddress": false
                    },
                    "VCDNetworkSettings": null
                },
                "IsIPConfigurationEnabled": false,
                "MacAddress": "00:50:56:a5:57:47",
                "vmId": {
                    "InternalVmName": "vm-492",
                    "ServerIdentifier": {
                        "ServerGuid": "3072da3a-bf7a-48cf-b13a-c857b47a2293"
                    }
                },
                "id": "vm-49200:50:56:a5:57:47",
                "vmName": "SD1",
                "nicName": "Network adapter 1",
                "ProtectedNetwork": "VM Network",
                "FailoverIp": "",
                "FailoverNetwork": "Net124",
                "TestNetwork": "Net124",
                "TestIP": "",
                "isInMultiNicVM": false
            }
        ];

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($controller, $rootScope, $translate, _editNicService_, _createVpgNicConstants_) {
        editNicService = _editNicService_;
        createVpgNicConstants = _createVpgNicConstants_;
        scope = $rootScope.$new(true);
        nicEditController = $controller('nicEditController', {
            $scope: scope,
            $translate: $translate,
            editNicService: editNicService,
            potentials: potentials,
            selectedNics: selectedNics,
            createVpgNicConstants: createVpgNicConstants
        });

        editNicService.init(selectedNics);
    }));

    it("should copy to failover test", function () {
        spyOn(editNicService, 'copyToFOT');
        scope.data.testSettings = {
            "changeIpConfig": "2",
            "recoveryNetwork": null,
            "shouldReplaceMacAddress": false,
            "dnsSuffix": null,
            "isIpConfigEnabled": false,
            "isDNSEnabled": false
        };
        scope.data.failoverSettings.changeIpConfig = createVpgNicConstants.IP_CFG_VALUES.NO;
        scope.copyToFot();

        expect(editNicService.copyToFOT).toHaveBeenCalled();
        expect(scope.data.failoverSettings.recoveryNetwork).toEqual(scope.data.testSettings.recoveryNetwork);
        expect(scope.data.failoverSettings.shouldReplaceMacAddress).toEqual(scope.data.testSettings.shouldReplaceMacAddress);
        expect(scope.data.failoverSettings.staticIP).toEqual(scope.data.testSettings.staticIP);
        expect(scope.data.failoverSettings.subnetMask).toEqual(scope.data.testSettings.subnetMask);
        expect(scope.data.failoverSettings.gateway).toEqual(scope.data.testSettings.gateway);
        expect(scope.data.failoverSettings.primaryDNS).toEqual(scope.data.testSettings.primaryDNS);
        expect(scope.data.failoverSettings.secondaryDNS).toEqual(scope.data.testSettings.secondaryDNS);
        expect(scope.data.failoverSettings.dnsSuffix).toEqual(scope.data.testSettings.dnsSuffix);
        expect(scope.data.failoverSettings.isIpConfigEnabled).toEqual(scope.data.testSettings.isIpConfigEnabled);
        expect(scope.data.failoverSettings.isDNSEnabled).toEqual(scope.data.testSettings.isDNSEnabled);
        expect(scope.data.failoverSettings.changeIpConfig).toEqual(scope.data.testSettings.changeIpConfig);
    });

    it("should copy to failover live", function () {
        spyOn(editNicService, 'copyToFO');
        scope.data.failoverSettings = {
            "changeIpConfig": "2",
            "recoveryNetwork": null,
            "shouldReplaceMacAddress": false,
            "dnsSuffix": null,
            "isIpConfigEnabled": false,
            "isDNSEnabled": false
        };
        scope.data.testSettings.changeIpConfig = createVpgNicConstants.IP_CFG_VALUES.NO;
        scope.copyToFo();

        expect(editNicService.copyToFO).toHaveBeenCalled();
        expect(scope.data.failoverSettings.recoveryNetwork).toEqual(scope.data.testSettings.recoveryNetwork);
        expect(scope.data.failoverSettings.shouldReplaceMacAddress).toEqual(scope.data.testSettings.shouldReplaceMacAddress);
        expect(scope.data.failoverSettings.staticIP).toEqual(scope.data.testSettings.staticIP);
        expect(scope.data.failoverSettings.subnetMask).toEqual(scope.data.testSettings.subnetMask);
        expect(scope.data.failoverSettings.gateway).toEqual(scope.data.testSettings.gateway);
        expect(scope.data.failoverSettings.primaryDNS).toEqual(scope.data.testSettings.primaryDNS);
        expect(scope.data.failoverSettings.secondaryDNS).toEqual(scope.data.testSettings.secondaryDNS);
        expect(scope.data.failoverSettings.dnsSuffix).toEqual(scope.data.testSettings.dnsSuffix);
        expect(scope.data.failoverSettings.isIpConfigEnabled).toEqual(scope.data.testSettings.isIpConfigEnabled);
        expect(scope.data.failoverSettings.isDNSEnabled).toEqual(scope.data.testSettings.isDNSEnabled);
        expect(scope.data.failoverSettings.changeIpConfig).toEqual(scope.data.testSettings.changeIpConfig);
    });

    it('should handle failover network change', function () {
        var settings = editNicService.getFailoverSettingsVCenterNetworkSettings();
        spyOn(editNicService, 'setSettingsRecoveryNetwork');
        scope.data.failoverSettings.recoveryNetwork = {dummy: true};
        scope.onFailoverSettingsRecoveryNetworkChange();
        expect(editNicService.setSettingsRecoveryNetwork).toHaveBeenCalledWith(settings, {dummy: true});
    });

    it('should handle failover test network change', function () {
        var settings = editNicService.getTestSettingsVCenterNetworkSettings();
        spyOn(editNicService, 'setSettingsRecoveryNetwork');
        scope.data.testSettings.recoveryNetwork = {dummy: true};
        scope.onTestSettingsRecoveryNetworkChange();
        expect(editNicService.setSettingsRecoveryNetwork).toHaveBeenCalledWith(settings, {dummy: true});
    });

    it('should handle failover mac change', function () {
        var settings = editNicService.getFailoverSettingsVCenterNetworkSettings();
        spyOn(editNicService, 'setSettingsShouldReplaceMacAddress');
        scope.data.failoverSettings.shouldReplaceMacAddress = {dummy: true};
        scope.onFailoverSettingsShouldReplaceMacAddress();
        expect(editNicService.setSettingsShouldReplaceMacAddress).toHaveBeenCalledWith(settings, {dummy: true});
    });

    it('should handle failover mac change', function () {
        var settings = editNicService.getTestSettingsVCenterNetworkSettings();
        spyOn(editNicService, 'setSettingsShouldReplaceMacAddress');
        scope.data.testSettings.shouldReplaceMacAddress = {dummy: true};
        scope.onTestSettingsShouldReplaceMacAddress();
        expect(editNicService.setSettingsShouldReplaceMacAddress).toHaveBeenCalledWith(settings, {dummy: true});
    });

    it('should handle failover ip config change', function () {
        spyOn(editNicService, 'setChangeIpConf');
        scope.data.failoverSettings.changeIpConfig = createVpgNicConstants.IP_CFG_VALUES.NO;
        var settings = editNicService.getFailoverSettingsVCenterNetworkSettings(),
            config = editNicService.getChangeIpConfFailover();

        scope.onChangeIpConfFailoverChange();
        expect(editNicService.setChangeIpConf).toHaveBeenCalledWith(settings, createVpgNicConstants.IP_CFG_VALUES.NO, config, true);
    });

    it('should handle failover test ip config change', function () {
        spyOn(editNicService, 'setChangeIpConf');
        scope.data.testSettings.changeIpConfig = createVpgNicConstants.IP_CFG_VALUES.DHCP;
        var settings = editNicService.getTestSettingsVCenterNetworkSettings(),
            config = editNicService.getChangeIpConfTest();

        scope.onChangeIpConfTestChange();
        expect(editNicService.setChangeIpConf).toHaveBeenCalledWith(settings, createVpgNicConstants.IP_CFG_VALUES.DHCP, config, false);
    });

    it('should handle failover static ip change', function () {
        var settings = editNicService.getFailoverSettingsVCenterNetworkSettings();
        spyOn(editNicService, 'setStaticIP');
        scope.data.failoverSettings.staticIP = {dummy: true};
        scope.onFailoverStaticIPChange();
        expect(editNicService.setStaticIP).toHaveBeenCalledWith(settings, {dummy: true});
    });

    it('should handle test static ip change', function () {
        var settings = editNicService.getTestSettingsVCenterNetworkSettings();
        spyOn(editNicService, 'setStaticIP');
        scope.data.testSettings.staticIP = {dummy: true};
        scope.onTestStaticIPChange();
        expect(editNicService.setStaticIP).toHaveBeenCalledWith(settings, {dummy: true});
    });

    it('should handle failover subnet mask change', function () {
        var settings = editNicService.getFailoverSettingsVCenterNetworkSettings();
        spyOn(editNicService, 'setSubnetMask');
        scope.data.failoverSettings.subnetMask = {dummy: true};
        scope.onFailoverSubnetMaskChange();
        expect(editNicService.setSubnetMask).toHaveBeenCalledWith(settings, {dummy: true});
    });

    it('should handle test subnet mask change', function () {
        var settings = editNicService.getTestSettingsVCenterNetworkSettings();
        spyOn(editNicService, 'setSubnetMask');
        scope.data.testSettings.subnetMask = {dummy: true};
        scope.onTestSubnetMaskChange();
        expect(editNicService.setSubnetMask).toHaveBeenCalledWith(settings, {dummy: true});
    });

    it('should handle failover gateway change', function () {
        var settings = editNicService.getFailoverSettingsVCenterNetworkSettings();
        spyOn(editNicService, 'setGateway');
        scope.data.failoverSettings.gateway = {dummy: true};
        scope.onFailoverGatewayChange();
        expect(editNicService.setGateway).toHaveBeenCalledWith(settings, {dummy: true});
    });

    it('should handle test gateway change', function () {
        var settings = editNicService.getTestSettingsVCenterNetworkSettings();
        spyOn(editNicService, 'setGateway');
        scope.data.testSettings.gateway = {dummy: true};
        scope.onTestGatewayChange();
        expect(editNicService.setGateway).toHaveBeenCalledWith(settings, {dummy: true});
    });

    it('should handle failover primary dns change', function () {
        var settings = editNicService.getFailoverSettingsVCenterNetworkSettings();
        spyOn(editNicService, 'setPrimaryDNS');
        scope.data.failoverSettings.primaryDNS = {dummy: true};
        scope.onFailoverPrimaryDNSChange();
        expect(editNicService.setPrimaryDNS).toHaveBeenCalledWith(settings, {dummy: true});
    });

    it('should handle test primary dns change', function () {
        var settings = editNicService.getTestSettingsVCenterNetworkSettings();
        spyOn(editNicService, 'setPrimaryDNS');
        scope.data.testSettings.primaryDNS = {dummy: true};
        scope.onTestPrimaryDNSChange();
        expect(editNicService.setPrimaryDNS).toHaveBeenCalledWith(settings, {dummy: true});
    });

    it('should handle failover secondary dns change', function () {
        var settings = editNicService.getFailoverSettingsVCenterNetworkSettings();
        spyOn(editNicService, 'setSecondaryDNS');
        scope.data.failoverSettings.secondaryDNS = {dummy: true};
        scope.onFailoverSecondaryDNSChange();
        expect(editNicService.setSecondaryDNS).toHaveBeenCalledWith(settings, {dummy: true});
    });

    it('should handle test secondary dns change', function () {
        var settings = editNicService.getTestSettingsVCenterNetworkSettings();
        spyOn(editNicService, 'setSecondaryDNS');
        scope.data.testSettings.secondaryDNS = {dummy: true};
        scope.onTestSecondaryDNSChange();
        expect(editNicService.setSecondaryDNS).toHaveBeenCalledWith(settings, {dummy: true});
    });

    it('should handle failover dns suffix change', function () {
        var settings = editNicService.getFailoverSettingsVCenterNetworkSettings();
        spyOn(editNicService, 'setDNSSuffix');
        scope.data.failoverSettings.dnsSuffix = {dummy: true};
        scope.onFailoverDNSSuffixChange();
        expect(editNicService.setDNSSuffix).toHaveBeenCalledWith(settings, {dummy: true});
    });

    it('should handle test dns suffix change', function () {
        var settings = editNicService.getTestSettingsVCenterNetworkSettings();
        spyOn(editNicService, 'setDNSSuffix');
        scope.data.testSettings.dnsSuffix = {dummy: true};
        scope.onTestDNSSuffixChange();
        expect(editNicService.setDNSSuffix).toHaveBeenCalledWith(settings, {dummy: true});
    });

    it('should close the modal', function () {
        spyOn(editNicService, 'close');
        scope.close();
        expect(editNicService.close).toHaveBeenCalled();
    });

    it('should check if failover ip config disabled or bulk', function () {
        scope.data.failoverSettings.isIpConfigEnabled = false;
        scope.data.isBulk = false;

        var result = scope.isFailoverIPConfigDisabledOrBulk();
        expect(result).toBe(true);

        scope.data.failoverSettings.isIpConfigEnabled = true;
        result = scope.isFailoverIPConfigDisabledOrBulk();
        expect(result).toBe(false);

        scope.data.failoverSettings.isIpConfigEnabled = false;
        scope.data.isBulk = true;
        result = scope.isFailoverIPConfigDisabledOrBulk();
        expect(result).toBe(true);

        scope.data.failoverSettings.isIpConfigEnabled = true;
        scope.data.isBulk = true;
        result = scope.isFailoverIPConfigDisabledOrBulk();
        expect(result).toBe(true);
    });

    it('should check if test ip config disabled or bulk', function () {
        scope.data.testSettings.isIpConfigEnabled = false;
        scope.data.isBulk = false;

        var result = scope.isTestIPConfigDisabledOrBulk();
        expect(result).toBe(true);

        scope.data.testSettings.isIpConfigEnabled = true;
        result = scope.isTestIPConfigDisabledOrBulk();
        expect(result).toBe(false);

        scope.data.testSettings.isIpConfigEnabled = false;
        scope.data.isBulk = true;
        result = scope.isTestIPConfigDisabledOrBulk();
        expect(result).toBe(true);

        scope.data.testSettings.isIpConfigEnabled = true;
        scope.data.isBulk = true;
        result = scope.isTestIPConfigDisabledOrBulk();
        expect(result).toBe(true);
    });

    it('should check if failover static ip is required', function () {
        checkStaticIPRequired(scope.data.failoverSettings, scope.isFailoverStaticIPRequired);
    });

    it('should check if failover test static ip is required', function () {
        checkStaticIPRequired(scope.data.testSettings, scope.isTestStaticIPRequired);
    });

    function checkStaticIPRequired(settings, handler) {
        settings.isIpConfigEnabled = false;
        scope.data.isIPConfigurationEnabled = false;
        scope.data.isBulk = false;
        var result = handler();
        expect(result).toBe(false);
        settings.isIpConfigEnabled = true;
        result = handler();
        expect(result).toBe(false);
        scope.data.isIPConfigurationEnabled = true;
        result = handler();
        expect(result).toBe(true);
        scope.data.isBulk = true;
        result = handler();
        expect(result).toBe(false);
        settings.isIpConfigEnabled = false;
        result = handler();
        expect(result).toBe(false);
        scope.data.isIPConfigurationEnabled = false;
        result = handler();
        expect(result).toBe(false);
        settings.isIpConfigEnabled = true;
        result = handler();
        expect(result).toBe(false);
        settings.isIpConfigEnabled = false;
        scope.data.isIPConfigurationEnabled = true;
        scope.data.isBulk = false;
        result = handler();
        expect(result).toBe(false);
    }

    it('should check if network list is not empty', function () {
        scope.data.networksList = ['a'];
        var result = scope.isNetworkListNotEmpty();
        expect(result).toBe(true);

        scope.data.networksList = [];
        result = scope.isNetworkListNotEmpty();
        expect(result).toBe(false);
    });

    it('should init the modal', function () {
        expect(scope.data.networksList).toBeArray();
        expect(scope.data.isBulk).toBe(editNicService.isBulk());
        expect(scope.data.isIPConfigurationEnabled).toBe(editNicService.isIPConfigurationEnabled());
        expect(scope.data.createMacList).toBeArray();
        expect(scope.data.changeVnicIPConfList).toBeArray();
        expect(scope.data.buttons).toBeArray();
        expect(scope.data.failoverSettings.changeIpConfig).toBe(editNicService.getChangeIpConfFailover());
        expect(scope.data.testSettings.changeIpConfig).toBe(editNicService.getChangeIpConfTest());
    });

    it('should fill the potentials networks', function(){
        expect(scope.data.failoverSettings.recoveryNetwork).not.toBeNull();
        expect(scope.data.testSettings.recoveryNetwork).not.toBeNull();
    });

    it('should set networks to null if there are no networks', function () {
        potentials.Networks = [];
        scope.initNicsStep();
        expect(scope.data.failoverSettings.recoveryNetwork).toBeNull();
        expect(scope.data.testSettings.recoveryNetwork).toBeNull();
    });
});
