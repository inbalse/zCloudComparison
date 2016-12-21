'use strict';
describe('Multi select list controller', function () {
    var controller, scope;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();

        controller = $controller('multiSelectListController', {$scope: scope});


        controller.filterValues = [{field: 'field', value: 1}, {field: 'field2', value: 2}];
        controller.onApply = angular.noop;
        controller.onClear = angular.noop;
        controller.onCancel = angular.noop;

        controller.$onInit();

    }));

    it('should set filters from filter values', function () {
        expect(controller.filters).toEqual(controller.filterValues);
    });

    it('should select all filters', function () {
        controller.toggleSelectAll();
        expect(controller.filters[0].checked).toBe(true);
        expect(controller.filters[1].checked).toBe(true);
    });

    it('should change selection for filter', function () {
        controller.selectionChange(controller.filters[0], true);
        expect(controller.filters[0].checked).toBe(true);
        controller.selectionChange(controller.filters[0], false);
        expect(controller.filters[0].checked).toBe(false);
    });

    it('should call onApply with filters', function () {
        spyOn(controller, 'onApply');
        controller.applyFilter();
        expect(controller.onApply).toHaveBeenCalledWith({values: controller.filters});
    });

    it('should call onClear', function () {
        spyOn(controller, 'onClear');
        controller.clearFilter();
        expect(controller.onClear).toHaveBeenCalled();
    });

    it('should call onClear', function () {
        spyOn(controller, 'onCancel');
        controller.cancel();
        expect(controller.onCancel).toHaveBeenCalled();
    });

    it('should set check/uncheck all on init', function(){
        controller.filterValues = [
            {checked:false},
            {checked:true}
        ];

        controller.$onInit();
        expect(controller.selectAll).toBeFalsy();

        controller.filterValues = [
            {checked:true},
            {checked:true}
        ];
        controller.$onInit();
        expect(controller.selectAll).toBeTruthy();
    });
});

