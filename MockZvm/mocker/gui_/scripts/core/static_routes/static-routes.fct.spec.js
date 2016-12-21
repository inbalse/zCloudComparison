'use strict';

describe('staticRoutesFactoryTest', function () {
    var factory, service, modal;

    beforeEach(module('zvmTest'));
    beforeEach(inject(function (_$uibModal_, _zertoServiceFactory_, _staticRoutesFactory_) {
        factory = _staticRoutesFactory_;
        modal = _$uibModal_;
    }));

    it('should have function defined', function () {
        expect(factory.modalInstance).toEqual(null);
        expect(factory.close).toBeDefined();
        expect(factory.save).toBeDefined();
    });

    it('should create modalInstance and save the passed data when openWindow is called', function () {
        factory.openWindow({});
        expect(factory.modalInstance).toBeDefined();
    });
});
