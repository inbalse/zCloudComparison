'use strict';

describe('numberMinMaxDirectives', function () {
    var scope, element, elementHTML, form;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($rootScope, $compile) {
        elementHTML = '<form name="testForm">' +
            '<input type="number" z-ng-min="minData" z-ng-max="maxData" reqiered ng-model="value"/>' +
            '</form>';

        scope = $rootScope.$new();
        scope.minData = 10;
        scope.maxData = 100;

        element = $compile(elementHTML)(scope);

        scope.$digest();

        form = scope.testForm;
    }));

    //testing the obvious here. To be sure that all does compile
    it('should have a form', function () {
        expect(form).toBeDefined();
    });

    it('should be invalid when value is outside min max', function () {
        scope.value = 102;
        scope.$digest();
        expect(form.$valid).toBeFalsy();

        scope.value = 99;
        scope.$digest();
        expect(form.$valid).toBeTruthy();
    });

    it('should work if min max are changed with the scope bindings', function () {
        scope.value = 11;
        scope.$digest();
        expect(form.$valid).toBeTruthy();

        scope.minData = 12;
        scope.$digest();
        expect(form.$valid).toBeFalsy();
    });
});
