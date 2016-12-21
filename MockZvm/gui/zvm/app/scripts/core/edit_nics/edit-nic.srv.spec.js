'use strict';

describe('edit nic service', function () {
    var editNicService, createVpgNicConstants, nicEditFactory, zAlertFactory, selectedNics;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_editNicService_, _nicEditFactory_, _createVpgNicConstants_, _zAlertFactory_) {
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
        nicEditFactory = _nicEditFactory_;
        zAlertFactory = _zAlertFactory_;
        createVpgNicConstants = _createVpgNicConstants_;
        editNicService = _editNicService_;
    }));

    it('should init the service without bulk', function () {
        selectedNics = selectedNics.slice(1);
        spyOn(editNicService, 'setIsInMultiNicVM');
        editNicService.init(selectedNics);
        expect(editNicService.setIsInMultiNicVM).toHaveBeenCalledWith(selectedNics);
        expect(editNicService.isBulk()).toBeFalsy();
        expect(editNicService.getNicObject()).toBe(selectedNics[0]);
    });

    it('should init the service with bulk', function () {
        spyOn(editNicService, 'setIsInMultiNicVM');
        editNicService.init(selectedNics);
        expect(editNicService.setIsInMultiNicVM).toHaveBeenCalledWith(selectedNics);
        expect(editNicService.isBulk()).toBeTruthy();
        expect(editNicService.getNicObject()).toEqual({
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
            "isInMultiNicVM": false,
            "changeIpConfFailover": "2",
            "changeIpConfTest": "2"
        });
    });

    it('should set failover ip configuration and gateway fa', function () {
        editNicService.init(selectedNics);
        var nicObject = editNicService.getNicObject();

        nicObject.FailoverSettings.VCenterNetworkSettings.IP = {
            IsDhcp: true,
            Gateway: '123'
        };

        editNicService.initIpConfiguration(nicObject, 'changeIpConfFailover', 'FailoverSettings', 'originalFailoverSettingsGatewayExist');
        expect(nicObject.changeIpConfFailover).toEqual(createVpgNicConstants.IP_CFG_VALUES.DHCP);
        expect(editNicService.getGatewayExist().originalFailoverSettingsGatewayExist).toBeTruthy();


        nicObject.FailoverSettings.VCenterNetworkSettings.IP = {
            IsDhcp: false,
            Gateway: null
        };
        editNicService.getGatewayExist().originalFailoverSettingsGatewayExist = false;


        editNicService.initIpConfiguration(nicObject, 'changeIpConfFailover', 'FailoverSettings', 'originalFailoverSettingsGatewayExist');
        expect(nicObject.changeIpConfFailover).toEqual(createVpgNicConstants.IP_CFG_VALUES.STATIC);
        expect(editNicService.getGatewayExist().originalFailoverSettingsGatewayExist).toBeFalsy();

        nicObject.FailoverSettings.VCenterNetworkSettings.IP = null;
        editNicService.initIpConfiguration(nicObject, 'changeIpConfFailover', 'FailoverSettings', 'originalFailoverSettingsGatewayExist');
        expect(nicObject.changeIpConfFailover).toEqual(createVpgNicConstants.IP_CFG_VALUES.NO);
    });

    it('should set failover ip configuration and gateway failover', function () {
        editNicService.init(selectedNics);
        var nicObject = editNicService.getNicObject();

        nicObject.FailoverSettings.VCenterNetworkSettings.IP = {
            IsDhcp: true,
            Gateway: '123'
        };

        editNicService.initIpConfiguration(nicObject, 'changeIpConfFailover', 'FailoverSettings', 'originalFailoverSettingsGatewayExist');
        expect(nicObject.changeIpConfFailover).toEqual(createVpgNicConstants.IP_CFG_VALUES.DHCP);
        expect(editNicService.getGatewayExist().originalFailoverSettingsGatewayExist).toBeTruthy();


        nicObject.FailoverSettings.VCenterNetworkSettings.IP = {
            IsDhcp: false,
            Gateway: null
        };
        editNicService.getGatewayExist().originalFailoverSettingsGatewayExist = false;


        editNicService.initIpConfiguration(nicObject, 'changeIpConfFailover', 'FailoverSettings', 'originalFailoverSettingsGatewayExist');
        expect(nicObject.changeIpConfFailover).toEqual(createVpgNicConstants.IP_CFG_VALUES.STATIC);
        expect(editNicService.getGatewayExist().originalFailoverSettingsGatewayExist).toBeFalsy();

        nicObject.FailoverSettings.VCenterNetworkSettings.IP = null;
        editNicService.initIpConfiguration(nicObject, 'changeIpConfFailover', 'FailoverSettings', 'originalFailoverSettingsGatewayExist');
        expect(nicObject.changeIpConfFailover).toEqual(createVpgNicConstants.IP_CFG_VALUES.NO);
    });

    it('should set failover ip configuration and gateway failover test', function () {
        editNicService.init(selectedNics);
        var nicObject = editNicService.getNicObject();

        nicObject.TestSettings.VCenterNetworkSettings.IP = {
            IsDhcp: true,
            Gateway: '123'
        };

        editNicService.initIpConfiguration(nicObject, 'changeIpConfTest', 'TestSettings', 'originalTestSettingsGatewayExist');
        expect(nicObject.changeIpConfTest).toEqual(createVpgNicConstants.IP_CFG_VALUES.DHCP);
        expect(editNicService.getGatewayExist().originalTestSettingsGatewayExist).toBeTruthy();


        nicObject.TestSettings.VCenterNetworkSettings.IP = {
            IsDhcp: false,
            Gateway: null
        };
        editNicService.getGatewayExist().originalTestSettingsGatewayExist = false;


        editNicService.initIpConfiguration(nicObject, 'changeIpConfTest', 'TestSettings', 'originalTestSettingsGatewayExist');
        expect(nicObject.changeIpConfTest).toEqual(createVpgNicConstants.IP_CFG_VALUES.STATIC);
        expect(editNicService.getGatewayExist().originalTestSettingsGatewayExist).toBeFalsy();

        nicObject.TestSettings.VCenterNetworkSettings.IP = null;
        editNicService.initIpConfiguration(nicObject, 'changeIpConfTest', 'TestSettings', 'originalTestSettingsGatewayExist');
        expect(nicObject.changeIpConfTest).toEqual(createVpgNicConstants.IP_CFG_VALUES.NO);
    });

    it('should init the buttons', function () {
        var buttons = editNicService.initButtons();
        expect(buttons).toEqual([
            {
                label: 'MODAL.CANCEL',
                class: 'btn btn-link',
                handler: jasmine.any(Function),
                disabled: false
            },
            {
                label: 'MODAL.OK',
                handler: jasmine.any(Function),
                disabled: false
            }
        ]);
    });

    it('should close the modal', function () {
        var buttons = editNicService.initButtons();

        spyOn(nicEditFactory, 'close');
        buttons[0].handler();
        expect(nicEditFactory.close).toHaveBeenCalled();
    });

    it('should save the modal', function () {
        nicEditFactory.open();
        editNicService.init(selectedNics);
        var buttons = editNicService.initButtons(),
            nicObject = editNicService.getNicObject();
        spyOn(nicEditFactory, 'save');
        buttons[1].handler();
        expect(nicEditFactory.save).toHaveBeenCalledWith(nicObject);
    });

    it('should set IP and DnsSuffix to null if ip config is set to no', function () {
        nicEditFactory.open();
        nicEditFactory.modalInstance.close = angular.noop;
        editNicService.init(selectedNics);

        var buttons = editNicService.initButtons(),
            nicObject = editNicService.getNicObject();


        nicObject.changeIpConfFailover = createVpgNicConstants.IP_CFG_VALUES.NO;
        nicObject.changeIpConfTest = createVpgNicConstants.IP_CFG_VALUES.NO;
        buttons[1].handler();

        expect(nicObject.FailoverSettings.VCenterNetworkSettings.IP).toBeNull();
        expect(nicObject.FailoverSettings.VCenterNetworkSettings.DnsSuffix).toBeNull();
        expect(nicObject.TestSettings.VCenterNetworkSettings.IP).toBeNull();
        expect(nicObject.TestSettings.VCenterNetworkSettings.DnsSuffix).toBeNull();
    });

    it('should copy to fo', function () {
        editNicService.init(selectedNics);
        var nicObject = editNicService.getNicObject();

        nicObject.FailoverSettings = null;
        nicObject.changeIpConfFailover = null;

        editNicService.copyToFO();

        expect(nicObject.FailoverSettings).toEqual(nicObject.TestSettings);
        expect(nicObject.changeIpConfFailover).toEqual(nicObject.changeIpConfTest);
    });

    it('should copy to fot', function () {
        editNicService.init(selectedNics);
        var nicObject = editNicService.getNicObject();

        nicObject.TestSettings = null;
        nicObject.changeIpConfTest = null;

        editNicService.copyToFOT();

        expect(nicObject.TestSettings).toEqual(nicObject.FailoverSettings);
        expect(nicObject.changeIpConfTest).toEqual(nicObject.changeIpConfFailover);
    });

    it('should return failover settings', function () {
        editNicService.init(selectedNics);

        var nicObject = editNicService.getNicObject(),
            failoverSettings = editNicService.getFailoverSettingsVCenterNetworkSettings();

        expect(failoverSettings).toBe(nicObject.FailoverSettings.VCenterNetworkSettings);
    });
    it('should return test settings', function () {
        editNicService.init(selectedNics);

        var nicObject = editNicService.getNicObject(),
            testSettings = editNicService.getTestSettingsVCenterNetworkSettings();

        expect(testSettings).toBe(nicObject.TestSettings.VCenterNetworkSettings);
    });

    it('should return failover should replace mac address', function () {
        editNicService.init(selectedNics);

        var nicObject = editNicService.getNicObject(),
            shouldReplaceMacAddress = editNicService.getSettingsShouldReplaceMacAddress(editNicService.getFailoverSettingsVCenterNetworkSettings());

        expect(shouldReplaceMacAddress).toBe(nicObject.FailoverSettings.VCenterNetworkSettings.ShouldReplaceMacAddress);
    });
    it('should return test should replace mac address', function () {
        editNicService.init(selectedNics);

        var nicObject = editNicService.getNicObject(),
            shouldReplaceMacAddress = editNicService.getSettingsShouldReplaceMacAddress(editNicService.getTestSettingsVCenterNetworkSettings());


        expect(shouldReplaceMacAddress).toBe(nicObject.TestSettings.VCenterNetworkSettings.ShouldReplaceMacAddress);
    });

    it('should return failover recovery network', function () {
        editNicService.init(selectedNics);

        var nicObject = editNicService.getNicObject(),
            network = editNicService.getSettingsRecoveryNetwork(editNicService.getFailoverSettingsVCenterNetworkSettings());

        expect(network).toBe(nicObject.FailoverSettings.VCenterNetworkSettings.RecoveryNetwork);
    });
    it('should return test recovery network', function () {
        editNicService.init(selectedNics);

        var nicObject = editNicService.getNicObject(),
            network = editNicService.getSettingsRecoveryNetwork(editNicService.getTestSettingsVCenterNetworkSettings());


        expect(network).toBe(nicObject.TestSettings.VCenterNetworkSettings.RecoveryNetwork);
    });


    var IP = {
        StaticIP: '0.0.0.0',
        SubnetMask: '0.0.0.0',
        Gateway: '0.0.0.0',
        PrimaryDns: '0.0.0.0',
        SecondaryDns: '0.0.0.0'
    };

    it('should return failover static ip', function () {
        editNicService.init(selectedNics);
        var ip = editNicService.getStaticIP(editNicService.getFailoverSettingsVCenterNetworkSettings());
        expect(ip).toBe(undefined);

        selectedNics[0].FailoverSettings.VCenterNetworkSettings.IP = IP;
        selectedNics[1].FailoverSettings.VCenterNetworkSettings.IP = IP;
        editNicService.init(selectedNics);
        ip = editNicService.getStaticIP(editNicService.getFailoverSettingsVCenterNetworkSettings());
        expect(ip).toBe('0.0.0.0');


    });
    it('should return test static ip', function () {
        editNicService.init(selectedNics);
        var ip = editNicService.getStaticIP(editNicService.getTestSettingsVCenterNetworkSettings());
        expect(ip).toBe(undefined);

        selectedNics[0].TestSettings.VCenterNetworkSettings.IP = IP;
        selectedNics[1].TestSettings.VCenterNetworkSettings.IP = IP;
        editNicService.init(selectedNics);
        ip = editNicService.getStaticIP(editNicService.getTestSettingsVCenterNetworkSettings());
        expect(ip).toBe('0.0.0.0');
    });

    it('should return failover subnet mask', function () {
        editNicService.init(selectedNics);
        var ip = editNicService.getSubnetMask(editNicService.getFailoverSettingsVCenterNetworkSettings());
        expect(ip).toBe(undefined);

        selectedNics[0].FailoverSettings.VCenterNetworkSettings.IP = IP;
        selectedNics[1].FailoverSettings.VCenterNetworkSettings.IP = IP;
        editNicService.init(selectedNics);
        ip = editNicService.getSubnetMask(editNicService.getFailoverSettingsVCenterNetworkSettings());
        expect(ip).toBe('0.0.0.0');
    });
    it('should return test subnet mask', function () {
        editNicService.init(selectedNics);
        var subnet = editNicService.getSubnetMask(editNicService.getTestSettingsVCenterNetworkSettings());
        expect(subnet).toBe(undefined);

        selectedNics[0].TestSettings.VCenterNetworkSettings.IP = IP;
        selectedNics[1].TestSettings.VCenterNetworkSettings.IP = IP;
        editNicService.init(selectedNics);
        subnet = editNicService.getSubnetMask(editNicService.getTestSettingsVCenterNetworkSettings());
        expect(subnet).toBe('0.0.0.0');
    });

    it('should return failover gateway', function () {
        editNicService.init(selectedNics);
        var gateway = editNicService.getGateway(editNicService.getFailoverSettingsVCenterNetworkSettings());
        expect(gateway).toBe(undefined);

        selectedNics[0].FailoverSettings.VCenterNetworkSettings.IP = IP;
        selectedNics[1].FailoverSettings.VCenterNetworkSettings.IP = IP;
        editNicService.init(selectedNics);
        gateway = editNicService.getGateway(editNicService.getFailoverSettingsVCenterNetworkSettings());
        expect(gateway).toBe('0.0.0.0');
    });
    it('should return test gateway', function () {
        editNicService.init(selectedNics);
        var gateway = editNicService.getGateway(editNicService.getTestSettingsVCenterNetworkSettings());
        expect(gateway).toBe(undefined);

        selectedNics[0].TestSettings.VCenterNetworkSettings.IP = IP;
        selectedNics[1].TestSettings.VCenterNetworkSettings.IP = IP;
        editNicService.init(selectedNics);
        gateway = editNicService.getGateway(editNicService.getTestSettingsVCenterNetworkSettings());
        expect(gateway).toBe('0.0.0.0');
    });

    it('should return failover primary dns', function () {
        editNicService.init(selectedNics);
        var ip = editNicService.getPrimaryDNS(editNicService.getFailoverSettingsVCenterNetworkSettings());
        expect(ip).toBe(undefined);

        selectedNics[0].FailoverSettings.VCenterNetworkSettings.IP = IP;
        selectedNics[1].FailoverSettings.VCenterNetworkSettings.IP = IP;
        editNicService.init(selectedNics);
        ip = editNicService.getPrimaryDNS(editNicService.getFailoverSettingsVCenterNetworkSettings());
        expect(ip).toBe('0.0.0.0');


    });
    it('should return test primary dns', function () {
        editNicService.init(selectedNics);
        var ip = editNicService.getPrimaryDNS(editNicService.getTestSettingsVCenterNetworkSettings());
        expect(ip).toBe(undefined);

        selectedNics[0].TestSettings.VCenterNetworkSettings.IP = IP;
        selectedNics[1].TestSettings.VCenterNetworkSettings.IP = IP;
        editNicService.init(selectedNics);
        ip = editNicService.getPrimaryDNS(editNicService.getTestSettingsVCenterNetworkSettings());
        expect(ip).toBe('0.0.0.0');
    });

    it('should return failover secondary dns', function () {
        editNicService.init(selectedNics);
        var ip = editNicService.getSecondaryDNS(editNicService.getFailoverSettingsVCenterNetworkSettings());
        expect(ip).toBe(undefined);

        selectedNics[0].FailoverSettings.VCenterNetworkSettings.IP = IP;
        selectedNics[1].FailoverSettings.VCenterNetworkSettings.IP = IP;
        editNicService.init(selectedNics);
        ip = editNicService.getSecondaryDNS(editNicService.getFailoverSettingsVCenterNetworkSettings());
        expect(ip).toBe('0.0.0.0');


    });
    it('should return test secondary dns', function () {
        editNicService.init(selectedNics);
        var ip = editNicService.getSecondaryDNS(editNicService.getTestSettingsVCenterNetworkSettings());
        expect(ip).toBe(undefined);

        selectedNics[0].TestSettings.VCenterNetworkSettings.IP = IP;
        selectedNics[1].TestSettings.VCenterNetworkSettings.IP = IP;
        editNicService.init(selectedNics);
        ip = editNicService.getSecondaryDNS(editNicService.getTestSettingsVCenterNetworkSettings());
        expect(ip).toBe('0.0.0.0');
    });

    it('should return failover dns suffix', function () {
        editNicService.init(selectedNics);
        var ip = editNicService.getDNSSuffix(editNicService.getFailoverSettingsVCenterNetworkSettings());
        expect(ip).toBe(null);

        selectedNics[0].FailoverSettings.VCenterNetworkSettings.DnsSuffix = '0.0.0.0';
        selectedNics[1].FailoverSettings.VCenterNetworkSettings.DnsSuffix = '0.0.0.0';
        editNicService.init(selectedNics);
        ip = editNicService.getDNSSuffix(editNicService.getFailoverSettingsVCenterNetworkSettings());
        expect(ip).toBe('0.0.0.0');


    });
    it('should return test dns suffix', function () {
        editNicService.init(selectedNics);
        var ip = editNicService.getDNSSuffix(editNicService.getTestSettingsVCenterNetworkSettings());
        expect(ip).toBe(null);

        selectedNics[0].TestSettings.VCenterNetworkSettings.DnsSuffix = '0.0.0.0';
        selectedNics[1].TestSettings.VCenterNetworkSettings.DnsSuffix = '0.0.0.0';
        editNicService.init(selectedNics);
        ip = editNicService.getDNSSuffix(editNicService.getTestSettingsVCenterNetworkSettings());
        expect(ip).toBe('0.0.0.0');
    });

    it('should get the mac list address', function () {
        var macList = editNicService.getMacList();
        expect(macList).toEqual([
            {label: 'EDIT_NIC.YES', value: true},
            {label: 'EDIT_NIC.NO', value: false}
        ]);
    });

    it('should get the NicIPConfigList', function () {
        var nicIPConfigList = editNicService.getNicIPConfigList();
        expect(nicIPConfigList).toEqual([
            {label: 'EDIT_NIC.NO', value: createVpgNicConstants.IP_CFG_VALUES.NO},
            {label: 'EDIT_NIC.YES_DHCP', value: createVpgNicConstants.IP_CFG_VALUES.DHCP},
            {label: 'EDIT_NIC.YES_STATIC', value: createVpgNicConstants.IP_CFG_VALUES.STATIC}
        ]);
    });

    it('should check if ip config is enabled', function () {
        var config = createVpgNicConstants.IP_CFG_VALUES.STATIC,
            result = editNicService.isIpConfigEnabled(config);

        expect(result).toBeTruthy();

        config = createVpgNicConstants.IP_CFG_VALUES.DHCP;
        result = editNicService.isIpConfigEnabled(config);
        expect(result).toBeFalsy();

        config = createVpgNicConstants.IP_CFG_VALUES.NO;
        result = editNicService.isIpConfigEnabled(config);
        expect(result).toBeFalsy();
    });

    it('should check if dns is enabled', function () {
        var config = createVpgNicConstants.IP_CFG_VALUES.STATIC,
            result = editNicService.isDNSEnabled(config);

        expect(result).toBeTruthy();

        config = createVpgNicConstants.IP_CFG_VALUES.DHCP;
        result = editNicService.isDNSEnabled(config);
        expect(result).toBeTruthy();

        config = createVpgNicConstants.IP_CFG_VALUES.NO;
        result = editNicService.isDNSEnabled(config);
        expect(result).toBeFalsy();
    });

    it('should set is multi nic vm', function () {
        editNicService.init(selectedNics);
        var result = editNicService.getIsInMultiNicVM();
        expect(result).toBeFalsy();

        selectedNics[0].isInMultiNicVM = true;
        editNicService.init(selectedNics);
        result = editNicService.getIsInMultiNicVM();
        expect(result).toBeTruthy();
    });

    var dummy = {dummy: true};

    it('should set the recovery network', function () {
        editNicService.init(selectedNics);
        editNicService.setSettingsRecoveryNetwork(editNicService.getFailoverSettingsVCenterNetworkSettings(), dummy);
        editNicService.setSettingsRecoveryNetwork(editNicService.getTestSettingsVCenterNetworkSettings(), dummy);

        var nicObject = editNicService.getNicObject();

        expect(nicObject.FailoverSettings.VCenterNetworkSettings.RecoveryNetwork).toBe(dummy);
        expect(nicObject.TestSettings.VCenterNetworkSettings.RecoveryNetwork).toBe(dummy);
    });

    it('should set the should replace mac address value', function () {
        editNicService.init(selectedNics);
        editNicService.setSettingsShouldReplaceMacAddress(editNicService.getFailoverSettingsVCenterNetworkSettings(), dummy);
        editNicService.setSettingsShouldReplaceMacAddress(editNicService.getTestSettingsVCenterNetworkSettings(), dummy);

        var nicObject = editNicService.getNicObject();

        expect(nicObject.FailoverSettings.VCenterNetworkSettings.ShouldReplaceMacAddress).toBe(dummy);
        expect(nicObject.TestSettings.VCenterNetworkSettings.ShouldReplaceMacAddress).toBe(dummy);
    });

    it('should set the static ip', function () {
        editNicService.init(selectedNics);
        editNicService.setStaticIP(editNicService.getFailoverSettingsVCenterNetworkSettings(), dummy);
        editNicService.setStaticIP(editNicService.getTestSettingsVCenterNetworkSettings(), dummy);

        var nicObject = editNicService.getNicObject();

        expect(nicObject.FailoverSettings.VCenterNetworkSettings.IP.StaticIP).toBe(dummy);
        expect(nicObject.TestSettings.VCenterNetworkSettings.IP.StaticIP).toBe(dummy);
    });

    it('should set the subnet mask', function () {
        editNicService.init(selectedNics);
        editNicService.setSubnetMask(editNicService.getFailoverSettingsVCenterNetworkSettings(), dummy);
        editNicService.setSubnetMask(editNicService.getTestSettingsVCenterNetworkSettings(), dummy);

        var nicObject = editNicService.getNicObject();

        expect(nicObject.FailoverSettings.VCenterNetworkSettings.IP.SubnetMask).toBe(dummy);
        expect(nicObject.TestSettings.VCenterNetworkSettings.IP.SubnetMask).toBe(dummy);
    });

    it('should set the gateway', function () {
        editNicService.init(selectedNics);
        editNicService.setGateway(editNicService.getFailoverSettingsVCenterNetworkSettings(), dummy);
        editNicService.setGateway(editNicService.getTestSettingsVCenterNetworkSettings(), dummy);

        var nicObject = editNicService.getNicObject();

        expect(nicObject.FailoverSettings.VCenterNetworkSettings.IP.Gateway).toBe(dummy);
        expect(nicObject.TestSettings.VCenterNetworkSettings.IP.Gateway).toBe(dummy);
    });

    it('should alert a message if failover gateway already exist', function () {
        selectedNics[0].isInMultiNicVM = true;
        selectedNics[0].FailoverSettings.VCenterNetworkSettings.IP = {
            Gateway: '0.0.0.0'
        };
        editNicService.init(selectedNics.slice(0, 1));
        var gatewayFailoverExist = editNicService.getGatewayExist().originalFailoverSettingsGatewayExist;
        expect(gatewayFailoverExist).toBeTruthy();
        spyOn(zAlertFactory, 'info');
        editNicService.setGateway(editNicService.getFailoverSettingsVCenterNetworkSettings(), dummy, true);
        expect(zAlertFactory.info).toHaveBeenCalledWith('EDIT_NIC.SUB_TITLE', 'EDIT_NIC.INFO_TEXT');
        gatewayFailoverExist = editNicService.getGatewayExist().originalFailoverSettingsGatewayExist;
        expect(gatewayFailoverExist).toBeFalsy();
    });

    it('should alert a message if failover test gateway already exist', function () {
        selectedNics[0].isInMultiNicVM = true;
        selectedNics[0].TestSettings.VCenterNetworkSettings.IP = {
            Gateway: '0.0.0.0'
        };
        editNicService.init(selectedNics.slice(0, 1));
        var gatewayTestExist = editNicService.getGatewayExist().originalTestSettingsGatewayExist;
        expect(gatewayTestExist).toBeTruthy();
        spyOn(zAlertFactory, 'info');
        editNicService.setGateway(editNicService.getTestSettingsVCenterNetworkSettings(), dummy, false);
        expect(zAlertFactory.info).toHaveBeenCalledWith('EDIT_NIC.SUB_TITLE', 'EDIT_NIC.INFO_TEXT');
        gatewayTestExist = editNicService.getGatewayExist().originalTestSettingsGatewayExist;
        expect(gatewayTestExist).toBeFalsy();
    });

    it('should set the primary dns', function () {
        editNicService.init(selectedNics);
        editNicService.setPrimaryDNS(editNicService.getFailoverSettingsVCenterNetworkSettings(), dummy);
        editNicService.setPrimaryDNS(editNicService.getTestSettingsVCenterNetworkSettings(), dummy);

        var nicObject = editNicService.getNicObject();

        expect(nicObject.FailoverSettings.VCenterNetworkSettings.IP.PrimaryDns).toBe(dummy);
        expect(nicObject.TestSettings.VCenterNetworkSettings.IP.PrimaryDns).toBe(dummy);
    });

    it('should set the secondary dns', function () {
        editNicService.init(selectedNics);
        editNicService.setSecondaryDNS(editNicService.getFailoverSettingsVCenterNetworkSettings(), dummy);
        editNicService.setSecondaryDNS(editNicService.getTestSettingsVCenterNetworkSettings(), dummy);

        var nicObject = editNicService.getNicObject();

        expect(nicObject.FailoverSettings.VCenterNetworkSettings.IP.SecondaryDns).toBe(dummy);
        expect(nicObject.TestSettings.VCenterNetworkSettings.IP.SecondaryDns).toBe(dummy);
    });

    it('should set the dns suffix', function () {
        editNicService.init(selectedNics);
        editNicService.setDNSSuffix(editNicService.getFailoverSettingsVCenterNetworkSettings(), dummy);
        editNicService.setDNSSuffix(editNicService.getTestSettingsVCenterNetworkSettings(), dummy);

        var nicObject = editNicService.getNicObject();

        expect(nicObject.FailoverSettings.VCenterNetworkSettings.DnsSuffix).toBe(dummy);
        expect(nicObject.TestSettings.VCenterNetworkSettings.DnsSuffix).toBe(dummy);
    });

    it('should set is dchp', function () {
        editNicService.init(selectedNics);
        var nicObject = editNicService.getNicObject();

        nicObject.FailoverSettings.VCenterNetworkSettings.IP = IP;
        nicObject.FailoverSettings.VCenterNetworkSettings.IP.IsDhcp = true;
        nicObject.TestSettings.VCenterNetworkSettings.IP = IP;
        nicObject.TestSettings.VCenterNetworkSettings.IP.IsDhcp = true;
        editNicService.setIsDHCP(editNicService.getFailoverSettingsVCenterNetworkSettings(), false, true);
        editNicService.setIsDHCP(editNicService.getTestSettingsVCenterNetworkSettings(), false, false);
        expect(nicObject.FailoverSettings.VCenterNetworkSettings.IP.IsDhcp).toBeFalsy();
        expect(nicObject.TestSettings.VCenterNetworkSettings.IP.IsDhcp).toBeFalsy();

        editNicService.setIsDHCP(editNicService.getFailoverSettingsVCenterNetworkSettings(), true, true);
        editNicService.setIsDHCP(editNicService.getTestSettingsVCenterNetworkSettings(), true, false);
        expect(nicObject.FailoverSettings.VCenterNetworkSettings.IP.IsDhcp).toBeTruthy();
        expect(nicObject.TestSettings.VCenterNetworkSettings.IP.IsDhcp).toBeTruthy();
        expect(nicObject.changeIpConfFailover).toEqual(createVpgNicConstants.IP_CFG_VALUES.DHCP);
        expect(nicObject.changeIpConfTest).toEqual(createVpgNicConstants.IP_CFG_VALUES.DHCP);

        nicObject.FailoverSettings.VCenterNetworkSettings.IP = null;
        nicObject.TestSettings.VCenterNetworkSettings.IP = null;
        editNicService.setIsDHCP(editNicService.getFailoverSettingsVCenterNetworkSettings(), false, true);
        editNicService.setIsDHCP(editNicService.getTestSettingsVCenterNetworkSettings(), false, false);
        expect(nicObject.FailoverSettings.VCenterNetworkSettings.IP).toBeNull();
        expect(nicObject.TestSettings.VCenterNetworkSettings.IP).toBeNull();
        expect(nicObject.changeIpConfFailover).toEqual(createVpgNicConstants.IP_CFG_VALUES.STATIC);
        expect(nicObject.changeIpConfTest).toEqual(createVpgNicConstants.IP_CFG_VALUES.STATIC);
    });

    it('should alert when changing ip config', function () {
        selectedNics[0].isInMultiNicVM = true;
        selectedNics[0].FailoverSettings.VCenterNetworkSettings.IP = {
            Gateway: '0.0.0.0'
        };
        selectedNics[0].TestSettings.VCenterNetworkSettings.IP = {
            Gateway: '0.0.0.0'
        };
        editNicService.init(selectedNics.slice(0, 1));

        spyOn(zAlertFactory,'info');

        editNicService.setChangeIpConf(editNicService.getFailoverSettingsVCenterNetworkSettings(),
            createVpgNicConstants.IP_CFG_VALUES.STATIC, createVpgNicConstants.IP_CFG_VALUES.DHCP, true);
        editNicService.setChangeIpConf(editNicService.getTestSettingsVCenterNetworkSettings(),
            createVpgNicConstants.IP_CFG_VALUES.STATIC, createVpgNicConstants.IP_CFG_VALUES.DHCP, false);
        editNicService.setChangeIpConf(editNicService.getFailoverSettingsVCenterNetworkSettings(),
            createVpgNicConstants.IP_CFG_VALUES.STATIC, createVpgNicConstants.IP_CFG_VALUES.NO, true);
        editNicService.setChangeIpConf(editNicService.getTestSettingsVCenterNetworkSettings(),
            createVpgNicConstants.IP_CFG_VALUES.STATIC, createVpgNicConstants.IP_CFG_VALUES.NO, false);
        editNicService.setChangeIpConf(editNicService.getFailoverSettingsVCenterNetworkSettings(),
            createVpgNicConstants.IP_CFG_VALUES.STATIC, createVpgNicConstants.IP_CFG_VALUES.STATIC, true);
        editNicService.setChangeIpConf(editNicService.getTestSettingsVCenterNetworkSettings(),
            createVpgNicConstants.IP_CFG_VALUES.STATIC, createVpgNicConstants.IP_CFG_VALUES.STATIC, false);
        editNicService.setChangeIpConf(editNicService.getFailoverSettingsVCenterNetworkSettings(),
            createVpgNicConstants.IP_CFG_VALUES.NO, createVpgNicConstants.IP_CFG_VALUES.STATIC, true);
        editNicService.setChangeIpConf(editNicService.getTestSettingsVCenterNetworkSettings(),
            createVpgNicConstants.IP_CFG_VALUES.NO, createVpgNicConstants.IP_CFG_VALUES.STATIC, false);
        editNicService.setChangeIpConf(editNicService.getFailoverSettingsVCenterNetworkSettings(),
            createVpgNicConstants.IP_CFG_VALUES.DHCP, createVpgNicConstants.IP_CFG_VALUES.STATIC, true);
        editNicService.setChangeIpConf(editNicService.getTestSettingsVCenterNetworkSettings(),
            createVpgNicConstants.IP_CFG_VALUES.DHCP, createVpgNicConstants.IP_CFG_VALUES.STATIC, false);

        expect(zAlertFactory.info).toHaveBeenCalledTimes(4);
        expect(zAlertFactory.info).toHaveBeenCalledWith('EDIT_NIC.SUB_TITLE','EDIT_NIC.INFO_TEXT');
    });

    it('should set ip object to null if ip config is set to no', function(){
        selectedNics[0].FailoverSettings.VCenterNetworkSettings.IP = IP;
        selectedNics[0].TestSettings.VCenterNetworkSettings.IP = IP;
        editNicService.init(selectedNics.slice(0, 1));

        editNicService.setChangeIpConf(editNicService.getFailoverSettingsVCenterNetworkSettings(),
            createVpgNicConstants.IP_CFG_VALUES.NO, null, true);
        editNicService.setChangeIpConf(editNicService.getTestSettingsVCenterNetworkSettings(),
            createVpgNicConstants.IP_CFG_VALUES.NO, null, false);

        var nicObject = editNicService.getNicObject();
        expect(nicObject.FailoverSettings.VCenterNetworkSettings.IP).toBeNull();
        expect(nicObject.TestSettings.VCenterNetworkSettings.IP).toBeNull();
        expect(nicObject.changeIpConfFailover).toEqual(createVpgNicConstants.IP_CFG_VALUES.NO);
        expect(nicObject.changeIpConfTest).toEqual(createVpgNicConstants.IP_CFG_VALUES.NO);
    });

    it('should reset staic ip subnet mask and gateway when ip config is not static and there is an ip config available', function(){
        selectedNics[0].FailoverSettings.VCenterNetworkSettings.IP = IP;
        selectedNics[0].TestSettings.VCenterNetworkSettings.IP = IP;
        editNicService.init(selectedNics.slice(0, 1));

        editNicService.setChangeIpConf(editNicService.getFailoverSettingsVCenterNetworkSettings(),
            createVpgNicConstants.IP_CFG_VALUES.DHCP, null, true);
        editNicService.setChangeIpConf(editNicService.getTestSettingsVCenterNetworkSettings(),
            createVpgNicConstants.IP_CFG_VALUES.DHCP, null, false);

        var nicObject = editNicService.getNicObject();

        expect(nicObject.FailoverSettings.VCenterNetworkSettings.IP.StaticIP).toBeNull();
        expect(nicObject.TestSettings.VCenterNetworkSettings.IP.StaticIP).toBeNull();
        expect(nicObject.FailoverSettings.VCenterNetworkSettings.IP.SubnetMask).toBeNull();
        expect(nicObject.TestSettings.VCenterNetworkSettings.IP.SubnetMask).toBeNull();
        expect(nicObject.FailoverSettings.VCenterNetworkSettings.IP.Gateway).toBeNull();
        expect(nicObject.TestSettings.VCenterNetworkSettings.IP.Gateway).toBeDefined();

    });

});
