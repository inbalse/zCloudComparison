'use strict';

describe('advanvedJournalSettingsFactoryTest', function () {
    var factory, modal, zertoService, testCreateVPGModel;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (advancedJournalSettingsFactory, $uibModal, zertoServiceFactory, createVPGModel) {
        factory = advancedJournalSettingsFactory;
        modal = $uibModal;
        zertoService = zertoServiceFactory;
        testCreateVPGModel = createVPGModel;

        testCreateVPGModel.data = {isReverseMode: false};
    }));

    it('should have functions defined', function () {
        expect(factory.modalInstance).toBe(null);
        expect(factory.openWindow).toBeDefined();
        expect(factory.save).toBeDefined();
        expect(factory.cancel).toBeDefined();
        expect(factory.clear).toBeDefined();
        expect(factory.getPotentialDatastores).toBeDefined();
    });

    it('should call the server when getPotentials function is called with the passed params', function () {
        spyOn(zertoService, 'GetPotentialDatastoresForJournal').and.callThrough;
        var vo1 = {id: 1};
        var vo2 = {id: 2};
        factory.getPotentialDatastores(vo1, vo2);

        expect(zertoService.GetPotentialDatastoresForJournal).toHaveBeenCalledWith(vo1, vo2);
    });

    it('should apply the setting to the original data when applyNewSettings is called', function () {
        spyOn(factory, '_applayDefaultJournalSettingsPerVM');
        var vo1 = {id: 1};
        var vo2 = {id: 2};
        factory.originalData = {
            defaultVpgSettings: {
                Config: {
                    Configuration: {
                        ManageJournalSettings: {id: 232},
                        MinimalJournalLenghtInMinutes: {id: 234234}
                    }
                }
            }
        };
        factory.modalInstance = {
            dismiss: function (value) {
            }, close: angular.noop
        };
        testCreateVPGModel.data = factory.originalData;
        factory.save({ManageJournalSettings: vo1, MinimalJournalLenghtInMinutes: vo2}, factory.originalData);

        expect(factory._applayDefaultJournalSettingsPerVM).toHaveBeenCalled();
    });
});
