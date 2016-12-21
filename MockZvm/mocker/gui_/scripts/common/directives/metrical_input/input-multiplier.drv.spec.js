'use strict';

describe('input multiplier', function () {
    var scope, element;
    beforeEach(module('zvmTest'));


    describe('isolate scope test', function () {
        var isolatedScope;
        beforeEach(inject(function ($rootScope, $compile) {
            scope = $rootScope.$new();
            element = angular.element(
                '<input class="form-control" type="number" min="0" ng-model="modelMB.value" input-multiplier="modelMB.multiplier"/>'
            );

            $compile(element)(scope);

            scope.$digest();
            isolatedScope = element.isolateScope();
        }));

        it('should contain helper functions and watchers', function () {
            expect(isolatedScope._multiply).toBeDefined();
            expect(isolatedScope._divide).toBeDefined();

            expect(isolatedScope.watchers.inputMultiplier).toBeDefined();
        });

        it('should properly convert data by helpers', function () {
            expect(isolatedScope._multiply(2, 2)).toEqual(4);
            expect(isolatedScope._divide(4, 2)).toEqual(2);
        });

    });

    describe('viewmodel test', function () {
        var form, megabyteMeasureConstants, secondsMeasureConstants;
        beforeEach(inject(function ($rootScope, $compile, _megabyteMeasureConstants_, _secondsMeasureConstants_) {
            megabyteMeasureConstants = _megabyteMeasureConstants_;
            secondsMeasureConstants = _secondsMeasureConstants_;
            scope = $rootScope.$new();
            element = angular.element(
                    '<form name="form">' +
                    '<input class="form-control" name="mInput" type="number" min="0" ng-model="model.value" input-multiplier="model.multiplier"/>' +
                    '</form>'
            );

            scope.model = {
                value: 300,
                multiplier: 1
            };


            $compile(element)(scope);

            scope.$digest();
            form = scope.form;

        }));

        it('should contain proper values on viewValue change for input-megabytes to GB', function () {
            scope.model.multiplier = megabyteMeasureConstants.MB_IN_GB;
            scope.$apply();
            form.mInput.$setViewValue(1);

            expect(scope.model.value).toEqual(megabyteMeasureConstants.MB_IN_GB);
        });

        it('should contain proper values on viewValue change for input-megabytes to TB', function () {
            scope.model.multiplier = megabyteMeasureConstants.MB_IN_TB;
            scope.$apply();
            form.mInput.$setViewValue(1);

            expect(scope.model.value).toEqual(megabyteMeasureConstants.MB_IN_TB);
        });

        it('should contain proper values on viewValue change for input-seconds to MIN', function () {

            scope.model.multiplier = secondsMeasureConstants.SEC_IN_MIN;
            scope.$apply();
            form.mInput.$setViewValue(1);

            expect(scope.model.value).toEqual(secondsMeasureConstants.SEC_IN_MIN);
        });

        it('should contain proper values on viewValue change for input-seconds to HOUR', function () {
            scope.model.multiplier = secondsMeasureConstants.SEC_IN_HOUR;
            scope.$apply();
            form.mInput.$setViewValue(1);

            expect(scope.model.value).toEqual(secondsMeasureConstants.SEC_IN_HOUR);
        });

        it('should not parse invalid multipliers', function () {
            scope.model.value = 300;
            scope.model.multiplier = '';
            scope.$apply();
            form.mInput.$setViewValue(1);


            expect(scope.model.value).toEqual(1);

            scope.model.multiplier = '1';
            form.mInput.$setViewValue(2);
            scope.$apply();

            expect(scope.model.value).toEqual(2);

        });
        it('should not devide by zero', function () {

            scope.model.value = 300;
            scope.model.multiplier = 0;

            expect(form.mInput.$viewValue).toEqual('300');

        });
    });
});
