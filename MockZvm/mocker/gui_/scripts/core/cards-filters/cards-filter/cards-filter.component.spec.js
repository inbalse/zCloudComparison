'use strict';
describe('Card filter component', function () {

    var ctrl, scope, values, cardsFilterService, zSlickGridFilterTypes, multiSelectClassConstants;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function ($rootScope, $componentController, _cardsFilterService_, _zSlickGridFilterTypes_, _multiSelectClassConstants_) {
        scope = $rootScope.$new();
        ctrl = $componentController('cardFilter', {$scope: scope}, {onFilterChange: angular.noop});
        cardsFilterService = _cardsFilterService_;
        zSlickGridFilterTypes = _zSlickGridFilterTypes_;
        multiSelectClassConstants = _multiSelectClassConstants_;
    }));

    it('should init wildcard filter', function () {
        spyOn(cardsFilterService, 'initWildcard').and.callThrough();
        ctrl.column = {
            filter: zSlickGridFilterTypes.WILDCARD,
            wildcardValues: ['wooho']
        };
        ctrl.$onInit();
        expect(cardsFilterService.initWildcard).toHaveBeenCalledWith(ctrl.column);
        expect(ctrl.wildcardValues).toEqual(jasmine.any(String));
        expect(ctrl.filterTemplate).toEqual(jasmine.any(String));

    });

    it('should init range filter', function () {
        spyOn(cardsFilterService, 'initRange').and.callThrough();
        ctrl.column = {
            filter: zSlickGridFilterTypes.RANGE,
            rangeValues: [1, 50]
        };
        ctrl.$onInit();
        expect(cardsFilterService.initRange).toHaveBeenCalledWith(ctrl.column);
        expect(ctrl.rangeValues).toEqual(jasmine.any(Object));
        expect(ctrl.filterTemplate).toEqual(jasmine.any(String));

    });

    it('should init range size filter', function () {
        spyOn(cardsFilterService, 'initRangeSize').and.callThrough();
        ctrl.column = {
            filter: zSlickGridFilterTypes.MB_OR_GB_RANGE,
            rangeValues: [1, 50],
            rangeTypeMultiplier: 1
        };
        ctrl.$onInit();
        expect(cardsFilterService.initRangeSize).toHaveBeenCalledWith(ctrl.column);
        expect(ctrl.rangeValues).toEqual(jasmine.any(Object));
        expect(ctrl.rangeTypeMultiplier).toEqual(jasmine.any(Number));
        expect(ctrl.filterTemplate).toEqual(jasmine.any(String));

    });

    it('should init date filter', function () {
        spyOn(cardsFilterService, 'initDate').and.callThrough();
        ctrl.column = {
            filter: zSlickGridFilterTypes.DATE,
            dateValues: [new Date(), new Date()]
        };
        ctrl.$onInit();
        expect(cardsFilterService.initDate).toHaveBeenCalledWith(ctrl.column);
        expect(ctrl.dateValues).toEqual(jasmine.any(Object));
        expect(ctrl.eventsDateRangeList).toEqual(jasmine.any(Object));
        expect(ctrl.filterTemplate).toEqual(jasmine.any(String));
    });

    it('should init multi select filter', function () {
        spyOn(cardsFilterService, 'initMultiSelect').and.callThrough();
        ctrl.items = [{field: {filterValue: 4}}, {field: {filterValue: 5}}, {field: {filterValue: 4}}];
        ctrl.column = {
            field: 'field',
            filterValues: [0, 4, 50],
            filter: zSlickGridFilterTypes.MULTI_SELECT,
            card_formatter: multiSelectClassConstants.FORMATTER_TYPE.DISPLAY,
            formatter_class: 'a'
        };

        ctrl.$onInit();
        expect(cardsFilterService.initMultiSelect).toHaveBeenCalledWith(ctrl.column, ctrl.items);
        expect(ctrl.filterValues).toEqual(jasmine.any(Object));
        expect(ctrl.filterTemplate).toEqual(jasmine.any(String));
    });

    it('should cancel filter change', function () {
        ctrl.column = {};
        ctrl.column.isDropdownVisible = true;
        ctrl.cancel();
        expect(ctrl.column.isDropdownVisible).toBe(false);

    });

    describe('apply functions', function () {
        beforeEach(function () {
            values = [{x: 1}, {y: 2}]
        });
        it('should apply wildcard filter', function () {
            spyOn(cardsFilterService, 'applyWildcardFilter');

            ctrl.column = {
                filter: zSlickGridFilterTypes.WILDCARD
            };

            ctrl.applyFilter(values);
            expect(cardsFilterService.applyWildcardFilter).toHaveBeenCalledWith(ctrl.column, values);
            expect(ctrl.wildcardValues).toBe(values);

        });

        it('should apply range filter', function () {
            spyOn(cardsFilterService, 'applyRangeFilter');

            ctrl.column = {
                filter: zSlickGridFilterTypes.RANGE
            };

            ctrl.applyFilter(values);
            expect(cardsFilterService.applyRangeFilter).toHaveBeenCalledWith(ctrl.column, values);
            expect(ctrl.rangeValues).toBe(values);
        });

        it('should apply range size filter', function () {
            spyOn(cardsFilterService, 'applyRangeSizeFilter');

            ctrl.column = {
                filter: zSlickGridFilterTypes.MB_OR_GB_RANGE
            };
            values = {range: [1, 5], multiplier: 1};
            ctrl.applyFilter(values);
            expect(cardsFilterService.applyRangeSizeFilter).toHaveBeenCalledWith(ctrl.column, values.range, values.multiplier);
            expect(ctrl.rangeValues).toBe(values.range);
            expect(ctrl.rangeTypeMultiplier).toBe(values.multiplier);

        });

        it('should apply date filter', function () {
            spyOn(cardsFilterService, 'applyDateFilter');
            ctrl.column = {
                filter: zSlickGridFilterTypes.DATE
            };
            ctrl.applyFilter(values);

            expect(cardsFilterService.applyDateFilter).toHaveBeenCalledWith(ctrl.column, values);
            expect(ctrl.dateValues).toBe(values);

        });

        it('should apply multi select filter', function () {
            spyOn(cardsFilterService, 'applyMultiSelectFilter');
            ctrl.column = {
                filter: zSlickGridFilterTypes.MULTI_SELECT
            };

            ctrl.applyFilter(values);
            expect(cardsFilterService.applyMultiSelectFilter).toHaveBeenCalledWith(ctrl.column, values);
        });
    });

    it('should clear wildcard filter', function () {
        spyOn(cardsFilterService, 'clearWildcardFilter');

        ctrl.wildcardValues = {};
        ctrl.column = {
            filter: zSlickGridFilterTypes.WILDCARD
        };
        ctrl.clearFilter();
        expect(cardsFilterService.clearWildcardFilter).toHaveBeenCalledWith(ctrl.column);
        expect(ctrl.wildcardValues).toBe(null);
        expect(ctrl.column.isDropdownVisible).toBe(false);

    });

    it('should clear range filter', function () {
        spyOn(cardsFilterService, 'clearRangeFilter');

        ctrl.rangeValues = {};
        ctrl.column = {
            filter: zSlickGridFilterTypes.RANGE
        };

        ctrl.clearFilter();
        expect(cardsFilterService.clearRangeFilter).toHaveBeenCalledWith(ctrl.column);
        expect(ctrl.rangeValues).toBe(null);

    });

    it('should clear range size filter', function () {
        spyOn(cardsFilterService, 'clearRangeSizeFilter');
        ctrl.rangeValues = {};
        ctrl.rangeTypeMultiplier = 1024;
        ctrl.column = {
            filter: zSlickGridFilterTypes.MB_OR_GB_RANGE
        };
        ctrl.clearFilter();
        expect(cardsFilterService.clearRangeSizeFilter).toHaveBeenCalledWith(ctrl.column);
        expect(ctrl.rangeValues).toBe(null);
        expect(ctrl.rangeTypeMultiplier).toBe(1);

    });

    it('should clear date filter', function () {
        spyOn(cardsFilterService, 'clearDateFilter');
        ctrl.dateValues = {};
        ctrl.column = {
            filter: zSlickGridFilterTypes.DATE
        };
        ctrl.clearFilter();

        expect(cardsFilterService.clearDateFilter).toHaveBeenCalledWith(ctrl.column);
        expect(ctrl.dateValues).toBe(null);
    });

    it('should clear multi select filter', function () {
        spyOn(cardsFilterService, 'clearMultiSelectFilter');
        ctrl.filterValues = [{checked: true}, {checked: false}, {checked: true}]
        ctrl.column = {
            filter: zSlickGridFilterTypes.MULTI_SELECT
        };

        ctrl.clearFilter();
        expect(cardsFilterService.clearMultiSelectFilter).toHaveBeenCalledWith(ctrl.column);
        expect(ctrl.filterValues[0].checked).toBe(false);
        expect(ctrl.filterValues[1].checked).toBe(false);
        expect(ctrl.filterValues[2].checked).toBe(false);
    });
});
