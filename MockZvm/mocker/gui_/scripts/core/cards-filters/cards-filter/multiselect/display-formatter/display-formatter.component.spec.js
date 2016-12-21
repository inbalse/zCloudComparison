'use strict';
describe('Class group formatter component', function () {

    var ctrl, scope;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($rootScope, $componentController) {
        scope = $rootScope.$new();
        ctrl = $componentController('displayFormatter', {$scope: scope}, {
            onSelectionChange: angular.noop,
            checked: true,
            display: 'asdasd'
        });
    }));

    it('should init the display', function () {
        ctrl.$onInit();
        expect(ctrl.selectionModel).toBe(ctrl.checked);
    });

    it('should update on select all', function () {
        ctrl.checked = false;
        ctrl.selectionModel = true;
        ctrl.$onChanges();
        expect(ctrl.selectionModel).toBe(false);
    });

    it('should call onSelectionToggle on change', function () {
        spyOn(ctrl, 'onSelectionChange');
        var value = true;
        ctrl.onToggle(value);
        expect(ctrl.onSelectionChange).toHaveBeenCalledWith({isSelected: value});
    });
});
