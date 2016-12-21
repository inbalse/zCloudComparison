'use strict';

describe('advancedVcdVmReplicationSettingsFactoryTest', function () {
    var factory, modal;

    beforeEach(module('zvmTest'));
    beforeEach(inject(function ($uibModal, advancedVcdVmReplicationSettingsFactory) {
        factory = advancedVcdVmReplicationSettingsFactory;
        modal = $uibModal;

    }));

    it('should have function defined', function () {
        expect(factory.modalInstance).toEqual(null);
        expect(factory.data).toEqual(null);
        expect(factory.openWindow).toBeDefined();
    });

    it('should create modalInstance and save the passed data when openWindow is called', function () {
        var data = {testID: 'test'};

        factory.openWindow(data);
        expect(factory.data).toEqual(data);
        expect(factory.modalInstance).toBeDefined();
    });
});
