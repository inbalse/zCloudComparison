'use strict';

describe('edit vcd nic service', function () {
    var editVCDNicService, vpgService, nicVCDEditFactory, createVpgNicConstants, enums, globalConstants, selectedNics;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_editVCDNicService_, _nicVCDEditFactory_, _createVpgNicConstants_, _vpgService_, _globalConstants_, _enums_) {
        selectedNics = [
            {
                "InternalIdentifier": {
                    "Name": "Network adapter 1"
                },
                "SourceNetwork": {
                    "VcenterNetwork": null,
                    "VCDNetwork": {
                        "VNicIdentifier": {
                            "Name": "Network adapter 1"
                        },
                        "MacAddress": "00:50:56:09:00:1c",
                        "IsPrimary": true,
                        "IsConnected": true,
                        "IPMode": {
                            "IpModeType": 2
                        },
                        "VappNetworkName": "ExtNetDRaaS1",
                        "IpAddress": null
                    }
                },
                "FailoverSettings": {
                    "VCenterNetworkSettings": null,
                    "VCDNetworkSettings": {
                        "NicInfo": {
                            "VNicIdentifier": {
                                "Name": "Network adapter 1"
                            },
                            "MacAddress": "00:50:56:09:00:1c",
                            "IsPrimary": true,
                            "IsConnected": true,
                            "IPMode": {
                                "IpModeType": 0
                            },
                            "VappNetworkName": "ExtNet3",
                            "IpAddress": null
                        },
                        "NewMacAddress": {
                            "MacAddress": "00:50:56:09:00:1c"
                        }
                    }
                },
                "TestSettings": {
                    "VCenterNetworkSettings": null,
                    "VCDNetworkSettings": {
                        "NicInfo": {
                            "VNicIdentifier": {
                                "Name": "Network adapter 1"
                            },
                            "MacAddress": "00:50:56:09:00:1c",
                            "IsPrimary": true,
                            "IsConnected": true,
                            "IPMode": {
                                "IpModeType": 0
                            },
                            "VappNetworkName": "ExtNetDRaaS1",
                            "IpAddress": null
                        },
                        "NewMacAddress": {
                            "MacAddress": "00:50:56:09:00:1c"
                        }
                    }
                },
                "IsIPConfigurationEnabled": true,
                "MacAddress": "00:50:56:09:00:1c",
                "vmId": {
                    "InternalVmName": "vm-442",
                    "ServerIdentifier": {
                        "ServerGuid": "56cbb915-4a13-45e4-849b-55fbff19d92f"
                    }
                },
                "id": "vm-44200:50:56:09:00:1c",
                "vmName": "win2008 (0baedc77-50bc-47db-aa9e-460d30154025)",
                "index": 3,
                "FailoverNetwork": "ExtNet3",
                "TestNetwork": "ExtNetDRaaS1",
                "FailoverConnected": true,
                "TestConnected": true,
                "FailoverPrimary": true,
                "TestPrimary": true,
                "FailoverIp": "IP Pool",
                "TestIP": "IP Pool",
                "TestMac": "00:50:56:09:00:1c",
                "FailoverMac": "00:50:56:09:00:1c",
                "nicName": "Network adapter 1"
            },
            {
                "InternalIdentifier": {
                    "Name": "Network adapter 1"
                },
                "SourceNetwork": {
                    "VcenterNetwork": null,
                    "VCDNetwork": {
                        "VNicIdentifier": {
                            "Name": "Network adapter 1"
                        },
                        "MacAddress": "00:50:56:09:00:34",
                        "IsPrimary": true,
                        "IsConnected": false,
                        "IPMode": {
                            "IpModeType": 0
                        },
                        "VappNetworkName": "VM Network",
                        "IpAddress": null
                    }
                },
                "FailoverSettings": {
                    "VCenterNetworkSettings": null,
                    "VCDNetworkSettings": {
                        "NicInfo": {
                            "VNicIdentifier": {
                                "Name": "Network adapter 1"
                            },
                            "MacAddress": "00:50:56:09:00:34",
                            "IsPrimary": true,
                            "IsConnected": false,
                            "IPMode": {
                                "IpModeType": 0
                            },
                            "VappNetworkName": "ExtNet3",
                            "IpAddress": null
                        },
                        "NewMacAddress": {
                            "MacAddress": "00:50:56:09:00:34"
                        }
                    }
                },
                "TestSettings": {
                    "VCenterNetworkSettings": null,
                    "VCDNetworkSettings": {
                        "NicInfo": {
                            "VNicIdentifier": {
                                "Name": "Network adapter 1"
                            },
                            "MacAddress": "00:50:56:09:00:34",
                            "IsPrimary": true,
                            "IsConnected": false,
                            "IPMode": {
                                "IpModeType": 0
                            },
                            "VappNetworkName": "VM Network",
                            "IpAddress": null
                        },
                        "NewMacAddress": {
                            "MacAddress": "00:50:56:09:00:34"
                        }
                    }
                },
                "IsIPConfigurationEnabled": false,
                "MacAddress": "00:50:56:09:00:34",
                "vmId": {
                    "InternalVmName": "vm-633",
                    "ServerIdentifier": {
                        "ServerGuid": "56cbb915-4a13-45e4-849b-55fbff19d92f"
                    }
                },
                "id": "vm-63300:50:56:09:00:34",
                "vmName": "added VM (c6c00e8f-e476-4821-a0bc-92f55e044e73)",
                "index": 2,
                "FailoverNetwork": "ExtNet3",
                "TestNetwork": "VM Network",
                "FailoverConnected": false,
                "TestConnected": false,
                "FailoverPrimary": true,
                "TestPrimary": true,
                "FailoverIp": "IP Pool",
                "TestIP": "IP Pool",
                "TestMac": "00:50:56:09:00:34",
                "FailoverMac": "00:50:56:09:00:34",
                "nicName": "Network adapter 1"
            }
        ];

        editVCDNicService = _editVCDNicService_;
        nicVCDEditFactory = _nicVCDEditFactory_;
        createVpgNicConstants = _createVpgNicConstants_;
        globalConstants = _globalConstants_;
        vpgService = _vpgService_;

        vpgService.getComputeResources = function () {
            return {
                Networks: [
                    {dummy: 1},
                    {dummy: 2},
                    {dummy: 3}
                ]
            };
        };

        vpgService.isVCDToVCD = angular.noop;
        enums = _enums_;
    }));

    it('should init the service without bulk', function () {
        editVCDNicService.init(selectedNics.slice(0, 1));
        expect(editVCDNicService.isBulk()).toBeFalsy();
        expect(editVCDNicService.getNicObject()).toBe(selectedNics[0]);
    });

    it('should init the service with bulk', function () {
        editVCDNicService.init(selectedNics);
        expect(editVCDNicService.isBulk()).toBeTruthy();
        expect(editVCDNicService.getNicObject()).toEqual({
            "InternalIdentifier": {
                "Name": "Network adapter 1"
            },
            "SourceNetwork": {
                "VcenterNetwork": null,
                "VCDNetwork": {
                    "VNicIdentifier": {
                        "Name": "Network adapter 1"
                    },
                    "MacAddress": "00:50:56:09:00:1c",
                    "IsPrimary": true,
                    "IsConnected": true,
                    "IPMode": {
                        "IpModeType": 2
                    },
                    "VappNetworkName": "ExtNetDRaaS1",
                    "IpAddress": null
                }
            },
            "FailoverSettings": {
                "VCenterNetworkSettings": null,
                "VCDNetworkSettings": {
                    "NicInfo": {
                        "VNicIdentifier": {
                            "Name": "Network adapter 1"
                        },
                        "MacAddress": "00:50:56:09:00:1c",
                        "IsPrimary": true,
                        "IsConnected": true,
                        "IPMode": {
                            "IpModeType": 0
                        },
                        "VappNetworkName": "ExtNet3",
                        "IpAddress": null
                    },
                    "NewMacAddress": {
                        "MacAddress": null
                    }
                }
            },
            "TestSettings": {
                "VCenterNetworkSettings": null,
                "VCDNetworkSettings": {
                    "NicInfo": {
                        "VNicIdentifier": {
                            "Name": "Network adapter 1"
                        },
                        "MacAddress": "00:50:56:09:00:1c",
                        "IsPrimary": true,
                        "IsConnected": true,
                        "IPMode": {
                            "IpModeType": 0
                        },
                        "VappNetworkName": null,
                        "IpAddress": null
                    },
                    "NewMacAddress": {
                        "MacAddress": null
                    }
                }
            },
            "IsIPConfigurationEnabled": false,
            "MacAddress": "00:50:56:09:00:1c",
            "vmId": {
                "InternalVmName": "vm-442",
                "ServerIdentifier": {
                    "ServerGuid": "56cbb915-4a13-45e4-849b-55fbff19d92f"
                }
            },
            "id": "vm-44200:50:56:09:00:1c",
            "vmName": "win2008 (0baedc77-50bc-47db-aa9e-460d30154025)",
            "index": 3,
            "FailoverNetwork": "ExtNet3",
            "TestNetwork": "ExtNetDRaaS1",
            "FailoverConnected": true,
            "TestConnected": true,
            "FailoverPrimary": true,
            "TestPrimary": true,
            "FailoverIp": "IP Pool",
            "TestIP": "IP Pool",
            "TestMac": "00:50:56:09:00:1c",
            "FailoverMac": "00:50:56:09:00:1c",
            "nicName": "Network adapter 1"
        });
    });

    it('should remove static ip when bulk is selected', function () {
        editVCDNicService.init(selectedNics);
        var ipConfigList = editVCDNicService.getVNicIPConfigList();
        expect(ipConfigList).toEqual([
            {label: 'IP Pool', value: enums.VCDNetworkIpMode_VCDNetworkIpModeType.IPPool},
            {label: 'DHCP', value: enums.VCDNetworkIpMode_VCDNetworkIpModeType.Dhcp},
            {label: 'None', value: enums.VCDNetworkIpMode_VCDNetworkIpModeType.None}
        ]);
    });

    it('should populate the mac address list', function () {
        editVCDNicService.init(selectedNics.slice(0, 1));

        var macFailoverList = editVCDNicService.getMacFailoverAddressList(),
            macFailoverTestList = editVCDNicService.getMacTestAddressList(),
            failoverMac = selectedNics[0].FailoverSettings.VCDNetworkSettings.NicInfo.MacAddress,
            testMac = selectedNics[0].TestSettings.VCDNetworkSettings.NicInfo.MacAddress;

        expect(macFailoverList[1]).toEqual({label: failoverMac, value: failoverMac});
        expect(macFailoverTestList[1]).toEqual({label: testMac, value: testMac});
    });

    it('should get the potential networks', function () {
        editVCDNicService.init(selectedNics);
        expect(vpgService.getComputeResources().Networks).toEqual([
            {dummy: 1},
            {dummy: 2},
            {dummy: 3}
        ]);
    });

    it('should return failover settings', function () {
        editVCDNicService.init(selectedNics);

        var nicObject = editVCDNicService.getNicObject(),
            failoverSettings = editVCDNicService.getFailoverVCDNetworkSettings();

        expect(failoverSettings).toBe(nicObject.FailoverSettings.VCDNetworkSettings);
    });
    it('should return test settings', function () {
        editVCDNicService.init(selectedNics);

        var nicObject = editVCDNicService.getNicObject(),
            testSettings = editVCDNicService.getTestVCDNetworkSettings();

        expect(testSettings).toBe(nicObject.TestSettings.VCDNetworkSettings);
    });

    it('should init the buttons', function () {
        var buttons = editVCDNicService.initButtons();
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
        var buttons = editVCDNicService.initButtons();

        spyOn(nicVCDEditFactory, 'close');
        buttons[0].handler();
        editVCDNicService.close();

        expect(nicVCDEditFactory.close).toHaveBeenCalledTimes(2);
    });

    it('should save the modal', function () {
        nicVCDEditFactory.open();
        editVCDNicService.init(selectedNics);
        var buttons = editVCDNicService.initButtons(),
            nicObject = editVCDNicService.getNicObject();
        spyOn(nicVCDEditFactory, 'save');
        buttons[1].handler();
        expect(nicVCDEditFactory.save).toHaveBeenCalledWith(nicObject);
    });

    it('should copy to fo', function () {
        editVCDNicService.init(selectedNics);
        var nicObject = editVCDNicService.getNicObject();

        nicObject.FailoverSettings = null;

        editVCDNicService.copyToFO();

        expect(nicObject.FailoverSettings).toEqual(nicObject.TestSettings);
    });

    it('should copy to fot', function () {
        editVCDNicService.init(selectedNics);
        var nicObject = editVCDNicService.getNicObject();

        nicObject.TestSettings = null;

        editVCDNicService.copyToFOT();

        expect(nicObject.TestSettings).toEqual(nicObject.FailoverSettings);
    });

    it('should get the vapp network name', function () {
        editVCDNicService.init(selectedNics);
        var name = editVCDNicService.getVappNetworkName(editVCDNicService.getFailoverVCDNetworkSettings());
        expect(name).toEqual('ExtNet3');

        name = editVCDNicService.getVappNetworkName(editVCDNicService.getTestVCDNetworkSettings());
        expect(name).toBeNull();
    });

    it('should get the ip mode type', function () {
        editVCDNicService.init(selectedNics);
        var type = editVCDNicService.getIPModeType(editVCDNicService.getFailoverVCDNetworkSettings());
        expect(type).toEqual(enums.VCDNetworkIpMode_VCDNetworkIpModeType.IPPool);

        type = editVCDNicService.getIPModeType(editVCDNicService.getTestVCDNetworkSettings());
        expect(type).toEqual(enums.VCDNetworkIpMode_VCDNetworkIpModeType.IPPool);
    });

    it('should get the ip address', function () {
        var address = '0.0.0.0';
        editVCDNicService.init(selectedNics);

        selectedNics[1].FailoverSettings.VCDNetworkSettings.NicInfo.IpAddress = address;
        selectedNics[1].TestSettings.VCDNetworkSettings.NicInfo.IpAddress = address;

        var ip = editVCDNicService.getIPAddress(editVCDNicService.getFailoverVCDNetworkSettings());
        expect(ip).toEqual(null);

        ip = editVCDNicService.getIPAddress(editVCDNicService.getTestVCDNetworkSettings());
        expect(ip).toEqual(null);

        selectedNics[0].FailoverSettings.VCDNetworkSettings.NicInfo.IpAddress = address;
        selectedNics[0].TestSettings.VCDNetworkSettings.NicInfo.IpAddress = address;

        ip = editVCDNicService.getIPAddress(editVCDNicService.getFailoverVCDNetworkSettings());
        expect(ip).toEqual(address);

        ip = editVCDNicService.getIPAddress(editVCDNicService.getTestVCDNetworkSettings());
        expect(ip).toEqual(address);

    });

    it('should get the mac address bulk', function () {
        editVCDNicService.init(selectedNics);

        var macAddress = editVCDNicService.getMACAddress(editVCDNicService.getFailoverVCDNetworkSettings());
        expect(macAddress).toBeNull();

        macAddress = editVCDNicService.getMACAddress(editVCDNicService.getTestVCDNetworkSettings());
        expect(macAddress).toBeNull();
    });

    it('should get the mac address no bulk', function () {
        editVCDNicService.init(selectedNics.slice(0, 1));

        var macAddress = editVCDNicService.getMACAddress(editVCDNicService.getFailoverVCDNetworkSettings());
        expect(macAddress).toEqual('00:50:56:09:00:1c');

        macAddress = editVCDNicService.getMACAddress(editVCDNicService.getTestVCDNetworkSettings());
        expect(macAddress).toEqual('00:50:56:09:00:1c');
    });

    it('should get the mac failover address list bulk', function () {
        editVCDNicService.init(selectedNics);
        var list = editVCDNicService.getMacFailoverAddressList();
        expect(list).toEqual([{label: 'Reset', value: ''}]);

        list = editVCDNicService.getMacTestAddressList();
        expect(list).toEqual([{label: 'Reset', value: ''}]);
    });

    it('should get the mac failover address list no bulk', function () {
        editVCDNicService.init(selectedNics.slice(0, 1));
        var list = editVCDNicService.getMacFailoverAddressList();
        expect(list).toEqual([{label: 'Reset', value: ''}, {label: '00:50:56:09:00:1c', value: '00:50:56:09:00:1c'}]);

        list = editVCDNicService.getMacTestAddressList();
        expect(list).toEqual([{label: 'Reset', value: ''}, {label: '00:50:56:09:00:1c', value: '00:50:56:09:00:1c'}]);
    });

    it('should get the nic IP config list bulk', function () {
        editVCDNicService.init(selectedNics);
        var result = editVCDNicService.getVNicIPConfigList();

        expect(result).toEqual([
            {label: 'IP Pool', value: enums.VCDNetworkIpMode_VCDNetworkIpModeType.IPPool},
            {label: 'DHCP', value: enums.VCDNetworkIpMode_VCDNetworkIpModeType.Dhcp},
            {label: 'None', value: enums.VCDNetworkIpMode_VCDNetworkIpModeType.None}
        ]);
    });
    it('should get the nic IP config list no bulk', function () {
        editVCDNicService.init(selectedNics.slice(0, 1));
        var result = editVCDNicService.getVNicIPConfigList();

        expect(result).toEqual([
            {label: 'IP Pool', value: enums.VCDNetworkIpMode_VCDNetworkIpModeType.IPPool},
            {label: 'DHCP', value: enums.VCDNetworkIpMode_VCDNetworkIpModeType.Dhcp},
            {label: 'Static- IP Pool', value: enums.VCDNetworkIpMode_VCDNetworkIpModeType.Manual},
            {label: 'None', value: enums.VCDNetworkIpMode_VCDNetworkIpModeType.None}
        ]);
    });

    it('should get if state is bulk', function () {
        editVCDNicService.init(selectedNics);
        var result = editVCDNicService.isBulk();
        expect(result).toBeTruthy();
        editVCDNicService.init(selectedNics.slice(0, 1));
        result = editVCDNicService.isBulk();
        expect(result).toBeFalsy();

    });

    it('should check if ip list is disabled', function () {
        editVCDNicService.init(selectedNics);
        var nicObject = editVCDNicService.getNicObject();

        nicObject.FailoverSettings.VCDNetworkSettings.NicInfo.IPMode.IpModeType = enums.VCDNetworkIpMode_VCDNetworkIpModeType.None;
        nicObject.TestSettings.VCDNetworkSettings.NicInfo.IPMode.IpModeType = enums.VCDNetworkIpMode_VCDNetworkIpModeType.None;
        var result = editVCDNicService.isIpListDisabled(editVCDNicService.getFailoverVCDNetworkSettings());
        expect(result).toBeTruthy();
        result = editVCDNicService.isIpListDisabled(editVCDNicService.getTestVCDNetworkSettings());
        expect(result).toBeTruthy();


        nicObject.FailoverSettings.VCDNetworkSettings.NicInfo.IPMode.IpModeType = enums.VCDNetworkIpMode_VCDNetworkIpModeType.IPPool;
        nicObject.TestSettings.VCDNetworkSettings.NicInfo.IPMode.IpModeType = enums.VCDNetworkIpMode_VCDNetworkIpModeType.IPPool;
        result = editVCDNicService.isIpListDisabled(editVCDNicService.getFailoverVCDNetworkSettings());
        expect(result).toBeFalsy();
        result = editVCDNicService.isIpListDisabled(editVCDNicService.getTestVCDNetworkSettings());
        expect(result).toBeFalsy();
    });

    it('should check if network type is manual', function () {
        var result = editVCDNicService.isNetworkTypeManual(enums.VCDNetworkIpMode_VCDNetworkIpModeType.Manual);
        expect(result).toBeTruthy();

        result = editVCDNicService.isNetworkTypeManual(enums.VCDNetworkIpMode_VCDNetworkIpModeType.None);
        expect(result).toBeFalsy();

        result = editVCDNicService.isNetworkTypeManual(enums.VCDNetworkIpMode_VCDNetworkIpModeType.IPPool);
        expect(result).toBeFalsy();
    });

    it('should check if ip configuration is enabled', function () {
        editVCDNicService.init(selectedNics);
        var nicObject = editVCDNicService.getNicObject();

        nicObject.IsIPConfigurationEnabled = true;
        var result = editVCDNicService.isIPConfigurationEnabled();
        expect(result).toBeTruthy();

        nicObject.IsIPConfigurationEnabled = false;
        result = editVCDNicService.isIPConfigurationEnabled();
        expect(result).toBeFalsy();
    });

    it('should check if state is vcd to vcd', function () {
        spyOn(vpgService, 'isVCDToVCD');
        editVCDNicService.isVCDToVCD();
        expect(vpgService.isVCDToVCD).toHaveBeenCalled();
    });

    it('should set vapp network name', function () {
        editVCDNicService.init(selectedNics);
        var nicObject = editVCDNicService.getNicObject();
        editVCDNicService.setVAppNetworkName(editVCDNicService.getFailoverVCDNetworkSettings(), 'Test');
        expect(nicObject.FailoverSettings.VCDNetworkSettings.NicInfo.VappNetworkName).toEqual('Test');

        editVCDNicService.setVAppNetworkName(editVCDNicService.getTestVCDNetworkSettings(), 'Test');
        expect(nicObject.TestSettings.VCDNetworkSettings.NicInfo.VappNetworkName).toEqual('Test');


        spyOn(editVCDNicService, 'setIPModeType');
        editVCDNicService.setVAppNetworkName(editVCDNicService.getFailoverVCDNetworkSettings(), globalConstants.NONE_NETWORK);
        editVCDNicService.setVAppNetworkName(editVCDNicService.getTestVCDNetworkSettings(), globalConstants.NONE_NETWORK);
        expect(editVCDNicService.setIPModeType).toHaveBeenCalledTimes(2);
        expect(editVCDNicService.setIPModeType).toHaveBeenCalledWith(editVCDNicService.getFailoverVCDNetworkSettings(), enums.VCDNetworkIpMode_VCDNetworkIpModeType.None);
        expect(editVCDNicService.setIPModeType).toHaveBeenCalledWith(editVCDNicService.getTestVCDNetworkSettings(), enums.VCDNetworkIpMode_VCDNetworkIpModeType.None);
    });

    it('should set the mac address', function () {
        editVCDNicService.init(selectedNics);
        var nicObject = editVCDNicService.getNicObject();
        editVCDNicService.setMACAddress(editVCDNicService.getFailoverVCDNetworkSettings(), '00:00:00:00:00');
        expect(nicObject.FailoverSettings.VCDNetworkSettings.NewMacAddress.MacAddress).toEqual('00:00:00:00:00');

        editVCDNicService.setMACAddress(editVCDNicService.getTestVCDNetworkSettings(), '00:00:00:00:10');
        expect(nicObject.TestSettings.VCDNetworkSettings.NewMacAddress.MacAddress).toEqual('00:00:00:00:10');

    });

    it('should set the ip mode type', function () {
        editVCDNicService.init(selectedNics);
        var nicObject = editVCDNicService.getNicObject();
        nicObject.FailoverSettings.VCDNetworkSettings.NicInfo.IpAddress = '10.0.0.1';
        editVCDNicService.setIPModeType(editVCDNicService.getFailoverVCDNetworkSettings(), enums.VCDNetworkIpMode_VCDNetworkIpModeType.Manual);
        expect(nicObject.FailoverSettings.VCDNetworkSettings.NicInfo.IPMode.IpModeType).toEqual(enums.VCDNetworkIpMode_VCDNetworkIpModeType.Manual);

        editVCDNicService.setIPModeType(editVCDNicService.getTestVCDNetworkSettings(), enums.VCDNetworkIpMode_VCDNetworkIpModeType.IPPool);
        expect(nicObject.TestSettings.VCDNetworkSettings.NicInfo.IPMode.IpModeType).toEqual(enums.VCDNetworkIpMode_VCDNetworkIpModeType.IPPool);
        expect(nicObject.TestSettings.VCDNetworkSettings.NicInfo.IpAddress).toBeNull();

    });

    it('should set the ip address', function () {
        editVCDNicService.init(selectedNics);
        var nicObject = editVCDNicService.getNicObject();
        editVCDNicService.setIPAddress(editVCDNicService.getFailoverVCDNetworkSettings(), '10.0.0.1');
        expect(nicObject.FailoverSettings.VCDNetworkSettings.NicInfo.IpAddress).toEqual('10.0.0.1');

        editVCDNicService.setIPAddress(editVCDNicService.getTestVCDNetworkSettings(), '10.0.0.2');
        expect(nicObject.TestSettings.VCDNetworkSettings.NicInfo.IpAddress).toEqual('10.0.0.2');
    });


});
