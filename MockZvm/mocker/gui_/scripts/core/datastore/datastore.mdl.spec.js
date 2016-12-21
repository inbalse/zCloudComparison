'use strict';

describe('Datastore Model', function () {
    var model;
    var template = {
        'StorageResourceNodes|20-30': [{
            'AlertStatusVisualObject': {},
            'AlertTip': {},
            'ConnectedVRAs|0-12': 2,
            'DatastoreAvailabilityStatusVisualObject': {},
            'DatastoreConsumptionInGB|1024-123123123': 1024,
            'DatastoreTotalCapacityInGb|123123123-123993123': 1024,
            'Device': '@first',
            'DisplayName': '@name',
            'IncomingVMs|0-12': 2,
            'JournalVolsSizeInGB|1024-123123123': 1024,
            'NodeType|0-1': 0,
            'ProtectedVMs|0-12': 2,
            'RecoveryVolsSizeInGB|1024-123123123': 1024,
            'TypeOfDatastore': 'type1',
            'UsedByZerto|1': true,
            'ZertoConsumptionInGB|1024-123123123': 1024,
            'children': null
        }]
    };
    var data = Mock.mock(template);

    beforeEach(module('zvmTest'));

    beforeEach(inject(function(datastoreModel){
        model = datastoreModel;
    }));

    it("should process the data and make a new properties", function(){
        var result = model._processData(data);

        expect(result.length).not.toBe(0);

        if (result[0].NodeType !== 1) {
            expect(result[0].TotalUsage.percent).toEqual(result[0].TotalUsage.value / result[0].TotalUsage.capacity * 100);
        } else {
            expect(result[0].TotalUsage.percent).toEqual('');
        }
    });

    it('should remove items that are not used by zerto', function () {
        model.showByZerto(true);
        var result = _.where(model._processData(data), {'UsedByZerto': false});

        expect(result.length).toBe(0);
    });

    it('should add back items that are not used by zerto', function () {
        model.showByZerto(false);
        var result = _.where(model._processData(data), {'UsedByZerto': false});

        expect(result.length).not.toBe(0);
    });
});
