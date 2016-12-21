'use strict';

describe('vra list model', function () {
    var vraListModel, enums, rootScope;
    beforeEach(function () {
        module('zvmTest');

        inject(function ($rootScope, _vraListModel_, _enums_) {
            rootScope = $rootScope;
            vraListModel = _vraListModel_;
            enums = _enums_;
        });

    });

    it('should contain all needed functions', function () {
        expect(vraListModel._generateVRAAddress).toBeDefined();
        expect(vraListModel._generateVRAVersion).toBeDefined();
        expect(vraListModel._calculate).toBeDefined();
        expect(vraListModel._isVersionNA).toBeDefined();
        expect(vraListModel._processData).toBeDefined();
    });

    it('should _generateVRAAddress properly', function () {
        var testStr = vraListModel._generateVRAAddress({VraInfo: {IpConfiguration: {Ip: 'testIp'}}});
        expect(testStr).toEqual('testIp');
        testStr = vraListModel._generateVRAAddress({VraInfo: {IpConfiguration: null}});
        expect(testStr).toEqual('');
    });

    it('should _generateVRAVersion properly', function () {
        var testStr = vraListModel._generateVRAVersion({State: {Status: 5}});
        expect(testStr).toEqual('VRA_LIST.STATES_MAP.NA');
        var testStr = vraListModel._generateVRAVersion({State: {Status: 4}});
        expect(testStr).toEqual('');
        var testStr = vraListModel._generateVRAVersion({State: {Status: 1, UpgradeStatus: 0}});
        expect(testStr).toEqual('VRA_LIST.STATES_MAP.0');
    });

    it('should _calculate properly', function () {
        var VraInfo = {
            ProtectedCounters: {Vpgs: 1, Vms: 2, Volumes: 4},
            RecoveryCounters: {Vpgs: 5, Vms: 6, Volumes: 7},
            SelfProtectedVpgs: 1
        };

        var total = vraListModel._calculate(VraInfo, 'VPGs');
        expect(total).toEqual(5);
        total = vraListModel._calculate(VraInfo, 'VMs');
        expect(total).toEqual(8);
        total = vraListModel._calculate(VraInfo, 'Volumes');
        expect(total).toEqual(11);
    });

    it('should properly return NA ', function () {
        expect(vraListModel._isVersionNA(enums.VraStatusVisual.NotInstalled)).toBeTruthy();
        expect(vraListModel._isVersionNA(enums.VraStatusVisual.Installing)).toBeTruthy();
        expect(vraListModel._isVersionNA(enums.VraStatusVisual.InstallationError)).toBeTruthy();
        expect(vraListModel._isVersionNA('any other')).toBeFalsy();
    });

    it('should not fail on orphaned hosts', function () {
        var data = {
            "VraListTree": {
                "NodeType": 0,
                "DisplayName": "Root",
                "children": [
                    {
                        "NodeType": 3,
                        "DisplayName": "bk4bl15.zertolab.local",
                        "children": [
                        ],
                        "VraInfo": null,
                        "HostVersion": {
                            "Version": "6.3",
                            "Build": "dummy_build",
                            "HostCredentialRequired": false
                        },
                        "Selected": false
                    }
                ],
                "VraInfo": null,
                "HostVersion": null,
                "Selected": false
            },
            "CanInstallAdditionalVras": true,
            "LatestVraVersion": "4.0 Build 040005065",
            "EnableManageVras": true
        };

        vraListModel._processData(data);
    })
});
