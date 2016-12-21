'use strict';

describe('advancedVmReplicationSettingsFactoryTest', function () {
    var factory, modal;

    beforeEach(module('zvmTest'));
    beforeEach(inject(function ($uibModal, advancedVmReplicationSettingsFactory) {
        factory = advancedVmReplicationSettingsFactory;
        modal = $uibModal;

    }));

    it('should have function defined', function () {
        expect(factory.modalInstance).toEqual(null);
        expect(factory.openWindow).toBeDefined();
    });

    it('should create modalInstance and save the passed data when openWindow is called', function () {
        var data = {testID: 'test'};
        factory.openWindow(data);
        expect(factory.modalInstance).toBeDefined();
    });
});
