'use strict';

describe('Alerts list model', function () {
    var testScope, alertsListModel;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($injector, $rootScope, _alertsListModel_) {
        testScope = $rootScope.$new();
        alertsListModel = _alertsListModel_;

    }));

    function mockData() {
        var d = new Date(2014, 6, 22, 10, 30, 20, 0);
        var alerts = {
            "Alerts": [{
                'AffectedOrgs': [{
                    'Name': 'Zorg',
                    'Id': {
                        "Guid": "71ff6cd0-0cb9-4cce-aed6-5cc05f8fe378"
                    }
                }, {
                    'Name': 'Microsoft',
                    'Id': {
                        "Guid": "71ff6cd0-0cb9-4cce-aed6-5cc05f8fe379"
                    }
                }],
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
                "StartTime": d
            }]
        };

        return alerts;
    }

    it("should check function defined", function () {
        var result = alertsListModel.processData(mockData());
        expect(result[0].Zorgs).toEqual('Zorg, Microsoft');
    });
});
