'use strict';
describe('Data filter service', function () {
    var dataFilterService, zSlickGridFilterTypes, columns;
    beforeEach(module('zvmTest'));
    beforeEach(inject(function (_dataFilterService_, _zSlickGridFilterTypes_) {
        dataFilterService = _dataFilterService_;
        zSlickGridFilterTypes = _zSlickGridFilterTypes_;


        columns = [{
            field: 'field',
            filter: zSlickGridFilterTypes.WILDCARD
        },
            {
                field: 'field',
                filter: zSlickGridFilterTypes.RANGE
            },
            {
                field: 'field',
                filter: zSlickGridFilterTypes.MB_OR_GB_RANGE
            },
            {
                field: 'field',
                filter: zSlickGridFilterTypes.MULTI_SELECT
            },
            {
                field: 'field',
                filter: zSlickGridFilterTypes.DATE
            }
        ];
    }));

    it('should filter wildcard values', function () {
        var items = [{
            field: 'wooohoo'
        }, {
            field: 'boohoo'
        }];

        columns[0].wildcardValues = 'wooh';

        var result = dataFilterService.filter(items, columns);
        expect(result[0]).toBe(items[0]);
        expect(result.length).toBe(1);
    });

    it('should filter range values', function () {
        var items = [{
            field: 5
        }, {
            field: 50
        }];
        columns[1].rangeValues = [0, 10];

        var result = dataFilterService.filter(items, columns);
        expect(result[0]).toBe(items[0]);
        expect(result.length).toBe(1);
    });

    it('should filter range mb/gb values', function () {
        var items = [{
            field: 5
        }, {
            field: 50
        }];
        columns[2].rangeValues = [0, 10];
        columns[2].rangeTypeMultiplier = 1;

        var result = dataFilterService.filter(items, columns);
        expect(result[0]).toBe(items[0]);
        expect(result.length).toBe(1);


        items[1].field = 2012;
        columns[2].rangeTypeMultiplier = 1024;
        columns[2].rangeValues = [1, 5];
        result = dataFilterService.filter(items, columns);
        expect(result[0]).toBe(items[1]);
        expect(result.length).toBe(1);
    });

    it('should filter range mb/gb values', function () {
        var items = [{
            field: 5
        }, {
            field: 50
        }];
        columns[3].filterValues = [5, 10];

        var result = dataFilterService.filter(items, columns);
        expect(result[0]).toBe(items[0]);
        expect(result.length).toBe(1);
    });

    it('should filter date value', function () {
        var startDate = moment('01/1/2016','MM/DD/2016'),
            endDate = moment('01/30/2016','MM/DD/2016');

        var items = [{
            field: new Date('1/20/2016')
        }, {
            field: new Date('2/20/2016')
        }];
        columns[4].dateValues = [startDate, endDate];

        var result = dataFilterService.filter(items, columns);
        expect(result[0]).toBe(items[0]);
        expect(result.length).toBe(1);
    });

});