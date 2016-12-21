'use strict';
describe('Date filter component', function () {

    var ctrl, scope;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($rootScope, $componentController) {
        scope = $rootScope.$new();
        ctrl = $componentController('dateFilter', {$scope: scope}, {
            dateValues: {x: 1},
            onApply: angular.noop,
            onClear: angular.noop,
            onCancel: angular.noop
        });
    }));

    it('should init model', function () {
        ctrl.$onInit();
        expect(ctrl.dateValues).toBe(ctrl.dateValues);
    });

    it('should call onApply with filters', function () {
        ctrl.selectionModel = new Date();
        spyOn(ctrl, 'onApply');
        ctrl.applyFilter();
        expect(ctrl.onApply).toHaveBeenCalledWith({values: ctrl.selectionModel});
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
