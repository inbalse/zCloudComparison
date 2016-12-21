'use strict';

describe('editVCDVolumesFactory', function () {
    var factory, modal, dataCollectionFactory;

    beforeEach(module('zvmTest'));
    beforeEach(inject(function (_$uibModal_, _zertoServiceFactory_, editVCDVolumesFactory, _dataCollectionFactory_) {
        dataCollectionFactory = _dataCollectionFactory_;
        factory = editVCDVolumesFactory;
        modal = _$uibModal_;
    }));

    it('should contain defined functions', function () {
        expect(factory._modalInstance).toBeDefined();
        expect(factory.deferred).toBeDefined();
        expect(factory.openWindow).toBeDefined();
        expect(factory.save).toBeDefined();
        expect(factory.getThinProvisionSupport).toBeDefined();
        expect(factory.getThinProvisionSupportReverse).toBeDefined();
        expect(factory._createSharedVolumePotentials).toBeDefined();
        expect(factory._createSharedVolumeProperties).toBeDefined();
        expect(factory.closeWindow).toBeDefined();

    });

    it('should create potentials before opening a window', function () {
        spyOn(factory, '_createSharedVolumePotentials').and.callThrough();
        spyOn(factory, '_createSharedVolumeProperties').and.callThrough();

        factory.openWindow(false, true, [], false);

        expect(factory._createSharedVolumePotentials).toHaveBeenCalledWith(false, true, false);
        expect(factory._createSharedVolumeProperties).toHaveBeenCalledWith([]);
    });

    it('should properly create shared volume potentials, key: "test1" and  value: "value1" are valid ', function () {
        //intersection should leave only equal objects inside potentials
        expect(factory._createSharedVolumePotentials(false, false)).toEqual({
            IsThinSelectionEnabled: false,
            replicationDestinationTypes: [dataCollectionFactory.REPLICATION_TYPE.VCD_PROFILE, dataCollectionFactory.REPLICATION_TYPE.PRESEED]
        });
    });

    it('should properly create shared volume potentials, nothing to intersect ', function () {
        expect(factory._createSharedVolumePotentials(false, true)).toEqual({
            IsThinSelectionEnabled: true,
            replicationDestinationTypes: [dataCollectionFactory.REPLICATION_TYPE.VCD_PROFILE, dataCollectionFactory.REPLICATION_TYPE.PRESEED]
        });
    });

});
