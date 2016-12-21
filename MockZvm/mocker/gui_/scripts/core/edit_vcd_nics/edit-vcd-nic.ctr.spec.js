'use strict';

 describe('Edit nics vcd dialog controller', function () {
    var nicVCDEditController, editVCDNicService, vpgService, scope, selectedNics, foSettings, enums, fotSettings;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($injector, $controller, $rootScope, _editVCDNicService_, _enums_, _vpgService_) {
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
                        "MacAddress": "00:50:56:83:7a:4e",
                        "IsPrimary": true,
                        "IsConnected": false,
                        "IPMode": {
                            "IpModeType": 2
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
                            "MacAddress": "00:50:56:83:7a:4e",
                            "IsPrimary": true,
                            "IsConnected": false,
                            "IPMode": {
                                "IpModeType": 0
                            },
                            "VappNetworkName": "VM Network",
                            "IpAddress": null
                        },
                        "NewMacAddress": {
                            "MacAddress": "00:50:56:83:7a:4e"
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
                            "MacAddress": "00:50:56:83:7a:4e",
                            "IsPrimary": true,
                            "IsConnected": false,
                            "IPMode": {
                                "IpModeType": 0
                            },
                            "VappNetworkName": "VM Network",
                            "IpAddress": null
                        },
                        "NewMacAddress": {
                            "MacAddress": "00:50:56:83:7a:4e"
                        }
                    }
                },
                "IsIPConfigurationEnabled": false,
                "MacAddress": "00:50:56:83:7a:4e",
                "vmId": {
                    "InternalVmName": "vm-466",
                    "ServerIdentifier": {
                        "ServerGuid": "56cbb915-4a13-45e4-849b-55fbff19d92f"
                    }
                },
                "id": "vm-46600:50:56:83:7a:4e",
                "vmName": "diskBox (9b3ab8f0-26e9-47f4-a560-10fc2d5f77fe)",
                "index": 2,
                "FailoverNetwork": "VM Network",
                "TestNetwork": "VM Network",
                "FailoverConnected": false,
                "TestConnected": false,
                "FailoverPrimary": true,
                "TestPrimary": true,
                "FailoverIp": "IP Pool",
                "TestIP": "IP Pool",
                "TestMac": "00:50:56:83:7a:4e",
                "FailoverMac": "00:50:56:83:7a:4e",
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
                        "MacAddress": "00:50:56:83:21:67",
                        "IsPrimary": true,
                        "IsConnected": true,
                        "IPMode": {
                            "IpModeType": 2
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
                            "MacAddress": "00:50:56:83:21:67",
                            "IsPrimary": true,
                            "IsConnected": true,
                            "IPMode": {
                                "IpModeType": 0
                            },
                            "VappNetworkName": "VM Network",
                            "IpAddress": null
                        },
                        "NewMacAddress": {
                            "MacAddress": "00:50:56:83:21:67"
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
                            "MacAddress": "00:50:56:83:21:67",
                            "IsPrimary": true,
                            "IsConnected": true,
                            "IPMode": {
                                "IpModeType": 0
                            },
                            "VappNetworkName": "VM Network",
                            "IpAddress": null
                        },
                        "NewMacAddress": {
                            "MacAddress": "00:50:56:83:21:67"
                        }
                    }
                },
                "IsIPConfigurationEnabled": false,
                "MacAddress": "00:50:56:83:21:67",
                "vmId": {
                    "InternalVmName": "vm-474",
                    "ServerIdentifier": {
                        "ServerGuid": "56cbb915-4a13-45e4-849b-55fbff19d92f"
                    }
                },
                "id": "vm-47400:50:56:83:21:67",
                "vmName": "SD6 (e8f8b0cd-200c-4330-842e-07717f0349bb)",
                "index": 1,
                "FailoverNetwork": "VM Network",
                "TestNetwork": "VM Network",
                "FailoverConnected": true,
                "TestConnected": true,
                "FailoverPrimary": true,
                "TestPrimary": true,
                "FailoverIp": "IP Pool",
                "TestIP": "IP Pool",
                "TestMac": "00:50:56:83:21:67",
                "FailoverMac": "00:50:56:83:21:67",
                "nicName": "Network adapter 1"
            }
        ];
        editVCDNicService = _editVCDNicService_;
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
        scope = $rootScope.$new(true);
        spyOn(editVCDNicService, 'init').and.callThrough();

        nicVCDEditController = $controller('nicVCDEditController', {
            $scope: scope,
            editVCDNicService: _editVCDNicService_,
            selectedNics: selectedNics
        });

        foSettings = editVCDNicService.getFailoverVCDNetworkSettings();
        fotSettings = editVCDNicService.getTestVCDNetworkSettings();
    }));


    it('should init the controller', function () {
        expect(scope.data.failoverSettings).toBeDefined();
        expect(scope.data.testSettings).toBeDefined();
        expect(editVCDNicService.init).toHaveBeenCalledWith(selectedNics);
    });

    it('should init the view', function () {
        expect(typeof scope.data.isBulk).toEqual('boolean');
        expect(typeof scope.data.showNetworksSelection).toEqual('boolean');
        expect(typeof scope.data.isIPConfigurationEnabled).toEqual('boolean');
        expect(scope.data.macFailoverAddressList).toBeArray();
        expect(scope.data.macTestAddressList).toBeArray();
        expect(scope.data.changeVnicIPConfList).toBeArray();
        expect(scope.data.buttons).toBeArray();
        expect(scope.data.networksList).toBeArray();
    });

    it("should copy to failover live", function () {
        spyOn(editVCDNicService, 'copyToFOT');
        scope.data.failoverSettings = {
            "vAppNetworkName": "2",
            "IpModeType": 1,
            "ipAddress": '0.0.0.0',
            "macAddress": '00:00:00:00:00',
            "isIpConfigEnabled": false
        };
        scope.copyToFot();

        expect(editVCDNicService.copyToFOT).toHaveBeenCalled();
        expect(scope.data.testSettings.vAppNetworkName).toEqual(scope.data.failoverSettings.vAppNetworkName);
        expect(scope.data.testSettings.IpModeType).toEqual(scope.data.failoverSettings.IpModeType);
        expect(scope.data.testSettings.ipAddress).toEqual(scope.data.failoverSettings.ipAddress);
        expect(scope.data.testSettings.macAddress).toEqual(scope.data.failoverSettings.macAddress);
        expect(scope.data.testSettings.isIpConfigEnabled).toEqual(scope.data.failoverSettings.isIpConfigEnabled);
    });

    it("should copy to failover test", function () {
        spyOn(editVCDNicService, 'copyToFO');
        scope.data.testSettings = {
            "vAppNetworkName": "2",
            "IpModeType": 1,
            "ipAddress": '0.0.0.0',
            "macAddress": '00:00:00:00:00',
            "isIpConfigEnabled": false
        };
        scope.copyToFo();

        expect(editVCDNicService.copyToFO).toHaveBeenCalled();
        expect(scope.data.failoverSettings.vAppNetworkName).toEqual(scope.data.testSettings.vAppNetworkName);
        expect(scope.data.failoverSettings.IpModeType).toEqual(scope.data.testSettings.IpModeType);
        expect(scope.data.failoverSettings.ipAddress).toEqual(scope.data.testSettings.ipAddress);
        expect(scope.data.failoverSettings.macAddress).toEqual(scope.data.testSettings.macAddress);
        expect(scope.data.failoverSettings.isIpConfigEnabled).toEqual(scope.data.testSettings.isIpConfigEnabled);
    });

    it('should handle vApp name network change', function () {
        spyOn(editVCDNicService, 'setVAppNetworkName');
        scope.data.failoverSettings.vAppNetworkName = {dummy: 1};
        scope.data.testSettings.vAppNetworkName = {dummy: 2};
        scope.onFailoverVAppNetworkNameChange();
        scope.onTestVAppNetworkNameChange();

        expect(editVCDNicService.setVAppNetworkName).toHaveBeenCalledWith(foSettings, {dummy: 1});
        expect(editVCDNicService.setVAppNetworkName).toHaveBeenCalledWith(fotSettings, {dummy: 2});
        expect(editVCDNicService.setVAppNetworkName).toHaveBeenCalledTimes(2);
    });

    it('should handle mac address change', function () {
        spyOn(editVCDNicService, 'setMACAddress');
        scope.data.failoverSettings.macAddress = {dummy: 1};
        scope.data.testSettings.macAddress = {dummy: 2};
        scope.onFailoverMacAddressChange();
        scope.onTestMacAddressChange();

        expect(editVCDNicService.setMACAddress).toHaveBeenCalledWith(foSettings, {dummy: 1});
        expect(editVCDNicService.setMACAddress).toHaveBeenCalledWith(fotSettings, {dummy: 2});
        expect(editVCDNicService.setMACAddress).toHaveBeenCalledTimes(2);
    });

    it('should handle ip mode type change', function () {
        spyOn(editVCDNicService, 'setIPModeType');
        scope.data.failoverSettings.IpModeType = enums.VCDNetworkIpMode_VCDNetworkIpModeType.Manual;
        scope.data.testSettings.IpModeType = enums.VCDNetworkIpMode_VCDNetworkIpModeType.IPPool;
        scope.onFailoverIpModeTypeChange();
        scope.onTestIpModeTypeChange();
        expect(scope.data.failoverSettings.isIpConfigEnabled).toBeTruthy();
        expect(scope.data.testSettings.isIpConfigEnabled).toBeFalsy();

        expect(editVCDNicService.setIPModeType).toHaveBeenCalledTimes(2);
        expect(editVCDNicService.setIPModeType).toHaveBeenCalledWith(editVCDNicService.getFailoverVCDNetworkSettings(),
            enums.VCDNetworkIpMode_VCDNetworkIpModeType.Manual);
        expect(editVCDNicService.setIPModeType).toHaveBeenCalledWith(editVCDNicService.getTestVCDNetworkSettings(),
            enums.VCDNetworkIpMode_VCDNetworkIpModeType.IPPool);

    });


    it('should handle ip address change', function () {
        spyOn(editVCDNicService, 'setIPAddress');
        scope.data.failoverSettings.ipAddress = {dummy: 1};
        scope.data.testSettings.ipAddress = {dummy: 2};
        scope.onFailoverIpAddressChange();
        scope.onTestIpAddressChange();

        expect(editVCDNicService.setIPAddress).toHaveBeenCalledWith(foSettings, {dummy: 1});
        expect(editVCDNicService.setIPAddress).toHaveBeenCalledWith(fotSettings, {dummy: 2});
        expect(editVCDNicService.setIPAddress).toHaveBeenCalledTimes(2);
    });


    it('should close the modal', function () {
        spyOn(editVCDNicService, 'close');
        scope.close();
        expect(editVCDNicService.close).toHaveBeenCalled();
    });

    it('should check if failover ip is configurable', function () {
        var result;

        scope.data.failoverSettings.isIpConfigEnabled = true;
        scope.data.isIPConfigurationEnabled = true;
        result = scope.isIPConfigurationAndFailoverIpConfigEnabled();
        expect(result).toBeTruthy();

        scope.data.failoverSettings.isIpConfigEnabled = false;
        scope.data.isIPConfigurationEnabled = false;
        result = scope.isIPConfigurationAndFailoverIpConfigEnabled();
        expect(result).toBeFalsy();

        scope.data.failoverSettings.isIpConfigEnabled = false;
        scope.data.isIPConfigurationEnabled = true;
        result = scope.isIPConfigurationAndFailoverIpConfigEnabled();
        expect(result).toBeFalsy();

        scope.data.failoverSettings.isIpConfigEnabled = true;
        scope.data.isIPConfigurationEnabled = false;
        result = scope.isIPConfigurationAndFailoverIpConfigEnabled();
        expect(result).toBeFalsy();
    });

    it('should check if test ip is configurable', function () {
        var result;
        scope.data.testSettings.isIpConfigEnabled = true;
        scope.data.isIPConfigurationEnabled = true;
        result = scope.isIPConfigurationAndTestIpConfigEnabled();
        expect(result).toBeTruthy();

        scope.data.testSettings.isIpConfigEnabled = false;
        scope.data.isIPConfigurationEnabled = false;
        result = scope.isIPConfigurationAndTestIpConfigEnabled();
        expect(result).toBeFalsy();

        scope.data.testSettings.isIpConfigEnabled = false;
        scope.data.isIPConfigurationEnabled = true;
        result = scope.isIPConfigurationAndTestIpConfigEnabled();
        expect(result).toBeFalsy();

        scope.data.testSettings.isIpConfigEnabled = true;
        scope.data.isIPConfigurationEnabled = false;
        result = scope.isIPConfigurationAndTestIpConfigEnabled();
        expect(result).toBeFalsy();
    });

    it('should get the potential networks', function () {
        var result = editVCDNicService.getPotentialNetworks();
        expect(result).toEqual([
            {dummy: 1},
            {dummy: 2},
            {dummy: 3}
        ]);
    });
});
