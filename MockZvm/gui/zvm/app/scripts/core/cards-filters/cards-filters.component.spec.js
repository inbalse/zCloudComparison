'use strict';
describe('Card filters component', function () {

    var controller, scope, cardsFilterService, zSlickGridFilterTypes, vpgCardsFrequentService;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($rootScope, $componentController, _cardsFilterService_, _zSlickGridFilterTypes_, _vpgCardsFrequentService_) {
        scope = $rootScope.$new();
        controller = $componentController('cardsFilters', {$scope: scope}, {onFilterChange: angular.noop});
        cardsFilterService = _cardsFilterService_;
        zSlickGridFilterTypes = _zSlickGridFilterTypes_;
        vpgCardsFrequentService = _vpgCardsFrequentService_;
    }));

    it('should have initialize empty selected array', function () {
        expect(controller.selectedColumns).toEqual([[null]]);
    });

    it('should add column to selected columns', function () {
        controller.selectedColumns = [[null]];
        var column = {isSelected: false, field:'Direction'};
        spyOn(cardsFilterService, 'notifySelectedChange');

        controller.addColumnFilter(column);
        expect(column.isSelected).toBe(true);
        expect(controller.selectedColumns.length).toBe(1);
        expect(controller.selectedColumns[0][0]).toBe(column);
        expect(cardsFilterService.notifySelectedChange).toHaveBeenCalled();
    });

    it('should remove column to selected columns', function () {
        var column = {isSelected: true};
        controller.selectedColumns.push(column);

        spyOn(cardsFilterService, 'notifySelectedChange');
        spyOn(controller, 'onFilterChanged');
        controller.removeColumnFilter(column);
        expect(column.isSelected).toBe(false);
        expect(column.isFilterActive).toBe(false);
        expect(controller.selectedColumns.length).toBe(1);
        expect(controller.selectedColumns[0][0]).toBe(null);
        expect(cardsFilterService.notifySelectedChange).toHaveBeenCalled();
        expect(controller.onFilterChanged).toHaveBeenCalled();
    });

    it('should call wildcard clear', function () {
        var column = {filter: zSlickGridFilterTypes.WILDCARD};
        controller.selectedColumns.push(column);
        spyOn(cardsFilterService, 'clearWildcardFilter');
        controller.removeColumnFilter(column);
        expect(cardsFilterService.clearWildcardFilter).toHaveBeenCalledWith(column);
    });

    it('should call range clear', function () {
        var column = {filter: zSlickGridFilterTypes.RANGE};
        controller.selectedColumns.push(column);
        spyOn(cardsFilterService, 'clearRangeFilter');
        controller.removeColumnFilter(column);
        expect(cardsFilterService.clearRangeFilter).toHaveBeenCalledWith(column);
    });

    it('should call range mb/gb clear', function () {
        var column = {filter: zSlickGridFilterTypes.MB_OR_GB_RANGE};
        controller.selectedColumns.push(column);
        spyOn(cardsFilterService, 'clearRangeSizeFilter');
        controller.removeColumnFilter(column);
        expect(cardsFilterService.clearRangeSizeFilter).toHaveBeenCalledWith(column);
    });


    it('should call multi select clear', function () {
        var column = {filter: zSlickGridFilterTypes.MULTI_SELECT};
        controller.selectedColumns.push(column);
        spyOn(cardsFilterService, 'clearMultiSelectFilter');
        controller.removeColumnFilter(column);
        expect(cardsFilterService.clearMultiSelectFilter).toHaveBeenCalledWith(column);
    });

    it('should call date clear', function () {
        var column = {filter: zSlickGridFilterTypes.DATE};
        controller.selectedColumns.push(column);
        spyOn(cardsFilterService, 'clearDateFilter');
        controller.removeColumnFilter(column);
        expect(cardsFilterService.clearDateFilter).toHaveBeenCalledWith(column);
    });

    it('should clear all filters', function () {
        controller.selectedColumns = [{filter: zSlickGridFilterTypes.WILDCARD}, {filter: zSlickGridFilterTypes.RANGE}, {filter: zSlickGridFilterTypes.DATE}];
        spyOn(controller, 'onFilterChanged');
        controller.clearAll();
        expect(controller.selectedColumns.length).toBe(1);
        expect(controller.selectedColumns[0][0]).toBe(null);
        expect(controller.onFilterChanged).toHaveBeenCalled();
    });

    it('should init component', function () {
        controller.columns = [];
        controller.filteredColumns = [{id: 1, isFilterActive: true, filter: 1}, {
            id: 2,
            isFilterActive: false,
            filter: 1
        }, {id: 3, isFilterActive: true, filter: 1}];
        vpgCardsFrequentService.allFrequentData = {
            sort: [],
            filter: []
        };

        spyOn(cardsFilterService, 'getColumnsWithFilter').and.callThrough();
        spyOn(cardsFilterService, 'notifySelectedChange');
        controller.$onInit();
        expect(cardsFilterService.getColumnsWithFilter).toHaveBeenCalledWith(controller.filteredColumns, controller.columns);
        expect(cardsFilterService.notifySelectedChange).toHaveBeenCalled();
        expect(controller.selectedColumns.length).toBe(1);
    });

    //TODO: add addselectedcolumn, removeselectedcolumn, removeallselected unit tests

});
