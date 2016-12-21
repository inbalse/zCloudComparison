describe('restoreEditNicFactory', function () {
    var factory, modal;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_$uibModal_, _restoreEditNicFactory_) {
        factory = _restoreEditNicFactory_;
        modal = _$uibModal_;
    }));


    it('should contain defined functions and variables', function () {
        expect(factory.openEdit).toBeDefined();
        expect(factory.createSharedObject).toBeDefined();
        expect(factory.save).toBeDefined();
        expect(factory.close).toBeDefined();
        expect(factory._closeWindow).toBeDefined();
    });
});
