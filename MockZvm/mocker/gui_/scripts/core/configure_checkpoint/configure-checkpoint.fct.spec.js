/**
 * Not created by evgeny.rivkin on 8/11/2016.
 */
describe('configureCheckpointFactory', function () {
    var configureCheckpointFactory, configureCheckpointCons, zertoServiceFactory, filter;
    var statsCheckpoints = {
        LatestCheckpoint: {
            "Identifier": {
                "Identifier": 1866
            },
            "TimeStamp": "2016-11-17T07:32:36.000Z",
            "Tag": null,
            "Vss": false
        },
        EarliestCheckpoint: {
            "Identifier": {
                "Identifier": 44052
            },
            "TimeStamp": "2016-11-13T14:37:17.000Z",
            "Tag": null,
            "Vss": false
        }
    };
    var checkpoints = [
        {
            "Identifier": {
                "Identifier": 44124
            },
            "TimeStamp": "2016-11-17T07:38:37.000Z",
            "Tag": null,
            "Vss": false
        },
        {
            "Identifier": {
                "Identifier": 44123
            },
            "TimeStamp": "2016-11-17T07:38:32.000Z",
            "Tag": null,
            "Vss": false
        },
        {
            "Identifier": {
                "Identifier": 44122
            },
            "TimeStamp": "2016-11-17T07:38:27.000Z",
            "Tag": null,
            "Vss": false
        },
        {
            "Identifier": {
                "Identifier": 44121
            },
            "TimeStamp": "2016-11-17T07:38:22.000Z",
            "Tag": null,
            "Vss": false
        },
        {
            "Identifier": {
                "Identifier": 44120
            },
            "TimeStamp": "2016-11-17T07:38:17.000Z",
            "Tag": null,
            "Vss": false
        }
    ];

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_configureCheckpointFactory_, _configureCheckpointCons_, _zertoServiceFactory_, $filter) {
        configureCheckpointFactory = _configureCheckpointFactory_;
        configureCheckpointCons = _configureCheckpointCons_;
        zertoServiceFactory = _zertoServiceFactory_;
        filter = $filter;
        spyOn(zertoServiceFactory, 'GetVPGCheckpointsStats').and.callFake(function () {
            return {
                then: function (cb) {
                    cb(angular.copy(statsCheckpoints));
                }
            };
        });
    }));

    it('should open a wizard with vpgId and call for GetVPGCheckpointsStats', function () {
        var vpgId = '123';
        configureCheckpointFactory.open(vpgId);
        expect(zertoServiceFactory.GetVPGCheckpointsStats).toHaveBeenCalledWith(vpgId);
    });

    it('should refresh checkpoints with date', function () {
        spyOn(zertoServiceFactory, 'GetExtendedCheckpointList').and.callThrough();
        spyOn(configureCheckpointFactory, '_getStartEndDate').and.callThrough();
        configureCheckpointFactory.vpgId = '123';
        var range = {
            startDate: new Date(),
            endDate: new Date()
        };

        configureCheckpointFactory.refresh(range);
        var dateSpan = configureCheckpointFactory._getStartEndDate(range.startDate, range.endDate);
        expect(configureCheckpointFactory._getStartEndDate).toHaveBeenCalledWith(range.startDate, range.endDate);
        expect(zertoServiceFactory.GetExtendedCheckpointList).toHaveBeenCalledWith(configureCheckpointFactory.vpgId,
            dateSpan.startDate, dateSpan.endDate);
    });

    it('should create timeObjects on checkpoints', function () {

        function testCheckpointObject(item) {
            if (item.Vss) {
                expect(item.type).toEqual(configureCheckpointCons.VSS);
                item.type = configureCheckpointCons.VSS;
            } else if (item.Tag) {
                expect(item.type).toEqual(configureCheckpointCons.USER);
            } else {
                expect(item.type).toEqual(configureCheckpointCons.AUTO);
            }

            expect(item.id).toEqual(item.Identifier.Identifier);
            expect(item.timeObj).toEqual({
                display: filter('zDateFilter')(item.TimeStamp),
                value: item.type,
                filterValue: item.TimeStamp
            });
        }

        var result = configureCheckpointFactory._changeData(checkpoints);
        result.forEach(function (item) {
            testCheckpointObject(item);
        });

        expect(result).toEqual([
            {
                "Identifier": {
                    "Identifier": 44124
                },
                "TimeStamp": "2016-11-17T07:38:37.000Z",
                "Tag": null,
                "Vss": false,
                "type": "auto",
                "timeObj": {
                    "display": "Nov 17, 2016 09:38:37",
                    "value": "auto",
                    "filterValue": "2016-11-17T07:38:37.000Z"
                },
                "id": 44124
            },
            {
                "Identifier": {
                    "Identifier": 44123
                },
                "TimeStamp": "2016-11-17T07:38:32.000Z",
                "Tag": null,
                "Vss": false,
                "type": "auto",
                "timeObj": {
                    "display": "Nov 17, 2016 09:38:32",
                    "value": "auto",
                    "filterValue": "2016-11-17T07:38:32.000Z"
                },
                "id": 44123
            },
            {
                "Identifier": {
                    "Identifier": 44122
                },
                "TimeStamp": "2016-11-17T07:38:27.000Z",
                "Tag": null,
                "Vss": false,
                "type": "auto",
                "timeObj": {
                    "display": "Nov 17, 2016 09:38:27",
                    "value": "auto",
                    "filterValue": "2016-11-17T07:38:27.000Z"
                },
                "id": 44122
            },
            {
                "Identifier": {
                    "Identifier": 44121
                },
                "TimeStamp": "2016-11-17T07:38:22.000Z",
                "Tag": null,
                "Vss": false,
                "type": "auto",
                "timeObj": {
                    "display": "Nov 17, 2016 09:38:22",
                    "value": "auto",
                    "filterValue": "2016-11-17T07:38:22.000Z"
                },
                "id": 44121
            },
            {
                "Identifier": {
                    "Identifier": 44120
                },
                "TimeStamp": "2016-11-17T07:38:17.000Z",
                "Tag": null,
                "Vss": false,
                "type": "auto",
                "timeObj": {
                    "display": "Nov 17, 2016 09:38:17",
                    "value": "auto",
                    "filterValue": "2016-11-17T07:38:17.000Z"
                },
                "id": 44120
            }
        ]);

    });

    it('should close the popup', function () {
        configureCheckpointFactory.open();
        spyOn(configureCheckpointFactory.deferred, 'reject');
        spyOn(configureCheckpointFactory, '_clear');
        configureCheckpointFactory.close();
        expect(configureCheckpointFactory.deferred.reject).toHaveBeenCalledWith(null);
        expect(configureCheckpointFactory._clear).toHaveBeenCalled();
    });

    it('should save the popup result', function () {
        var checkpoint = {a: 1};
        configureCheckpointFactory.open();
        spyOn(configureCheckpointFactory.deferred, 'resolve');
        spyOn(configureCheckpointFactory, '_clear');
        configureCheckpointFactory.save(checkpoint);
        expect(configureCheckpointFactory.deferred.resolve).toHaveBeenCalledWith(checkpoint);
        expect(configureCheckpointFactory._clear).toHaveBeenCalled();
    });

    it('should clear the popup', function () {
        configureCheckpointFactory.modalInstance = {
            dismiss: angular.noop
        };
        configureCheckpointFactory.open();
        spyOn(configureCheckpointFactory.modalInstance, 'dismiss');
        configureCheckpointFactory._clear();
        expect(configureCheckpointFactory.modalInstance.dismiss).toHaveBeenCalledWith('close');
        expect(configureCheckpointFactory.vpgId).toBe(null);
    });

    it('should check if edge checkpoint is the same date', function () {
        configureCheckpointFactory.open();
        var result = configureCheckpointFactory.isOneDate();
        expect(result).toBeFalsy();
        var temp = statsCheckpoints.EarliestCheckpoint;
        statsCheckpoints.EarliestCheckpoint = angular.copy(statsCheckpoints.LatestCheckpoint);
        configureCheckpointFactory.open();
        result = configureCheckpointFactory.isOneDate();
        expect(result).toBeTruthy();
        statsCheckpoints.EarliestCheckpoint = temp;
    });

    it('should return start and end date', function () {
        var result = configureCheckpointFactory._getStartEndDate(configureCheckpointFactory.getLatestCheckpointDate(),
            configureCheckpointFactory.getLatestCheckpointDate());

        expect(result).toEqual({
            startDate: new Date("2016-11-16T22:00:00.000Z"),
            endDate: new Date("2016-11-17T21:59:59.999Z")
        });
    });

    it('should get the earliest timestamp', function () {
        configureCheckpointFactory.open();
        var result = configureCheckpointFactory.getEarliestCheckpointDate();
        expect(result).toEqual('2016-11-13T14:37:17.000Z');
    });

    it('should get the latest timestamp', function () {
        configureCheckpointFactory.open();
        var result = configureCheckpointFactory.getLatestCheckpointDate();
        expect(result).toEqual('2016-11-17T07:32:36.000Z');
    });

    it('should get the latest checkpoint date span', function () {
        var result = configureCheckpointFactory.getLatestCheckpointDateSpan();
        expect(result).toEqual({
            startDate: moment(statsCheckpoints.LatestCheckpoint.TimeStamp).startOf('day').toDate(),
            endDate: moment(statsCheckpoints.LatestCheckpoint.TimeStamp).endOf('day').toDate()
        });
    });
});
