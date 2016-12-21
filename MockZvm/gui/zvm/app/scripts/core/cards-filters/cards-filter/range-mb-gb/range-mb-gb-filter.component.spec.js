'use strict';
describe('Range filter component', function () {

    var ctrl, scope;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($rootScope, $componentController) {
        scope = $rootScope.$new();
        ctrl = $componentController('rangeMbGbFilter', {$scope: scope}, {
            rangeValues: {from: 1, to: 5},
            rangeTypeMultiplier: 1,
            onApply: angular.noop,
            onClear: angular.noop,
            onCancel: angular.noop
        });
    }));

    it('should init model', function () {
        ctrl.$onInit();
        expect(ctrl.rangeModel).toBe(ctrl.rangeValues);
        expect(ctrl.rangeMultiplier).toBe(ctrl.rangeTypeMultiplier);
    });

    it('should call onApply with filters', function () {
        ctrl.$onInit();

        spyOn(ctrl, 'onApply');
        ctrl.applyFilter();
        expect(ctrl.onApply).toHaveBeenCalledWith({values: {range: ctrl.rangeModel , multiplier:ctrl.rangeMultiplier }});
    });

    it('should call onClear', function () {
        spyOn(ctrl, 'onClear');
        ctrl.clearFilter();
        expect(ctrl.onClear).toHaveBeenCalled();
    });

    it('should call onClear', function () {
        spyOn(ctrl, 'onCancel');
        ctrl.cancel();
        expect(ctrl.onCancel).toHaveBeenCalled();
    });
});
