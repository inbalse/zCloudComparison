'use strict';

describe('slick grid search service', function () {
    var zSlickGridSearchService, data;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_zSlickGridSearchService_) {
        zSlickGridSearchService = _zSlickGridSearchService_;

        data = [
            {id: '2345', name: 'vpg1', test: {display: 'test', value: 'test'}},
            {id: '23456', name: 'vpg2', test: {display: 'test1', value: 'test1'}},
            {id: '23457', name: 'vpg3', test: {display: 'test2', value: 'test2'}},
            {id: '23458', name: 'vpg4', test: {display: 'test3', value: 'test3'}}
        ];
    }));

    it("should have function defined", function () {
        expect(zSlickGridSearchService._private.isRankHigher).toBeDefined();
        expect(zSlickGridSearchService._private.getValueByPriority).toBeDefined();
        expect(zSlickGridSearchService._private.subsumedText).toBeDefined();
        expect(zSlickGridSearchService._private.innerSearch).toBeDefined();
        expect(zSlickGridSearchService.search).toBeDefined();
    });

    it("should check string is Rank Higher function", function () {
        var flag = zSlickGridSearchService._private.isRankHigher('xy', 'yx', 'x');
        expect(flag).toBeFalsy();

        flag = zSlickGridSearchService._private.isRankHigher('xy', 'yx', 'y');
        expect(flag).toBeTruthy();

        flag = zSlickGridSearchService._private.isRankHigher('ytx', 'yxt', 'x');
        expect(flag).toBeTruthy();

        flag = zSlickGridSearchService._private.isRankHigher('ytx', 'ytrx', 'x');
        expect(flag).toBeFalsy();
    });

    it("should check get Value By Priority function", function () {
        var value = zSlickGridSearchService._private.getValueByPriority('xy', 'yx', 'x');
        expect(value).toEqual('xy');

        value = zSlickGridSearchService._private.getValueByPriority('xy', 'yx', 'y');
        expect(value).toEqual('yx');

        value = zSlickGridSearchService._private.getValueByPriority('ytx', undefined, 'x');
        expect(value).toEqual('ytx');

        value = zSlickGridSearchService._private.getValueByPriority('xtfrd', 'xtfrdg', 'x');
        expect(value).toEqual('xtfrd');
    });

    it("should check subsumed Text function", function () {
        zSlickGridSearchService._private.subsumedText(data[0], data[0].name, 'v');
        expect(data[0].zerto_sort_priority).toEqual('vpg1');

        zSlickGridSearchService._private.subsumedText(data[2], data[2].test.display, 't');
        expect(data[2].zerto_sort_priority).toEqual('test2');
    });

    it("should check inner Search function", function () {
        spyOn(zSlickGridSearchService._private, 'innerSearch').and.callThrough();
        zSlickGridSearchService._private.innerSearch(data[1], data[1], 't');

        expect(zSlickGridSearchService._private.innerSearch).toHaveBeenCalledWith(data[1], data[1], 't');
        expect(zSlickGridSearchService._private.innerSearch).toHaveBeenCalled();
        expect(zSlickGridSearchService._private.innerSearch.calls.count()).toEqual(1);

        zSlickGridSearchService._private.innerSearch(data[1], data[1].test, 't');
        expect(zSlickGridSearchService._private.innerSearch).toHaveBeenCalledWith(data[1], data[1].test, 't');
        expect(zSlickGridSearchService._private.innerSearch).not.toHaveBeenCalledWith();

        expect(zSlickGridSearchService._private.innerSearch.calls.count()).toEqual(2);
    });

    it("should check search function", function () {
        var columns = [{field: 'name'}, {field: 'id'}];
        spyOn(zSlickGridSearchService, 'search').and.callThrough();

        var searchData = zSlickGridSearchService.search('v', data, columns);
        expect(searchData.length).toEqual(4);

        searchData = zSlickGridSearchService.search('x', data, columns);
        expect(searchData.length).toEqual(0);

        searchData = zSlickGridSearchService.search('1', data, columns);
        expect(searchData.length).toEqual(1);
    });
});
