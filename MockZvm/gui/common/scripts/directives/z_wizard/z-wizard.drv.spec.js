'use strict';

//describe('zWizardDirective', function () {
//    var scope, elementHTML, element;
//
//    beforeEach(module('zvmTest'));
//    beforeEach(module('templates'));
//
//    beforeEach(inject(function ($rootScope, $compile, $templateCache) {
//
//        elementHTML = '<z-wizard>' +
//            '<z-wizard-step step-title="test step">' +
//            '<input type="number"/>' +
//            '</z-wizard-step>' +
//            '<z-wizard-step step-title="test step">' +
//            '<input type="number"/>' +
//            '</z-wizard-step>' +
//            '</z-wizard>';
//
//        element = $compile(elementHTML)($rootScope.$new());
//        scope = element.scope();
//        scope.$digest();
//    }));
//
//    it('should compile', function () {
//        expect(scope.steps).toBeDefined();
//        expect(scope.steps.length).toEqual(2);
//    });
//
//    it('should have functions and properties defined', function () {
//        expect(scope.currentStep).toEqual(0);
//        expect(scope.cancelEnabled).toBeTruthy();
//        expect(scope.previousEnabled).toBeFalsy();
//        expect(scope.nextEnabled).toBeFalsy();
//        expect(scope.doneEnabled).toBeFalsy();
//
//        expect(scope.handleStepClick).toBeDefined();
//        expect(scope.changeCurrentStep).toBeDefined();
//        expect(scope.removeActives).toBeDefined();
//        expect(scope.handleButtonClick).toBeDefined();
//        expect(scope.next).toBeDefined();
//        expect(scope.previous).toBeDefined();
//        expect(scope.enableDisableButtons).toBeDefined();
//        expect(scope._isPreviousButtonEnabled).toBeDefined();
//        expect(scope._isNextButtonEnabled).toBeDefined();
//        expect(scope._isDoneEnabled).toBeDefined();
//        expect(scope._stepValidityChange).toBeDefined();
//    });
//
//
//    it('should emit events when buttons are clicked', function () {
//        spyOn(scope, '$emit').and.callThrough();
//
//        scope.handleButtonClick({target: {innerHTML: 'Z_WIZARD.CANCEL'}});
//        expect(scope.$emit).toHaveBeenCalledWith('wizard:CancelButtonClick');
//
//        scope.handleButtonClick({target: {innerHTML: 'Z_WIZARD.DONE'}});
//        expect(scope.$emit).toHaveBeenCalledWith('wizard:DoneButtonClick');
//
//        scope.handleButtonClick({target: {innerHTML: 'Z_WIZARD.NEXT'}});
//        expect(scope.$emit).toHaveBeenCalledWith('wizard:NextButtonClick');
//
//        expect(scope.$emit).toHaveBeenCalledWith('wizard:NextButtonClick');
//
//        scope.handleButtonClick({target: {innerHTML: 'Z_WIZARD.PREVIOUS'}});
//        expect(scope.$emit).toHaveBeenCalledWith('wizard:PreviousButtonClick');
//    });
//
//
//
//
//
//
//});
