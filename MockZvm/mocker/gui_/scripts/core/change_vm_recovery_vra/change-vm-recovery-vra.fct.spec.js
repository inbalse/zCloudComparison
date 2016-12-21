'use strict';

describe('changeVmRecoveryVraFactoryTest', function () {
    var factory, modal, zertoService;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (changeVmRecoveryVraFactory, $uibModal, zertoServiceFactory) {
        factory = changeVmRecoveryVraFactory;
        modal = $uibModal;
        zertoService = zertoServiceFactory;

    }));

    it('should have functions defined', function () {
        expect(factory.modalInstance).toBe(null);
        expect(factory.open).toBeDefined();
        expect(factory.save).toBeDefined();
        expect(factory.close).toBeDefined();
        expect(factory.validateData).toBeDefined();
    });

    /*it('should call modal open when the open function is called', function () {
     spyOn(zertoService, 'GetInitChangeHostScreen');
     factory.open({});

     expect(zertoService.GetInitChangeHostScreen).toHaveBeenCalled();
     });*/

    it('should call ValidateChangeHostScreen', function () {
        spyOn(zertoService, 'ValidateChangeHostScreen');
        factory.validateData({});

        expect(zertoService.ValidateChangeHostScreen).toHaveBeenCalled;
    });

   /* it('should call ExecuteChangeHost', function () {
        spyOn(zertoService, 'ExecuteChangeHost');
        factory.save({});

        expect(zertoService.ExecuteChangeHost).toHaveBeenCalled;
    });*/
});
