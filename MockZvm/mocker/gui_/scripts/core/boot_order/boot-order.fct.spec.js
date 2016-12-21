'use strict';

describe('bootOrderFactoryTest', function () {
    var factory, service, modal;

    beforeEach(module('zvmTest'));
    beforeEach(inject(function (_$uibModal_, _zertoServiceFactory_, _bootOrderFactory_) {
        factory = _bootOrderFactory_;
        modal = _$uibModal_;
    }));

    it('should have function defined', function () {
        expect(factory._modalInstance).toEqual(null);
        expect(factory.close).toBeDefined();
        expect(factory.save).toBeDefined();
    });

    it('should create modalInstance and save the passed data when openWindow is called', function () {
        var data = {testID: 'test'};
        var entities = {entitiesID: 'entitiesTest'};
        var items = {itemsID: 'itemsTest'};
        factory.openWindow(data, entities,items);
        expect(factory._modalInstance).toBeDefined();
    });
});
