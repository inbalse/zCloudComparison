'use strict';

describe('VRA edit controller', function () {
    var controller, testScope, zertoServiceFactory, enums, vos, testVraEditFactory, zAlertFactory;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($injector, $controller, $rootScope, _zertoServiceFactory_, _zAlertFactory_, _enums_, _vos_, $compile, _vraEditFactory_) {
        testScope = $rootScope.$new();

        zertoServiceFactory = _zertoServiceFactory_;
        enums = _enums_;
        vos = _vos_;

        /// --- mock data ----

        testVraEditFactory = _vraEditFactory_;
        zAlertFactory = _zAlertFactory_;

        testVraEditFactory.selectedVra = createVraSelectedMock();

        testScope.mockEventTargetWarnOk = { target: { name: 'MODAL.OK' }};
        testScope.mockEventTargetWarnCancel = { target: { name: 'MODAL.CANCEL'}};

        controller = $controller('vraEditController', {$scope: testScope, vraEditFactory: testVraEditFactory,
            zertoServiceFactory: zertoServiceFactory, enums: enums, vos: vos, zAlertFactory: zAlertFactory});

        testScope.setEditParameters();
    }));

    function createVraSelectedMock() {
        return {
            "VraInfo":{
                "HostInfo":{
                    "BaseComputeResourceIdentifier":{
                        "InternalName":"host-643",
                        "Type":0,
                        "ServerIdentifier":{
                            "ServerGuid":"09d0d3b4-78d0-47c1-ad38-d01887e6d589"
                        }
                    },
                    "ResourcePoolIdentifier": null,
                    "DisplayName":"172.20.200.2"
                },
                "VraInfo": {
                    "IpConfiguration": {
                        "Ip": "127.0.0.1",
                        "NetMask": "255.255.255.255",
                        "DefaultGw": "100.0.0.1"
                    },
                    "IsDhcpConf": false,
                    "BandwidthGroup": "default_group",
                    "InstalledUsingSshKey": false
                },
                "Version":{
                    "Version":"5.5",
                    "Build":"1331820",
                    "HostCredentialRequired": true,
                    "VibSupported": true
                }
            },
            "DisplayName":"172.20.200.2",
            "installedUsingSshKey": false
        };
    }

    it("should have user interaction funciton defined", function () {
        expect(testScope.save).toBeDefined();
        expect(testScope.close).toBeDefined();
        expect(testScope.cancel).toBeDefined();
        expect(testScope._handleWarnModalClick).toBeDefined();
    });

    it("should check properties defined", function () {
        expect(testScope.loading).toBeDefined();
        expect(testScope.forms).toBeDefined();
        expect(testScope.vraEditObject).toBeDefined();
        expect(testScope.networkTypes).toBeDefined();
        expect(testScope.buttons).toBeDefined();
    });

    it('should have click save handler', function () {
        spyOn(zAlertFactory, 'warn');
        testScope.save();
        expect(zAlertFactory.warn).toHaveBeenCalled();
    });

    it("should have cancel and submit handlers for the buttons", function () {
        expect(testScope.buttons[1].handler).toEqual(testScope.save);
        expect(testScope.buttons[0].handler).toEqual(testScope.cancel);
    });

    it("should call the install function and call the installVra function", function () {
        spyOn(testScope, 'getHostIdentifier');
        spyOn(testScope, 'getVraIpConf');
        testScope._handleWarnModalClick(testScope.mockEventTargetWarnOk);
        expect(testScope.getHostIdentifier).toHaveBeenCalled();
        expect(testScope.getVraIpConf).toHaveBeenCalled();
    });

    it('should have click cancel in warn alert modal handler', function () {
        spyOn(zertoServiceFactory, 'ChangeVraSettings');
        testScope._handleWarnModalClick(testScope.mockEventTargetWarnCancel);
        expect(testScope.mockEventTargetWarnCancel.target.name).toEqual('MODAL.CANCEL');
        expect(zertoServiceFactory.ChangeVraSettings).not.toHaveBeenCalled();
    });

    it("should set all the edit parameters", function () {
        expect(testScope.vraEditObject.host).toEqual('172.20.200.2');
        expect(testScope.vraEditObject.vraGroup).toEqual('default_group');
        expect(testScope.vraEditObject.networkType).toEqual('1');
        expect(testScope.isNetworkDisabled).toBeFalsy();
    });

    it("should check the getVraIpConf function" , function() {
        var result = testScope.getVraIpConf(testScope.vraEditObject);
        expect(result.DefaultGw).toEqual('100.0.0.1');
        expect(result.Ip).toEqual('127.0.0.1');
        expect(result.NetMask).toEqual('255.255.255.255');
    });

    it("should check ChangeVraSettings function parameters", function () {
        testScope.vraEditObject.password = '123456';
        spyOn(zertoServiceFactory, 'ChangeVraSettings').and.callThrough();
        testScope._handleWarnModalClick(testScope.mockEventTargetWarnOk);
        expect(zertoServiceFactory.ChangeVraSettings).toHaveBeenCalledWith(
            testScope.getHostIdentifier(),
            testScope.getVraIpConf(testScope.vraEditObject),
            '123456',
            'default_group',
            false
        );
    });
});
