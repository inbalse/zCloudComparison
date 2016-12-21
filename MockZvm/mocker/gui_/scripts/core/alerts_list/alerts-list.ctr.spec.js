'use strict';

describe('Alerts list controller', function () {
    var controller, testScope, trans, siteSettingsFactory, globalStateModel;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_globalStateModel_) {
        globalStateModel = _globalStateModel_;
        globalStateModel.data = {
            VirtualizationProviderType: 0
        };
    }));

    beforeEach(inject(function ($injector, $controller, $rootScope, _siteSettingsFactory_) {
        testScope = $rootScope.$new();
        siteSettingsFactory= _siteSettingsFactory_;
        testScope.translations = {};

        trans = {
            instant: function (text) {
                return text;
            }
        };
        controller = $controller('alertsListController', {$scope: testScope, siteSettingsFactory: siteSettingsFactory});
    }));

    function createMock() {
        var alerts = {
            "Alerts": [{
                'AffectedOrgs': [{
                    'Name': 'Zorg',
                    'Id': {"Guid": "71ff6cd0-0cb9-4cce-aed6-5cc05f8fe378"}
                }, {'Name': 'Microsoft', 'Id': {"Guid": "71ff6cd0-0cb9-4cce-aed6-5cc05f8fe379"}}],
                "AlertEntity": "VRA",
                "Description": "VRA on host 172.20.200.2 is powered off.",
                "Entities": [{
                    "Identifier": {"GroupGuid": "ac094959-25a6-466c-937d-9ebe5fa9901a"},
                    "Name": "New VPG",
                    "SampleVM": {
                        "InternalVmName": "vm-221",
                        "ServerIdentifier": {"ServerGuid": "09d0d3b4-78d0-47c1-ad38-d01887e6d589"}
                    },
                    "Direction": 2
                }],
                "HelpId": "VRA0028",
                "Id": "29b96f17-8f5a-4d19-83db-c503f44d96a3",
                "IsDismissed": false,
                "Level": 1,
                "SiteName": "Unconfigured site name",
                "StartTime": new Date('2014-07-22 10:30:20')
            }]
        };

        return alerts;
    }

    it("should show data as empty", function () {
        expect(testScope.data).toBeUndefined();
    });

    it("should check grid definitions", function () {
        expect(testScope.customOptions).toBeDefined();
    });

    it("should check init properties", function () {
        expect(testScope.selectedItems).toBeDefined();
        expect(testScope.isDismissEnabled).toBeFalsy();
        expect(testScope.isResetEnabled).toBeFalsy();
        expect(testScope.acknowledge).toBeDefined();
        expect(testScope.reset).toBeDefined();
        expect(testScope.exportAlerts).toBeDefined();
    });

});
