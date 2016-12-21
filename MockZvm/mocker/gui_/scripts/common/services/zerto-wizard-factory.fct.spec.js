describe('zertoWizardFactory', function () {
    var zertoWizardFactory;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_zertoWizardFactory_) {
        zertoWizardFactory = _zertoWizardFactory_;
    }));

    it('should create factory', function () {
        var result = zertoWizardFactory.createFactory('url', 'windowClass', 'controller', 'backdrop');

        expect(result.open).toBeDefined();
        expect(result.show).toBeDefined();
        expect(result.close).toBeDefined();
        expect(result.expose).toBeDefined();

        expect(result.modalProps).toEqual({
            templateUrl: 'url',
            windowClass: 'windowClass',
            controller: 'controller',
            backdrop: 'backdrop'
        });
    });

    describe('generic factory', function () {
        var genericFactory, modal;
        beforeEach(inject(function ($uibModal) {
            genericFactory = zertoWizardFactory.createFactory('url', 'windowClass', 'controller', 'backdrop');
            modal = $uibModal;
        }));

        it('should call show when not overridden', function () {
            spyOn(genericFactory, 'show');
            genericFactory.open();
            expect(genericFactory.show).toHaveBeenCalled();
        });

        it('should call for modal open', function () {
            spyOn(modal, 'open').and.callThrough();
            genericFactory.show();
            expect(modal.open).toHaveBeenCalled();
        });

        it('should call for close', function () {
            genericFactory.modalInstance = {
                close: function () {
                }
            };
            spyOn(genericFactory.modalInstance, 'close').and.callThrough();
            genericFactory.close();
            expect(genericFactory.modalInstance.close).toHaveBeenCalled();
        });

        it('should expose itself partially', function () {

        });
    });

    it('should create model', function () {
        var result = zertoWizardFactory.createModel();

        expect(result.q).toBeDefined();
        expect(result.revertStack).toBeDefined();
        expect(result.addModel).toBeDefined();
        expect(result.init).toBeDefined();
        expect(result.expose).toBeDefined();
    });

    describe('generic model', function () {
        var genericModel;
        beforeEach(inject(function () {
            genericModel = zertoWizardFactory.createModel();
        }));

        it('should be able to add other models to revert stack', function () {
            genericModel.addModel({
                revert: function () {
                }
            });

            expect(genericModel.revertStack.length).toBe(1);
        });

    });

});
