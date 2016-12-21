describe('flrWizardFactory', function () {
    var flrWizardFactory, flrWizardModel;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_flrWizardFactory_, _flrWizardModel_) {
        flrWizardFactory = _flrWizardFactory_;
        flrWizardModel = _flrWizardModel_;
    }));

    it('should have overridden open function', function () {
        spyOn(flrWizardModel, 'init').and.callThrough();
        flrWizardFactory.open();
        expect(flrWizardModel.init).toHaveBeenCalled();
    });
});
