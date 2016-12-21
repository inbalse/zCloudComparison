'use strict';

describe('configurePairedSiteRoutingFactoryTest', function () {
    var factory, modal, zertoService;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (configurePairedSiteRoutingFactory, $uibModal, zertoServiceFactory) {
        factory = configurePairedSiteRoutingFactory;
        modal = $uibModal;
        zertoService = zertoServiceFactory;

    }));

    it('should have functions defined', function () {
        expect(factory.modalInstance).toBe(null);
        expect(factory.openWindow).toBeDefined();
        expect(factory.save).toBeDefined();
        expect(factory.close).toBeDefined();
    });

});
