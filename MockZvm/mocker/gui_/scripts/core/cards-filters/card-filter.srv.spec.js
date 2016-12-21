'use strict';
describe('Card filters service', function () {

    var cardsFilterService, cardsFiltersConstants, multiSelectClassConstants, zNotificationConstant, zNotificationService;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_cardsFilterService_, _cardsFiltersConstants_, _multiSelectClassConstants_, _zNotificationConstant_, _zNotificationService_) {
        cardsFilterService = _cardsFilterService_;
        cardsFiltersConstants = _cardsFiltersConstants_;
        multiSelectClassConstants = _multiSelectClassConstants_;
        zNotificationConstant = _zNotificationConstant_;
        zNotificationService = _zNotificationService_;
    }));

    it('should init wildcard column', function () {
        var column = {wildcardValues: ['test']},
            result = cardsFilterService.initWildcard(column);

        expect(result.values).toEqual(['test']);
        expect(result.template).toBe(cardsFiltersConstants.TEMPLATES.WILDCARD);
    });

    it('should init range column', function () {
        var column = {rangeValues: [0, 50]},
            result = cardsFilterService.initRange(column);

        expect(result.values).toEqual({from: 0, to: 50});
        expect(result.template).toBe(cardsFiltersConstants.TEMPLATES.RANGE);
    });

    it('should init range size column', function () {
        var column = {rangeValues: [0, 50], rangeTypeMultiplier: 1},
            result = cardsFilterService.initRangeSize(column);

        expect(result.values).toEqual({from: 0, to: 50});
        expect(result.rangeTypeMultiplier).toEqual(column.rangeTypeMultiplier);
        expect(result.template).toBe(cardsFiltersConstants.TEMPLATES.MB_OR_GB_RANGE);
    });

    it('should init multi select column', function () {
        var column = {
                field: 'field',
                filterValues: [0, 4, 50],
                card_formatter: multiSelectClassConstants.FORMATTER_TYPE.DISPLAY,
                formatter_class: 'a'
            },
            items = [{field: {filterValue: 4}}, {field: {filterValue: 5}}, {field: {filterValue: 4}}],
            result = cardsFilterService.initMultiSelect(column, items);

        expect(result.values).toEqual([
            {
                "field": "field",
                "formatterClass": "a",
                "value": {
                    "filterValue": 4
                },
                "checked": true
            },
            {
                "field": "field",
                "formatterClass": "a",
                "value": {
                    "filterValue": 5
                },
                "checked": false
            }
        ]);
        expect(result.template).toEqual(cardsFiltersConstants.TEMPLATES.MULTI_SELECT.DISPLAY);

        column.card_formatter = multiSelectClassConstants.FORMATTER_TYPE.CLASS;
        result = cardsFilterService.initMultiSelect(column, items);
        expect(result.template).toEqual(cardsFiltersConstants.TEMPLATES.MULTI_SELECT.CLASS);

        column.card_formatter = multiSelectClassConstants.FORMATTER_TYPE.CLASS_GROUP;
        result = cardsFilterService.initMultiSelect(column, items);
        expect(result.template).toEqual(cardsFiltersConstants.TEMPLATES.MULTI_SELECT.CLASS_GROUP);

        column.card_formatter = multiSelectClassConstants.FORMATTER_TYPE.BACKUP_STATUS;
        result = cardsFilterService.initMultiSelect(column, items);
        expect(result.template).toEqual(cardsFiltersConstants.TEMPLATES.MULTI_SELECT.BACKUP_STATUS);

    });

    it('should init date column from date', function () {
        var startDate = new Date(),
            endDate = new Date(),
            column = {dateValues: [startDate, endDate]},
            result = cardsFilterService.initDate(column);

        expect(result.values.startDate.toString()).toBe(moment(startDate).toString());
        expect(result.values.endDate.toString()).toBe(moment(endDate).toString());
        expect(result.eventsDateRangeList).toEqual(cardsFiltersConstants.DATE_FILTER_VALUES);
        expect(result.template).toEqual(cardsFiltersConstants.TEMPLATES.DATE);
    });

    it('should get columns with filter', function () {
        var filteredColumns = [{
                filter: 0
            }, {
                filter: 0
            }, {
                filter: 2
            }],
            columns = [{
                filter: 0
            }];

        var result = cardsFilterService.getColumnsWithFilter(filteredColumns, columns);
        expect(result).toEqual(filteredColumns);

        filteredColumns = [{}, {}, {}, {}];
        result = cardsFilterService.getColumnsWithFilter(filteredColumns, columns);
        expect(result).toEqual(columns);
    });

    it('should apply wildcard filter', function () {
        var column = {},
            wildcardValues = 'woot';

        cardsFilterService.applyWildcardFilter(column, wildcardValues);
        expect(column.wildcardValues[0]).toEqual(wildcardValues);
        expect(column.isFilterActive).toEqual(true);

        cardsFilterService.applyWildcardFilter(column);
        expect(column.wildcardValues[0]).toEqual('');
        expect(column.isFilterActive).toEqual(false);
    });

    it('should apply range filter', function () {
        var column = {},
            rangeValues = {
                from: 0,
                to: 10
            };

        cardsFilterService.applyRangeFilter(column, rangeValues);
        expect(column.rangeValues[0]).toEqual(rangeValues.from);
        expect(column.rangeValues[1]).toEqual(rangeValues.to);
        expect(column.isFilterActive).toEqual(true);

        cardsFilterService.applyRangeFilter(column);
        expect(column.isFilterActive).toEqual(false);
    });

    it('should apply date filter', function () {
        var column = {},
            dateValues = {
                startDate: moment('7/24/2016', 'MM/DD/YYYY'),
                endDate: moment('10/24/2016', 'MM/DD/YYYY')
            };

        cardsFilterService.applyDateFilter(column, dateValues);
        expect(column.dateValues[0]).toEqual(dateValues.startDate);
        expect(column.dateValues[1]).toEqual(dateValues.endDate);
        expect(column.isFilterActive).toEqual(true);

        column.dateValues = null;
        column.isFilterActive = true;
        cardsFilterService.applyDateFilter(column);
        expect(column.isFilterActive).toEqual(false);
    });

    it('should apply range size filter', function () {
        var column = {},
            rangeValues = {
                from: 0,
                to: 10
            },
            rangeTypeMultiplier = 1;

        cardsFilterService.applyRangeSizeFilter(column, rangeValues, rangeTypeMultiplier);
        expect(column.rangeValues[0]).toEqual(rangeValues.from);
        expect(column.rangeValues[1]).toEqual(rangeValues.to);
        expect(column.rangeTypeMultiplier).toEqual(rangeTypeMultiplier);
        expect(column.isFilterActive).toEqual(true);

        cardsFilterService.applyRangeFilter(column);
        expect(column.isFilterActive).toEqual(false);
    });

    it('should apply multi select filter', function () {
        var column = {},
            filterValues = [{
                checked: true,
                value: 5
            }, {
                checked: false,
                value: 10
            }];

        cardsFilterService.applyMultiSelectFilter(column, filterValues);
        expect(column.isFilterActive).toBe(true);
        expect(column.filterValues[0]).toBe(filterValues[0].value);

        filterValues[0].checked = false;
        cardsFilterService.applyMultiSelectFilter(column, filterValues);
        expect(column.isFilterActive).toBe(false);
        expect(column.filterValues.length).toBe(0);
    });

    it('should clear wildcard filter', function () {
        var column = {};
        cardsFilterService.clearWildcardFilter(column);
        expect(column.wildcardValues).toBe(null);
        expect(column.isFilterActive).toBe(false);
    });

    it('should clear range filter', function () {
        var column = {};
        cardsFilterService.clearRangeFilter(column);
        expect(column.rangeValues).toBe(null);
        expect(column.isFilterActive).toBe(false);
    });

    it('should clear date filter', function () {
        var column = {};
        cardsFilterService.clearDateFilter(column);
        expect(column.dateValues).toBe(null);
        expect(column.isFilterActive).toBe(false);
    });

    it('should clear range size filter', function () {
        var column = {};
        cardsFilterService.clearRangeSizeFilter(column);
        expect(column.rangeValues).toBe(null);
        expect(column.rangeTypeMultiplier).toBe(null);
    });

    it('should clear multi select filter', function () {
        var column = {};
        cardsFilterService.clearMultiSelectFilter(column);
        expect(column.filterValues).toBe(null);
    });

    it('should notify selected change', function () {
        var notifier = cardsFilterService.getSelectedNotifier();
        spyOn(notifier, 'notify');
        cardsFilterService.notifySelectedChange();
        expect(notifier.notify).toHaveBeenCalledWith({key: zNotificationConstant.CARD_SELECTED_FILTER_CHANGE});
    });

});
