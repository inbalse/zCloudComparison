describe('flrWizardRestorepointModel', function () {
    var flrWizardRestorepointModel, vpgApi, flrCheckpointTypes, zAlertFactory, component, $componentController, scope;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($rootScope, _flrWizardRestorepointModel_, _vpgApi_, _flrCheckpointTypes_, _zAlertFactory_, _$componentController_) {
        flrWizardRestorepointModel = _flrWizardRestorepointModel_;
        vpgApi = _vpgApi_;
        flrCheckpointTypes = _flrCheckpointTypes_;
        zAlertFactory = _zAlertFactory_;
        $componentController = _$componentController_;
        scope = $rootScope.$new();
        component = $componentController('busyOverlay', {$scope: scope});
        flrWizardRestorepointModel.model.data = [
            {type: flrCheckpointTypes.Auto},
            {type: flrCheckpointTypes.Auto},
            {type: flrCheckpointTypes.Auto},
            {type: flrCheckpointTypes.Auto},
            {type: flrCheckpointTypes.User},
            {type: flrCheckpointTypes.User},
            {type: flrCheckpointTypes.User},
            {type: flrCheckpointTypes.Vss},
            {type: flrCheckpointTypes.Vss},
            {type: flrCheckpointTypes.Offsite}
        ];
    }));


    describe('flrWizardRestorepointModel public functions testing', function () {
        it('should expose defined variables', function () {
            expect(flrWizardRestorepointModel.init).toBeDefined();
            expect(flrWizardRestorepointModel.model).toBeDefined();
            expect(flrWizardRestorepointModel.validate).toBeDefined();
            expect(flrWizardRestorepointModel.filter).toBeDefined();
        });

        it('should call zerto service on init', function () {
            spyOn(vpgApi, 'GetVPGCheckpointsStats').and.callThrough();
            flrWizardRestorepointModel.init('test');
            expect(vpgApi.GetVPGCheckpointsStats).toHaveBeenCalledWith('test');
        });

        it('should return validity state for model', function () {
            expect(flrWizardRestorepointModel.validate()).toBeFalsy();
            flrWizardRestorepointModel.model.selectedItems = [{}];
            expect(flrWizardRestorepointModel.validate()).toBeTruthy();
        });

        it('should filter data properly by Auto flag', function () {
            flrWizardRestorepointModel.model.filters.auto = true;
            flrWizardRestorepointModel.model.filters.vss = false;
            flrWizardRestorepointModel.model.filters.user = false;
            flrWizardRestorepointModel.filter();

            expect(flrWizardRestorepointModel.model.filtered.length).toEqual(4);
        });

        it('should filter data properly by Auto and User flags', function () {
            flrWizardRestorepointModel.model.filters.auto = true;
            flrWizardRestorepointModel.model.filters.user = true;
            flrWizardRestorepointModel.model.filters.vss = false;
            flrWizardRestorepointModel.filter();

            expect(flrWizardRestorepointModel.model.filtered.length).toEqual(7);
        });

        it('should filter data properly without flags', function () {
            flrWizardRestorepointModel.model.filters.offsite = true;
            flrWizardRestorepointModel.filter();

            expect(flrWizardRestorepointModel.model.filtered.length).toEqual(10);
        });

        it('should check on date change', function () {
            spyOn(flrWizardRestorepointModel, 'loadCheckpoints');
            flrWizardRestorepointModel.model.dateOptions = {
                range: 1
            };
            flrWizardRestorepointModel.onDateChange();
            expect(flrWizardRestorepointModel.loadCheckpoints).toHaveBeenCalledWith(flrWizardRestorepointModel.model.dateOptions.range);
        });
    });

    describe('flrWizardRestorepointModel private functions testing', function () {
        it('should contain defined private function', function () {
            expect(flrWizardRestorepointModel.createPointInTimeAndType).toBeDefined();
            expect(flrWizardRestorepointModel.onCheckpointsSuccess).toBeDefined();
        });

        it('should augment an item with new properties', function () {
            var item = {
                CheckpointIdentifier: 'identifier',
                TimeStamp: 'Jun 29, 2015 15:20:20'
            };
            flrWizardRestorepointModel.createPointInTimeAndType(item);

            expect(item.id).toEqual('identifier');
            expect(item.type).toEqual('Auto');
            expect(item.timeObj.filterValue).toBeDefined();
            expect(item.timeObj.filterValue instanceof Date).toBeTruthy();
            expect(item.timeObj.display).toEqual('Jun 29, 2015 15:20:20');
        });


        it('should fill data with augmented items and filter on success', function () {
            spyOn(flrWizardRestorepointModel, 'createPointInTimeAndType').and.callThrough();
            spyOn(flrWizardRestorepointModel, 'filter').and.callThrough();

            var checkpoints = [
                {
                    CheckpointIdentifier: 'identifier1',
                    TimeStamp: 'Jun 29, 2015 15:20:20'
                },
                {
                    CheckpointIdentifier: 'identifier2',
                    TimeStamp: 'Jun 29, 2015 15:20:21'
                }
            ];

            expect(flrWizardRestorepointModel.model.data.length).toEqual(10);
            flrWizardRestorepointModel.onCheckpointsSuccess(checkpoints);
            expect(flrWizardRestorepointModel.model.data).toEqual(checkpoints);
        });

        it('should set the date options on onVpgStatsCheckpointsSuccess', function () {
            spyOn(flrWizardRestorepointModel, 'loadCheckpoints');

            var statsCheckpoints = {
                Latest: {
                    "CheckpointIdentifier": "10001",
                    "Tag": null,
                    "TimeStamp": "/Date(1479506400000)/",
                    "Vss": false
                },
                Earliest: {
                    "CheckpointIdentifier": "1",
                    "Tag": null,
                    "TimeStamp": "/Date(1479026387000)/",
                    "Vss": false
                }
            };
            flrWizardRestorepointModel.onVpgStatsCheckpointsSuccess(statsCheckpoints);
            expect(flrWizardRestorepointModel.model.edgeCheckpoints).toBe(statsCheckpoints);
            expect(flrWizardRestorepointModel.model.dateOptions.minDate).toEqual('2016-11-13T08:39:47.000Z');
            expect(flrWizardRestorepointModel.model.dateOptions.maxDate).toEqual('2016-11-18T22:00:00.000Z');

            expect(flrWizardRestorepointModel.model.dateOptions.range.startDate).toEqual('2016-11-18T22:00:00.000Z');
            expect(flrWizardRestorepointModel.model.dateOptions.range.endDate).toEqual('2016-11-19T21:59:59.999Z');
            expect(flrWizardRestorepointModel.model.dateOptions.oneDateOnly).toBeFalsy();
            expect(flrWizardRestorepointModel.loadCheckpoints).toHaveBeenCalledWith(flrWizardRestorepointModel.model.dateOptions.range);

            statsCheckpoints = {
                Latest: {
                    "CheckpointIdentifier": "1",
                    "Tag": null,
                    "TimeStamp": "/Date(1479506400000)/",
                    "Vss": false
                },
                Earliest: {
                    "CheckpointIdentifier": "10001",
                    "Tag": null,
                    "TimeStamp": "/Date(1479506400000)/",
                    "Vss": false
                }
            };
            flrWizardRestorepointModel.onVpgStatsCheckpointsSuccess(statsCheckpoints);
            expect(flrWizardRestorepointModel.model.dateOptions.oneDateOnly).toBeTruthy();
        });
    });
});
