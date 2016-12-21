'use strict';

describe('editVolumesFactory', function () {
    var factory, modal, dataCollectionFactory;

    beforeEach(module('zvmTest'));

    beforeEach(module(function ($provide) {
        $provide.value('createVPGModel', {data: {}});
    }));

    beforeEach(inject(function (_$uibModal_, _zertoServiceFactory_, _editVolumesFactory_, _dataCollectionFactory_) {
        dataCollectionFactory = _dataCollectionFactory_;
        factory = _editVolumesFactory_;
        modal = _$uibModal_;
    }));

    it('should contain defined functions', function () {
        expect(factory._modalInstance).toBeDefined();
        expect(factory.deferred).toBeDefined();
        expect(factory.openWindow).toBeDefined();
        expect(factory.save).toBeDefined();
        expect(factory.getVolumeConfiguration).toBeDefined();
        expect(factory.getVolumeConfigurationReverse).toBeDefined();
        expect(factory._createSharedVolumePotentials).toBeDefined();
        expect(factory._createSharedVolumeProperties).toBeDefined();
        expect(factory.closeWindow).toBeDefined();

    });

    it('should create potentials before opening a window', function () {
        spyOn(factory, '_createSharedVolumePotentials').and.callThrough();
        spyOn(factory, '_createSharedVolumeProperties').and.callThrough();

        factory.openWindow(false, {}, []);

        expect(factory._createSharedVolumePotentials).toHaveBeenCalledWith({
            replicationDestinationTypes: [{
                label: 'ENUM.REPLICATION_DESTINATION_TYPES.0',
                value: 0
            }, {label: 'ENUM.REPLICATION_DESTINATION_TYPES.2', value: 2}, {
                label: 'ENUM.REPLICATION_DESTINATION_TYPES.3',
                value: 3
            }]
        }, false, false);
        expect(factory._createSharedVolumeProperties).toHaveBeenCalledWith([]);
    });

    it('should properly create shared volume properties', function () {

        expect(factory._createSharedVolumeProperties([])).toBeUndefined();

        var items = [
            {
                Volume: {
                    Swap: true,
                    InternalVolumeManagementSettings: {
                        Settings: {
                            IsSwap: true,
                            VolumeReplicationDestination: {Datastore: {TargetDatastore: {key: 'test', value: 1}}}
                        }
                    }
                }
            }
        ];
        expect(factory._createSharedVolumeProperties(items)).toEqual({
            Swap: true,
            InternalVolumeManagementSettings: {
                Settings: {
                    IsSwap: true,
                    VolumeReplicationDestination: {Datastore: {TargetDatastore: {key: 'test', value: 1}}}
                }
            }
        });

        items = [
            {
                Volume: {
                    Swap: true,
                    InternalVolumeManagementSettings: {
                        Settings: {
                            IsSwap: true,
                            VolumeReplicationDestination: {Datastore: {TargetDatastore: {key: 'test1', value: 1}}}
                        }
                    }
                }
            },
            {
                Volume: {
                    Swap: true,
                    InternalVolumeManagementSettings: {
                        Settings: {
                            IsSwap: true,
                            VolumeReplicationDestination: {Datastore: {TargetDatastore: {key: 'test1', value: 1}}}
                        }
                    }
                }
            }
        ];
        expect(angular.equals(factory._createSharedVolumeProperties(items), {
            Swap: true,
            InternalVolumeManagementSettings: {
                Settings: {
                    IsSwap: true,
                    VolumeReplicationDestination: {Datastore: {TargetDatastore: {key: 'test1', value: 1}}}
                }
            }
        })).toBeTruthy();
    });
})
;
