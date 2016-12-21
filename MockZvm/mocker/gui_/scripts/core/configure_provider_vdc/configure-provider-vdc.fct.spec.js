'use strict';

describe('configureProviderVdcFactoryTest', function () {
    var factory, zertoService, modal;

    beforeEach(module('zvmTest'));
    beforeEach(inject(function (_$uibModal_, _zertoServiceFactory_, _configureProviderVdcFactory_) {
        factory = _configureProviderVdcFactory_;
        modal = _$uibModal_;
        zertoService = _zertoServiceFactory_;
    }));

    it('should have function defined', function () {
        expect(factory.open).toBeDefined();
        expect(factory.close).toBeDefined();
        expect(factory.save).toBeDefined();
    });
});
